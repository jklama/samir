const mongoose = require('mongoose')

const goalSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
})

// const goalSchema = mongoose.Schema({
//   Team: {
//     type: String,
//     required: true,
//   },
//   // Define your schema fields based on the CSV column
//   'Games Played': Number,
//   Win: Number,
//   Draw: Number,
//   Loss: Number,
//   'Goals For': Number,
//   'Goals Against': Number,
//   Points: Number,
//   Year: Number,
// })

module.exports = mongoose.model('Goal', goalSchema)
