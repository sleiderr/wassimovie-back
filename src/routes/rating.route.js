import Express from "express";
import { RatingModel } from "../models/mongoDB/userratings.model";

const ratingRouter = new Express.Router();

    // user adds new rating 
    ratingRouter.post('/rate',verifyToken, (req,res) => {
        RatingModel
        .findOneAndUpdate({userId: req.query.username,
            movieId: req.query.movieid}, {rating: req.query.rating}, {
            new: true,
            upsert: true // Make this update into an upsert
          })
        .then(function (rating) {
            res.send(rating)
            
        })
        .catch(function (err) {
            res.status(400).json({ message: err })
        })
    }) 


    // get rating for certain movie and user
    ratingRouter.get('/rating',verifyToken, (req,res) => {
        RatingModel
        .findOne({userId: req.username,movieId: req.query.movieid})
        .then(function (rating) {
            res.send(rating)
        })
        .catch(function (err) {
            res.status(400).json({ message: err })
        })
    }) 
    