import express, { Application, Request, Response } from "express";
import todosRouter from "./app/todos/todos.routes";

const app: Application = express();
app.use(express.json()); // aita expressjs er akta middleware ba parser. Jar maddhome req.body er moddhe asa json data ke parse kore object a transfer kore.

app.use("/todos", todosRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Todo app!");
});

export default app;

/* 
Folder structure: 
src > app
src > app.ts, server.ts

1. server.ts file: server handleing like server start, end, error handling etc
2. app.ts file: routing handle, middleware, route related error
3. route folder: app buisness logic handling like: create, read, delete, update, database related work.
*/
