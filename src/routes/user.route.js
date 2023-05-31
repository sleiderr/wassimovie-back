import express from 'express';

const userRouter = new express.Router();

userRouter.get('/', function (req,res) {
  res.send('Hello user')
})

export default userRouter;