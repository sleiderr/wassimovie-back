import express from 'express';
import MovieModel from '../models/mongoDB/movie.model.js';

const movieRouter = new express.Router();

 movieRouter.get('/search', function (req,res) {
  if (! req.query.title) {
    res.status(404).json({message:"no title provided"})
  }
  const queryParam = new RegExp(req.query.title, 'i')
  MovieModel
    .find({title: queryParam})
    .then(function (movies) {
      res.send(movies)
    })
    .catch(function (err) {
      res.status(400).json({ message: err })
    })
  
  movieRouter.get('/find', (req,res) => {
    MovieModel
      .findOne({imdb_id: req.query.id})
      .then(function (movie) {
        res.send(movie)
      })
      .catch(function (err) {
        res.status(400).json({ message: err })
      })
  })
})

export default movieRouter;