const http = require('http');

const todos = [
  {
    id: 1,
    title: "Learn JavaScript",
    completed: false,
  },
  {
    id: 2,
    title: "Build a simple todo app",
    completed: false,
  },
];

const server = http.createServer((req, res)=> {
    console.log(req.url, req.method);
    if(req.url == "/" && req.method == "GET"){
        res.writeHead(200, {
            "content-type": "text/html"
        })
    }
    else if(req.url == "/todos" && req.method == "GET"){
        // status code, header set korar way 1:
        res.writeHead(200, {
            "content-type": "application/json",
            "email": 'ph@gmail.com'
        })

        // status code, header set korar way 2: aivabe akta akta kore set korte hobe
        // res.setHeader("content-type", "text/plain");
        // res.setHeader("email", 'ph2@gmail.com');
        // res.statusCode = 201;

        res.end(JSON.stringify(todos))
    }else if(req.url == "/create-todo" && req.method == "POST"){
        res.end("Your to-do is created")
    }else{
        res.end("Rout not found")
    }
});

server.listen(5000, ()=>{
    console.log("Server listening to port 5000")
})