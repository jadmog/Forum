const express = require('express')
const router = express.Router()
const Thread = require('../models/thread')

router.get('/subject/', async (req, res) => {
  try {
    const threads = await Thread.find()
    res.json(threads)
  } catch (err) {
    res.status(500).json({ message: err.message})
  }
  res.send('Hello World')
})

router.post('/subject/', async (req, res) => {
  const thread = new Thread({
    title: req.body.title,
    subject: req.body.subject
  })
  try {
    const newThread = await thread.save()
    res.status(201).json(newThread)
  } catch(err) {
    res.status(400).json({message: err.message})
  } 
})

router.patch('/:id', getThread, async (req, res) => {
  if(req.body.title != null) {
    res.thread.title = req.body.title
  }
  if(req.body.subject != null){
    res.thread.subject = req.body.subject
  }
  try {
    const updatedThread = await res.thread.save()
    res.json(updatedThread)
  } catch(err) {
    res.status(400).json({message: err.message})
  }
})

router.delete('/:id', getThread, async (req, res) => {
  try{
    await res.thread.remove()
    res.json({ message: 'Deleted Thread'})
  } catch(err) {
    res.status(500).json({message: err.message})
  }
})

async function getThread(req, res, next) {
  let thread
try{
  thread = await Thread.findById(req.params.id)
  if(thread == null) {
    return res.status(404).json({ message: 'Cannot find thread'})
  }
} catch(err) {
  return res.status(500).json({ message: err.message})
}

  res.thread = thread
  next()
}
module.exports = router