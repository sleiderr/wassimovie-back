import express from 'express';

const movieRouter = new express.Router();

movieRouter.get('/', function (req,res) {
  res.send('Hello movie')
})

export default movieRouter;