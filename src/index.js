const express = require('express');
const fs = require('fs');

const app = express();

app.get('/', (req,res) => 
{
    //trying to write some basic content to the page   
    fs.readFile('test.txt', (err, data) =>
    {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.send("<h1>test complete</h1>");
        res.write(data);
       
    });
});

app.post("/post", (req,res) =>
{
    //res.send("post");
});

app.listen(8080, () => console.log("App launched"));