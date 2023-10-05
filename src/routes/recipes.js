import express from "express";
import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./users.js";

const router = express.Router();

// get recipe
router.get("/", async (req, res) => {
  try {
    const recipes = await RecipeModel.find({});
    res.json(recipes);
  } catch (error) {
    res.json(error);
  }
});

// add recipe
router.post("/", verifyToken, async (req, res) => {
  const recipe = new RecipeModel(req.body);
  try {
    const response = await recipe.save();
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

// save recipe
router.put("/", verifyToken, async (req, res) => {
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

// get saved recipe ids by user id
router.get("/saved-recipes/ids/:userId", verifyToken, async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    res.json({ savedRecipes: user.savedRecipes });
  } catch (error) {
    res.json(error);
  }
});

// get saved recipes by user id
router.get("/saved-recipes/:userId", verifyToken, async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    const savedRecipes = await RecipeModel.find({
      // find recipes that id is in user saved recipes
      _id: { $in: user.savedRecipes },
    });
    res.json(savedRecipes);
  } catch (error) {
    res.json(error);
  }
});

export { router as recipeRouter };
