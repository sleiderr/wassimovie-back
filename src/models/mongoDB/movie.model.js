import { Schema, model } from "mongoose";

const movieSchema = new Schema({
  backdrop_path: String,
  genres: [{
    type: String,
    index: true,
  }],
  original_language: [{
    type: String,
    index: true,
  }],
  imdb_id: {
    type: String,
    index: true,
  },
  overview: String,
  popularity: Number,
  poster_path: String,
  release_date: String,
  title: {
    type: String,
    index: true,
  },
  vote_average: Number,
  vote_count: Number,
  cast: [{
    name: {
      type: String,
      index: true,
    },
    popularity: Number,
    profile_path: String,
    character: String
  }],
  directors: [{
    name: {
      type: String,
      index: true,
    },
    popularity: Number,
    profile_path: String,
  }],
})

const MovieModel = model('movies', movieSchema)
export default MovieModel;