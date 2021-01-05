const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  thread: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Answer', answerSchema)