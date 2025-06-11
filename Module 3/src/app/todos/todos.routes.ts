import express, { Application, Request, Response } from "express";
import path from "path";
import { client } from "../../config/mongodb";

const app: Application = express();

const filePath = path.join(__dirname, "../../../db/todos.json");
const todosRouter = express.Router();

todosRouter.get("/", async (req: Request, res: Response) => {
  const db = await client.db("todosDB");
  const collection = await db.collection("todos");

  const cursor = await collection.find({});
  const todos = await cursor.toArray();
  res.json(todos);
});

todosRouter.post("/create-todo", async (req: Request, res: Response) => {
  const db = await client.db("todosDB");
  const collection = await db.collection("todos");
  const { title, description, priority, isCompleted } = req.body;

  const data = await collection.insertOne({
    title: title,
    description: description,
    priority: priority,
    isCompleted: isCompleted,
  });
  const cursor = await collection.find({});
  const todos = await cursor.toArray();
  res.json(todos);
});

export default todosRouter;
