import express, { Application, Request, Response } from "express";
import fs from "fs";
import path from "path";

const app: Application = express();

const filePath = path.join(__dirname, "../../../db/todos.json");
const todosRouter = express.Router();

todosRouter.get("/", (req: Request, res: Response) => {
  console.log("Aita todos router er moddhe");
  const data = fs.readFileSync(filePath, { encoding: "utf-8" });
  res.json(data);
});

todosRouter.get("/:id/:title", (req: Request, res: Response) => {
  console.log("Param aita", req.params);
  console.log("Query aita", req.query);
  const data = fs.readFileSync(filePath, { encoding: "utf-8" });
  res.json(data);
});

todosRouter.post("/create-todo", (req: Request, res: Response) => {
  res.send("todo created");
});

export default todosRouter;
