import app from "./app";
import { client } from "./config/mongodb";

let server;
const port = 27017;

const bootstrap = async () => {
  await client.connect();
  console.log("DB succesfully connected.");

  server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

bootstrap();
