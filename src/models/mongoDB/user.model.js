import { Schema, model } from "mongoose";

const userSchema = new Schema ({
    userId: {type: String,
             index: true}
}
)

const UserMongoModel = model('users', userSchema)
export default UserMongoModel;