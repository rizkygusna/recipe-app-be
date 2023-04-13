import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  instruction: { type: String, required: true },
  imgUrl: { type: String, required: true },
  cookingTime: { type: Number, required: true },
  // refering to user id
  createdById: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

// export collection of users to db
export const RecipeModel = mongoose.model("recipes", RecipeSchema);
