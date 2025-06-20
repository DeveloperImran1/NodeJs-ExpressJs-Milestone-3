import express from "express";
import { Note } from "../models/notes.model";

export const notesRoute = express.Router();

notesRoute.post("/create-note", async (req, res) => {
  const data = req.body;
  const note = await Note.create(data);

  res.status(200).json({
    success: true,
    message: "Note created successfully",
    note,
  });
});

notesRoute.get("/", async (req, res) => {
  const notes = await Note.find().populate("user"); // aikhane populate er kaj holo note er moddhe user namer jei property ase, tar jei objectId ase, sei objectId dia user collection a oi user ke find kore nia asbe. and user property er moddhe oi full user er value ke set korbe.

  res.status(200).json({
    success: true,
    message: "Note get successfully",
    notes,
  });
});

notesRoute.get("/:id", async (req, res) => {
  const id = req.params.id;
  const note = await Note.findById(id);

  res.status(200).json({
    success: true,
    message: "Note get successfully",
    note,
  });
});

notesRoute.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedBody = req.body;
  const note = await Note.findOneAndUpdate({ _id: id }, updatedBody, {
    new: true,
  });
  res.status(200).json({
    success: true,
    message: "Note updated successfully",
    note,
  });
});

notesRoute.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const note = await Note.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "Note deleted successfully",
    note,
  });
});
