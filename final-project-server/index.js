const http = require('http');

const server = http.createServer((request,response)=>{
    response.writeHead(200,{"content-type":"text/html"})
    response.write("<h1>Node js tutorial</h1>");
    response.end();
});

server.listen("3000");