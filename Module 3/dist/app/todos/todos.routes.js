"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const path_1 = __importDefault(require("path"));
const mongodb_2 = require("../../config/mongodb");
const app = (0, express_1.default)();
const filePath = path_1.default.join(__dirname, "../../../db/todos.json");
const todosRouter = express_1.default.Router();
todosRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield mongodb_2.client.db("todosDB");
    const collection = yield db.collection("todos");
    const cursor = yield collection.find({});
    const todos = yield cursor.toArray(); // Onek gulo data get kortesi, tai array te convert korte hobe. Single data get korle toArray kora lagtona.
    res.json(todos);
}));
todosRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const db = yield mongodb_2.client.db("todosDB");
    const collection = yield db.collection("todos");
    const todo = yield collection.findOne({ _id: new mongodb_1.ObjectId(id) });
    res.json(todo);
}));
todosRouter.post("/create-todo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield mongodb_2.client.db("todosDB");
    const collection = yield db.collection("todos");
    const { title, description, priority, isCompleted } = req.body;
    const data = yield collection.insertOne({
        title: title,
        description: description,
        priority: priority,
        isCompleted: isCompleted,
    });
    const cursor = yield collection.find({});
    const todos = yield cursor.toArray();
    res.json(todos);
}));
todosRouter.delete("/delete-todo/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const db = yield mongodb_2.client.db("todosDB");
    const collection = yield db.collection("todos");
    yield collection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
    res.send({
        message: "Deleted Successfully",
    });
}));
todosRouter.put("/update-todo/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const db = yield mongodb_2.client.db("todosDB");
    const collection = yield db.collection("todos");
    const { title, description, priority, isCompleted } = req.body;
    const query = { _id: new mongodb_1.ObjectId(id) };
    const updatedTodo = yield collection.updateOne(query, { $set: { title, description, priority, isCompleted } }, { upsert: true });
    console.log(updatedTodo);
    res.json(updatedTodo);
}));
exports.default = todosRouter;
