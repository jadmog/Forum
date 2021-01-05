const express = require('express')
const router = express.Router()
const Answer = require('../models/answer')

router.get('/answer', async (req, res) => {
  try {
    const answers = await Answer.find()
    res.json(answers)
  } catch (err) {
    res.status(500).json({ message: err.message})
  }
  res.send('Hello World')
})

router.post('/answer', async (req, res) => {
  const answer = new Answer({
    username: req.body.username,
    subject: req.body.subject,
    thread: req.body.thread,
    body: req.body.body
  })
  try {
    const newAnswer = await answer.save()
    res.status(201).json(newAnswer)
  } catch(err) {
    res.status(400).json({message: err.message})
  } 
})

module.exports = router