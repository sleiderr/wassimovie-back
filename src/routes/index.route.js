import express from 'express';

const mainRouter = new express.Router();

mainRouter.get('/', function (req,res) {
  res.send('Hello main')
})

export default mainRouter;