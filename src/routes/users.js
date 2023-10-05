import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";
import { config } from "dotenv";

const router = express.Router();
config();
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/register", async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  // query one user with variable username
  const user = await UserModel.findOne({ username: username });
  if (user) return res.json({ message: "User already exists!" });
  // hash the password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);
  // add new user document
  const newUser = new UserModel({
    username: username,
    password: hashedPassword,
  });
  // add document to database collection
  await newUser.save();

  res.json({ message: "User added!" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username: username });
  if (!user) return res.json({ message: "User doesn't exist!" });

  // check validity of password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.json({ message: "Password incorrect!" });

  // create token for the user
  const token = jwt.sign({ id: user._id }, JWT_SECRET);
  // send token and userId as response
  res.json({ token, userId: user._id });
});

export { router as userRouter };

// verify token that sent to request header
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, JWT_SECRET, (err) => {
      if (err) return res.sendStatus(403);
      next();
    });
    return;
  }
  res.sendStatus(401);
};
