import mongoose, { Mongoose } from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// export collection of users to db
export const UserModel = mongoose.model("users", UserSchema);
