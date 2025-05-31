const http = require('http');
const path = require('path');
const fs = require("fs");
const { title } = require('process');

const filePath = path.join(__dirname, 'to-do.json');
const server = http.createServer((req, res)=> {
    console.log(req.url, req.method);
    if(req.url == "/" && req.method == "GET"){
        res.writeHead(200, {
            "content-type": "text/html"
        })
    }
    else if(req.url == "/todos" && req.method == "GET"){
        res.writeHead(200, {"content-type": "application/json"})
        const data = fs.readFileSync(filePath, {encoding: 'utf-8'});
        console.log(data)
        res.end(data)
    }else if(req.url == "/create-todo" && req.method == "POST"){
        let data = "";
        req.on("data", (chunk)=>{
            data = data + chunk;
        });

        req.on("end", ()=> {
            console.log(data)
            const {id, title, completed} = JSON.parse(data);
            const allTodos = fs.readFileSync(filePath, {encoding: 'utf-8'});
            const parseAllTodos = JSON.parse(allTodos);
            parseAllTodos.push({id, title, completed});
            fs.writeFileSync(filePath, JSON.stringify(parseAllTodos), {encoding: 'utf-8'});
            
            res.end(JSON.stringify({id, title, completed}))
        })
    }else{
        res.end("Rout not found")
    }
});

server.listen(5000, ()=>{
    console.log("Server listening to port 5000")
})