import express from "express";
import { z } from "zod";
import { User } from "../models/user.model";
export const usersRoute = express.Router();

const CreateUserZodSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  age: z.number(),
  password: z.string(),
  role: z.string().optional(),
});

// [Note: mongoose er property gulo default vabe optional thake. So kono field required hole, seita bole dita hoi. Ar zod a property gulo default vabei required thake. Tai jei field gulo optional hobe, tader ke bole dita hoi, aita optional]

usersRoute.post("/create-user", async (req, res) => {
  try {
    // const zodBody = await CreateUserZodSchema.parseAsync(req.body);
    // console.log("zod body ", zodBody);

    // built in and custom instance method
    // const data = req.body;
    // const user = new User(data);

    // const password = await user.hashPassword(data.password);
    // console.log(password);
    // user.password = password;

    // await user.save();

    // built in custom static method api er moddhe password hashed kore then user create koreci.
    // const data = req.body;
    // const password = await bcrypt.hash(data.password, 10);
    // data.password = password;
    // const user = await User.create(data);

    // Middleware use koew password ke bcrypt korbo
    const data = req.body;
    const user = await User.create(data);

    res.status(200).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error: any) {
    console.log(error);

    res.status(401).json({
      success: false,
      message: error.message,
      error,
    });
  }
});

usersRoute.get("/", async (req, res) => {
  const userEmail = req.query.email;
  console.log(userEmail);
  let user: any = [];
  if (userEmail) {
    user = await User.findOne({ email: req.query.email });
  } else {
    user = await User.find().sort({ email: "ascending" }).skip(1).limit(3); // value hisabe asc or ascending or 1 use hoi. And descending, dsc, -1 use kora hoi.
  }

  res.status(200).json({
    success: true,
    message: "User get successfully",
    user,
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

  // const user = await User.findByIdAndDelete(id);
  const user = await User.findOneAndDelete({ _id: id });

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
    user,
  });
});
