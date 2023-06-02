import Express from "express";
import RatingModel from "../models/mongoDB/userratings.model.js";
import { verifyToken } from '../middlewares/tokencheck.mw.js';

const ratingRouter = new Express.Router();

    // user adds new rating 
    ratingRouter.post('/add',verifyToken, (req,res) => {
        console.log(req.username)
        console.log(req.body.id)
        console.log(req.body.rating)
        RatingModel
        .findOneAndUpdate({userId: req.username,
            movieId: req.body.id}, {rating: parseInt(req.body.rating) - 3}, {
            new: true,
            upsert: true // Make this update into an upsert
          })
        .then(function (rating) {
            rating.rating += 3
            res.send(rating)
            
        })
        .catch(function (err) {
            console.log(err)
            res.status(400).json({ message: err })
        })
    }) 


    // get rating for certain movie and user
    ratingRouter.get('/',verifyToken, (req,res) => {
        
        RatingModel
        .findOne({userId: req.username,movieId: req.query.id})
        .then(function (rating) {
            rating.rating += 3
            res.send(rating)
        })
        .catch(function (err) {
            res.status(400).json({ message: err })
        })
    })

    // get ratings by user
    ratingRouter.get('/user',verifyToken, (req,res) => {
        RatingModel
        .find({userId: req.username})
        .then(function (ratings) {
            res.send(ratings.map((rating) => {
                rating.rating += 3;
                return rating
            }))
        })
        .catch(function (err) {
            res.status(400).json({ message: err })
        })
    }) 

export default ratingRouter;
    
