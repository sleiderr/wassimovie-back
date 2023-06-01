import { Schema, model } from "mongoose";

const ratingSchema = new Schema ({
    userName: {type: String,
             index: true},
    movieId: {type: String,
              index: true},

    rating: Number

}
)

const RatingModel = model('ratings', ratingSchema)
export default RatingModel;