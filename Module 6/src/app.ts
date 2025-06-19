import express, { Application } from "express";
import { notesRoute } from "./app/controllers/notes.controller";
import { usersRoute } from "./app/controllers/users.controller";
const app: Application = express();
app.use(express.json());

app.use("/notes", notesRoute);
app.use("/users", usersRoute);

app.get("/", (req, res) => {
  res.send("Welcome to note app");
});

export default app;
