import express, { Application, Request, Response } from "express";
import { ObjectId } from "mongodb";
import path from "path";
import { client } from "../../config/mongodb";

const app: Application = express();

const filePath = path.join(__dirname, "../../../db/todos.json");
const todosRouter = express.Router();

todosRouter.get("/", async (req: Request, res: Response) => {
  const db = await client.db("todosDB");
  const collection = await db.collection("todos");

  const cursor = await collection.find({});
  const todos = await cursor.toArray(); // Onek gulo data get kortesi, tai array te convert korte hobe. Single data get korle toArray kora lagtona.
  res.json(todos);
});

todosRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const db = await client.db("todosDB");
  const collection = await db.collection("todos");

  const todo = await collection.findOne({ _id: new ObjectId(id) });
  res.json(todo);
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

todosRouter.delete("/delete-todo/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const db = await client.db("todosDB");
  const collection = await db.collection("todos");
  await collection.deleteOne({ _id: new ObjectId(id) });
  res.send({
    message: "Deleted Successfully",
  });
});

todosRouter.put("/update-todo/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const db = await client.db("todosDB");
  const collection = await db.collection("todos");

  const { title, description, priority, isCompleted } = req.body;

  const query = { _id: new ObjectId(id) };

  const updatedTodo = await collection.updateOne(
    query,
    { $set: { title, description, priority, isCompleted } },
    { upsert: true }
  );

  console.log(updatedTodo);
  res.json(updatedTodo);
});

export default todosRouter;
