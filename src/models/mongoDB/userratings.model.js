import { Schema, model } from "mongoose";

const ratingSchema = new Schema ({
    userId: {type: String,
             index: true},
    movieId: {type: String,
              index: true},
    rating: Number

}
)

const RatingModel = model('ratings', ratingSchema)
export default RatingModel;