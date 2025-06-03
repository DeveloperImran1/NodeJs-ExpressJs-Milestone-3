"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const filePath = path_1.default.join(__dirname, "../../../db/todos.json");
const todosRouter = express_1.default.Router();
todosRouter.get("/", (req, res) => {
    console.log("Aita todos router er moddhe");
    const data = fs_1.default.readFileSync(filePath, { encoding: "utf-8" });
    res.json(data);
});
todosRouter.get("/:id/:title", (req, res) => {
    console.log("Param aita", req.params);
    console.log("Query aita", req.query);
    const data = fs_1.default.readFileSync(filePath, { encoding: "utf-8" });
    res.json(data);
});
todosRouter.post("/create-todo", (req, res) => {
    res.send("todo created");
});
exports.default = todosRouter;
