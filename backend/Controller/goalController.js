const asyncHandler = require('express-async-handler')

const setGoals = asyncHandler(async (req, res) => {
  /*try {
        const newData = req.body; // Assuming request body contains the data to be added
        const result = await FootballdataCollection.create(newData);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }*/

  console.log('Ref', req.body)
  let newTeam = new FootballdataCollection(req.body)
  console.log('newFootballdataCollection->', newTeam)
  newTeam
    .save()
    .then((todo) => {
      res.status(200).json({ Team: 'Team added successfully' })
    })
    .catch((err) => {
      console.log(err)
      res.status(400).send('adding new Team failed')
    })
})

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find()

  res.status(200).json(goals)
})

const updateGoal = asyncHandler(async (req, res) => {
  try {
    const { team, newData } = req.body // Assuming request body contains the team and updated data
    const result = await FootballdataCollection.findOneAndUpdate(
      { team },
      newData,
      { new: true }
    )
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

const deleteGoal = asyncHandler(async (req, res) => {
  try {
    const { team } = req.body // Assuming request body contains the team to be deleted
    const result = await FootballdataCollection.deleteOne({ team })
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

//stats

const stats_year = asyncHandler(async (req, res) => {
  try {
    const year = req.params.year
    const result = await FootballdataCollection.aggregate([
      {
        $match: { year: parseInt(year) },
      },
      {
        $group: {
          _id: null,
          totalGamesPlayed: { $sum: '$gamesPlayed' },
          totalDraw: { $sum: '$draw' },
          totalWin: { $sum: '$win' },
        },
      },
    ])
    res.json(result[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

//Record Display
const displayWins = asyncHandler(async (req, res) => {
  try {
    let minValue = req.params.wins // Assuming request body contains the minimum value
    const result = await FootballdataCollection.find({
      Win: { $gt: minValue },
    }).limit(10)
    res.json(result)
    // console.log(res)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
})

//Averege Goal
const averageGoal = asyncHandler(async (req, res) => {
  try {
    const { year, minValue } = req.body // Assuming request body contains the year and minimum value
    const result = await FootballdataCollection.aggregate([
      {
        $match: { year: parseInt(year) },
      },
      {
        $group: {
          _id: '$team',
          averageGoalFor: { $avg: '$goalsFor' },
        },
      },
      {
        $match: { averageGoalFor: { $gt: minValue } },
      },
    ])
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = {
  setGoals,
  getGoals,
  updateGoal,
  deleteGoal,
  stats_year,
  displayWins,
  averageGoal,
}
