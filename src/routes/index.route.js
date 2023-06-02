import express from 'express';

const mainRouter = new express.Router();

mainRouter.get('/', function (req,res) {
  res.status(404).send({message: "Page not found"})
})

export default mainRouter;