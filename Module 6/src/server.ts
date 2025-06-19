import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

let server: Server;
const port = 5000;

async function main() {
  try {
    const uri =
      "mongodb+srv://todoapp:todoapp@cluster0.hqv81rk.mongodb.net/note-app?retryWrites=true&w=majority&appName=Cluster0";
    await mongoose.connect(uri);

    console.log("Mongodb is conected");
    server = app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
