const express = require('express')
const router = express.Router()
const {
  setGoals,
  getGoals,
  updateGoals,
  deleteGoals,
  stats_year,
  displayWins,
  averageGoal,
} = require('../controllers/goalController')

router.route('/').get(getGoals).post(setGoals)
router.route('/:id').put(updateGoals).delete(deleteGoals)
router.route('/stats/:year').get(stats_year)
router.route('/displayRecords/:wins').get(displayWins)
router.route('/averageGoalFor').get(averageGoal)

module.exports = router
