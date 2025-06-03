"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todos_routes_1 = __importDefault(require("./app/todos/todos.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); // aita expressjs er akta middleware ba parser. Jar maddhome req.body er moddhe asa json data ke parse kore object a transfer kore.
app.use("/todos", todos_routes_1.default);
app.get("/", (req, res) => {
    res.send("Welcome to Todo app!");
});
exports.default = app;
/*
Folder structure:
src > app
src > app.ts, server.ts

1. server.ts file: server handleing like server start, end, error handling etc
2. app.ts file: routing handle, middleware, route related error
3. route folder: app buisness logic handling like: create, read, delete, update, database related work.
*/
