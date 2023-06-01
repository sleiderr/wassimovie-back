import Express from "express";
import RatingModel from "../models/mongoDB/userratings.model.js";
import { verifyToken } from '../middlewares/tokencheck.mw.js';

const ratingRouter = new Express.Router();

    // user adds new rating 
    ratingRouter.post('/add',verifyToken, (req,res) => {
        RatingModel
        .findOneAndUpdate({userId: req.query.username,
            movieId: req.query.movieid}, {rating: req.query.rating - 3}, {
            new: true,
            upsert: true // Make this update into an upsert
          })
        .then(function (rating) {
            rating.rating += 3
            res.send(rating)
            
        })
        .catch(function (err) {
            res.status(400).json({ message: err })
        })
    }) 


    // get rating for certain movie and user
    ratingRouter.get('/',verifyToken, (req,res) => {
        RatingModel
        .findOne({userId: req.username,movieId: req.query.movieid})
        .then(function (rating) {
            rating.rating += 3
            res.send(rating)
        })
        .catch(function (err) {
            res.status(400).json({ message: err })
        })
    })

export default ratingRouter;
    
