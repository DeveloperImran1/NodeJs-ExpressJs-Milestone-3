"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const mongodb_1 = require("mongodb");
// aikhane uri create kore user and password ke dynamicaly set korbo user create kore. And amader databaser jei name dibo. Sita mongodb.net/ er por and ?retryWrites er age DB name set korte hobe. Example ami set koresi todosDB.
const uri = "mongodb+srv://mongodb:mongodb@cluster0.hqv81rk.mongodb.net/todosDB?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
exports.client = new mongodb_1.MongoClient(uri, {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
