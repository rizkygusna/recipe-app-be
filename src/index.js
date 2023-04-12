import express from "express";
// setup rules for network between server in client
import cors from "cors";
import mongoose from "mongoose";
import { config } from "dotenv";

import { userRouter } from "./routes/users.js";
import { recipeRouter } from "./routes/recipes.js";

const app = express();
// parses content type header json only
app.use(express.json());
const PORT = 3001;

app.use(cors());

// add user router as auth
app.use("/auth", userRouter);
app.use("/recipes", recipeRouter);

// load env variables
config();
const DB_PASSWORD = process.env.DB_PASSWORD;

// connect to database
mongoose.connect(
  `mongodb+srv://gusnafarid:${DB_PASSWORD}@recipes.0wmo9b6.mongodb.net/test?retryWrites=true&w=majority`
);

app.listen(PORT, () => console.log("Server started at port: " + PORT));
