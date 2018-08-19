const express = require('express');
const fs = require('fs');

const app = express();

//to process post parameters
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

//to get to work on heroku
const PORT = process.env.PORT || 5000

app.get('/', (req,res) => 
{

    
    //testing to see what files are in the current directory
    // fs.readdir(__dirname, (err, files) => 
    // {
    //     console.log(files);
    // });

    //trying to write some basic content to the page    
    fs.readFile(`${__dirname}/journal_form.html`, (err, data) =>
    {
        res.writeHead(200, {'Content-Type': 'text/html'});
        //res.writeHead(200, {'Content-Type': 'text/html'});
        //YOU CAN ONLY USE ONE RES.SEND!!!
        //res.send(`<h1>test complete</h1> ${data}`);
        res.write(`<h1>test complete</h1> ${data}`);
        // console.log("search entered");
        // console.log(`${__dirname}/test.txt`);
        // console.log("data");
        // console.log(data);
        // console.log("err");
        // console.log(err);
        // console.log("__dirname");
        // console.log(__dirname);
    });
 
    //res.end();
});

app.get("/post", (req,res) =>
{
    res.send("post");
});  

app.post('/post', function (req, res) {
    //res.send('POST request to the homepage');
    res.write(`<h1>Post complete</h1> `);

    let vars = req.body;
    console.log(vars);

    res.write(JSON.stringify(vars));

    //console.log(req);
    //console.log(res);
});

/**
 * DATABASE (HEROKU) START
 */
/**
Server: sql3.freemysqlhosting.net
Name: sql3252727
Username: sql3252727
Password: PWQRShW1lV
Port number: 3306
 */
const mysql = require('mysql');
const connection = mysql.createConnection(
    {
        host:"sql3.freemysqlhosting.net",
        user:"sql3252727",
        password:"PWQRShW1lV",
        database:"sql3252727"
    }
);

connection.connect( (err) => 
{
    if (err) throw err;
    console.log("Connected to Database");
} );

let sql = "SELECT * FROM TEST";

connection.query(sql, (err, result) => 
{
    if (err) throw err;
    console.log("Success!");
    result.forEach(row => 
    {
        console.log( row );
    });
});

/**
 * SQL Statements made:
 * CREATE TABLE TEST (id int NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), post VARCHAR(1000));
 * INSERT INTO TEST (post) VALUES ('testing to see if i can insert entry into this table : from localhost')
 * SELECT * FROM TEST
 */
 /**
  * DATABASE (HEROKU) END
  */

app.listen(PORT, () => console.log("App launched"));