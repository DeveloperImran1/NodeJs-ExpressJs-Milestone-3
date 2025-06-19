import express from "express";
import { User } from "../models/user.model";

export const usersRoute = express.Router();

usersRoute.post("/create-user", async (req, res) => {
  const data = req.body;
  const user = await User.create(data);

  res.status(200).json({
    success: true,
    message: "User created successfully",
    user,
  });
});

usersRoute.get("/", async (req, res) => {
  const Users = await User.find();

  res.status(200).json({
    success: true,
    message: "User get successfully",
    Users,
  });
});

usersRoute.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);

  res.status(200).json({
    success: true,
    message: "User get successfully",
    user,
  });
});

usersRoute.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedBody = req.body;
  const user = await User.findOneAndUpdate({ _id: id }, updatedBody, {
    new: true,
  });
  res.status(200).json({
    success: true,
    message: "User updated successfully",
    user,
  });
});

usersRoute.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const user = await User.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
    user,
  });
});
