import express from "express";
import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";
const router = express.Router();

// get recipe
router.get("/", async (req, res) => {
  try {
    const res = await RecipeModel.find({});
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

// add recipe
router.post("/", async (req, res) => {
  const recipe = new RecipeModel(req.body);
  try {
    const response = await recipe.save();
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

// save recipe
router.put("/", async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.body.recipeId);
    const user = await UserModel.findById(req.body.userId);
    // add recipe id to user saved recipes list
    user.savedRecipes.push(recipe.id);
    await user.save();
    res.json({ savedRecipes: user.savedRecipes });
  } catch (error) {
    res.json(error);
  }
});

export { router as recipeRouter };
