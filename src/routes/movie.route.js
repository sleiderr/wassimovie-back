import express from 'express';
import MovieModel from '../models/mongoDB/movie.model.js';
import { verifyToken } from '../middlewares/tokencheck.mw.js';
import axios from 'axios';

const movieRouter = new express.Router();

movieRouter.get('/search', function (req,res) {
  if (! req.query.title) {
    res.status(404).json({message:"no title provided"})
  };
  const queryParam = new RegExp(req.query.title, 'i')
  MovieModel
    .find({title: queryParam})
    .sort({popularity: -1})
    .limit(100)
    .then(function (movies) {
      res.send(movies)
    })
    .catch(function (err) {
      res.status(400).json({ message: err })
    });
});

movieRouter.get('/find', (req,res) => {
  MovieModel
    .findOne({imdb_id: req.query.id})
    .then(function (movie) {
      res.send(movie)
    })
    .catch(function (err) {
      res.status(400).json({ message: err })
    })
});

movieRouter.get('/popular', (req,res) => {
  MovieModel
    .find({adult: false})
    .sort({'popularity': -1})
    .limit(parseInt(req.query.number))
    .then((movies => {
      res.send(movies);
    }))
    .catch(err => {
      res.status(400).json({ message: err });
    })
});

movieRouter.get('/trending', (req,res) => {
  const currentDate = new Date();
  const oneMonthAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());

  const year = oneMonthAgo.getFullYear();
  const month = String(oneMonthAgo.getMonth() + 1).padStart(2, '0');
  const day = String(oneMonthAgo.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;

  MovieModel
    .find({adult: false, release_date: {$gt: formattedDate}})
    .sort({'popularity': -1})
    .limit(parseInt(req.query.number))
    .then((movies => {
      res.send(movies);
    }))
    .catch(err => {
      res.status(400).json({ message: err });
    })
})

movieRouter.get('/recommended', verifyToken, async (req,res) => {
  try {
    const movieIds = (await axios.get(process.env.ALGO_URL + req.username)).data;
    const response = []
    for (const id of movieIds) {
      const result = await MovieModel.findOne({imdb_id: id});
      response.push(result);
    }
    res.json(response);
  } catch (err) {
    res.status(404).json({ message: 'Recommendations not found' })
  }
})

export default movieRouter;