import express from 'express';
import { appDataSource } from '../models/datasource.js';

import User from '../models/entities/user.model.js';
import { hashPassword } from '../utils/user.util.js';
import assert from 'assert';

import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
import { verifyToken } from '../middlewares/tokencheck.mw.js';

dotenv.config();

const userRouter = new express.Router();

// Login user and send jwt token
userRouter.post('/login', function (req, res) {
  appDataSource
    .getRepository(User)
    // We will have to create a custom query to include the hidden column hashPassword
    .createQueryBuilder('User') 
    .addSelect('User.hashPassword')
    .where({
      ...(req.body.username ? {username: req.body.username} : undefined),
      ...(req.body.email ? {email: req.body.email} : undefined),
    })
    .getOne()
    .then(function (user) {
      console.log(user)
      assert.equal(hashPassword(req.body.password),user.hashPassword,'Invalid user credentials');
      const payload = {username: user.username}
      res.json({
        code: jwt.sign(payload,process.env.JWT_SECRET_KEY,{ expiresIn: '30d' } )
      })
    })
    .catch(function () {
      res.status(400).json({ message: 'invalid login' })
    })
})

// Get authenticated user information
userRouter.get('/me',verifyToken, function (req,res) {
  appDataSource
    .getRepository(User)
    .findOne({where: {username: req.username}, exclude: ['hashPassword']})
    .then(function (user) {
      res.send(user)
    })
    .catch(function (err) {
      res.status(400).json({ message: 'Error finding user' , detail: err})
    })
})

// Create new user
userRouter.post('/new', function (req, res) {
  console.log(req.body)
  const userRepository = appDataSource.getRepository(User);
  const newUser = userRepository.create({
    email: req.body.email,
    username: req.body.username,
    hashPassword: hashPassword(req.body.password),
  });

  userRepository
    .insert(newUser)
    .then(function (newDocument) {
      res.status(201).json(newDocument);
    })
    .catch(function (error) {
      console.error(error);
      if (error.code === '23505') {
        res.status(400).json({
          message: `User with email "${newUser.email}" already exists`,
        });
      } else {
        res.status(500).json({ message: 'Error while creating the user' });
      }
    });
});

// Update authenticated user info
userRouter.post('/update', verifyToken, function (req, res) {
  appDataSource
    .getRepository(User)
    .update(req.username, {
      ...(req.body.firstname ? {firstname: req.body.firstname} : undefined),
      ...(req.body.lastname ? {lastname: req.body.lastname} : undefined),
      ...(req.body.password ? {hashPassword: hashPassword(req.body.password)} : undefined),
    })
    .then(function () {
      res.status(204).json({ message: 'User successfully updated' })
    })
    .catch(function () {
      res.status(400).json({ message: `Error while updating the user: ${err}` });
    })
})

// Delete a user
userRouter.delete('/delete', async function (req,res) {
  try {
    const userRepository = appDataSource.getRepository(User);
    const user = await userRepository.findOne({where: {username: req.body.username}})
    if (req.body.admin_password) {
      assert.equal(req.body.admin_password,process.env.ADMIN_PASS, "Wrong admin password")
    } else {
      assert.equal(hashPassword(req.body.password), user.hashPassword, "Wrong user credentials")
    }
    userRepository.delete({username: req.body.username}).then(function () {
      res.status(204).json({ message: 'User successfully deleted' });
    })
  } catch (err) {
    res.status(500).json({ message: `Error while deleting the user: ${err}` });
  }
})

export default userRouter;