import express, { Application, NextFunction, Request, Response } from "express";
import todosRouter from "./app/todos/todos.routes";

const app: Application = express();
app.use(express.json()); // aita expressjs er akta middleware ba parser. Jar maddhome req.body er moddhe asa json data ke parse kore object a transfer kore.

app.use("/todos", todosRouter);

app.get(
  "/",
  (req: Request, res: Response, next: NextFunction) => {
    console.log({
      url: req.url,
      method: req.method,
      header: req.header,
      headers: req.headers,
    });
    next();
  },
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // console.log(something); // something defing kora hoina. Jar fole error diba
      console.log("Wellcome todos app");
    } catch (error) {
      // console.log(error);
      // res.send(`Something went wrong ${error}`);

      // kono api er moddhe error asle, sei error ke handle korar jonno, catch block er moddhe status code and error message send korte hoi. But global error handler create korte pari. Jar maddhome akbar error handler create kore, all time next() er maddhome error ke send korte pari.
      next(error);
    }
  }
);

// Route jodi match na kore, tahole ai middleware a dhukbe. Ai route handling middleware ta sobar last er dika and global error handler upore likhte hobe.
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "route not found" });
});

// error handling a 4 ta perameter dita hoi. 3 ta dila kaj korbena. 1st a error. tarpor req, res, next. bivinno api er catch block theke jei error ta asbe, sei error ta next() er maddhome pass korte hobe. oi error aikhane error perameter a pawa jai.
// [Note: ai global error handler sobar last a dita hobe. tasara kaj korbena.]

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    console.log("Error is ", error);
    res.status(400).json({
      message: "Something went wrong from global error handler ",
      error,
    });
  }
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
