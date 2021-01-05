const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');

const app = new Koa();
const router = new Router();

mongoose.connect('mongodb://localhost:27017/forum', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('DB is connected')
  }, (err) => {
    console.error(err);
});

// model
const Thread = mongoose.model('threads', {
  title: String,
  subject: String
})

router.get('/subject/', async (ctx) => {
  console.log("acces get")
  try{
    const thread = await Thread.find({})
    console.log(thread)
     ctx.body = thread;

  } catch(e) {
    console.log(e)
  }
  
})

router.post('/subject/', async (ctx) => {
  console.log('data envoyé', ctx.request.body);
  const newThread = new Thread({ 
    title: ctx.request.body.title,
    subject: ctx.request.body.subject
  });
  const savedThread = await newThread.save();
  ctx.body = savedThread;
  
})


app
  .use(cors())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(5000, () => {
  console.log('Server is READY on port 5000')
});