const express = require('express')
const fileSystem = require('fs')
const bodyParser = require('body-parser');

const app = express()

app.use(express.json())

app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

/* To get the data */
app.get('/',(request,response)=>{
    response.writeHead(200,{'content.type':'application/json'})
    var data = fileSystem.readFileSync(__dirname+"/todo.json","utf8")
    data=JSON.parse(data);
    response.end(data);
})

/* To Get all the data from json file */
app.get('/todo',(request,response)=>{
    console.log(request.body)

    var data = fileSystem.readFileSync(__dirname+"/todo.json","utf8")
    console.log(data);
    response.end(data)
})

/* To add new data to the json file */
app.post('/addtodo',(request,response)=>{
    
    var data = fileSystem.readFileSync(__dirname+"/todo.json","utf8")
    data = JSON.parse(data)

    response.writeHead(200,{"content-type":"application/json"});
    console.log(request.body);
    
    let addId = 0;
    data.forEach(adddata => {
        addId = adddata.id;
    });
    const adddata = {
        id : addId+1,
        title : request.body.title,
        description : request.body.description,
    }

    data.push(adddata);
    console.log(data);

    data = JSON.stringify(data,null,4)
    fileSystem.writeFileSync(__dirname+"/todo.json",data)
    response.end(data)
})

/* To delete data from json by sending particular id */
app.delete('/deletetodo/:id',(request,response)=>{
    
    var data = fileSystem.readFileSync(__dirname+"/todo.json","utf8")
    data = JSON.parse(data)

    console.log(request.body)

    let deleteId = data.find(c=> c.id === parseInt(request.params.id));
    if(!deleteId){
        return response.status(404).send('The user not found with the given id');
    }
    const index = data.indexOf(deleteId);
    data.splice(index,1);
    data = JSON.stringify(data,null,2)
    fileSystem.writeFileSync(__dirname+"/todo.json",data)
    response.send(deleteId);
    console.log(data);    
    response.end(data+"Delete Todo")
})

/* To update particular record in json file by sending id */
app.put('/updatetodo/:id',(request,response)=>{
   
    var data = fileSystem.readFileSync(__dirname+"/todo.json","utf8")
    data = JSON.parse(data);
   
    console.log(request.body)
    let updateId = data.find(c=> c.id === parseInt(request.params.id));
    
    if(!updateId){
        return response.status(404).send("The updated User not found:")
    }
    data.title = request.body.title;
    data.description = request.body.description;
    
    data = JSON.stringify(data,null,4)
    fileSystem.writeFileSync(__dirname+"/todo.json",data)
    response.send(data);

    response.end(data+"Update Todo")
})

/* To assign port number to our project */
app.listen('3000',()=>{
    console.log("working");
    
})
