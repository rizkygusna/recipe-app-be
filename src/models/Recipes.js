import mongoose, { Mongoose } from "mongoose";

const RecipeSchema = new mongoose.Schema({
  name: { type: String, required },
  ingredients: [{ type: String, required }],
  instruction: { type: String, required },
  imgUrl: { type: String, required },
  cookingTime: { type: Number, required },
  // refering to user id
  createdById: { type: mongoose.Schema.Types.ObjectId, ref: "users", required },
});

// export collection of users to db
export const RecipeModel = mongoose.model("recipes", RecipeSchema);
