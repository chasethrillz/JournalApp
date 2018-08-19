const express = require('express');
const fs = require('fs');

const app = express();

//to process post parameters
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded(      // to support URL-encoded bodies
{     
  extended: true
})); 

//DATABASE INFORMATION AND CONNECTION
/**
*Server: sql3.freemysqlhosting.net
*Name: sql3252727
*Username: sql3252727
*Password: PWQRShW1lV
*Port number: 3306
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

//to get to work on heroku
const PORT = process.env.PORT || 5000

app.get('/', (req,res) => 
{  
    fs.readFile(`${__dirname}/journal_form.html`, (err, data) =>
    {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(`<h1>test complete</h1> ${data}`);
    });

    let sql = "SELECT * FROM TEST";
    connection.query(sql, (err, result) =>
    {
      if (err) throw err;
      //console.log("Query Successful!");
      //console.log(result);
      res.write(`<h1>TEST table :</h1>`);
      res.write( JSON.stringify( result ) );
    });
}); 

app.post('/post', function (req, res) 
{
    res.write(`<h1>Post complete!</h1>`);

    //SAVING POST IN DB
    let sql = `INSERT INTO TEST 
    (name, post) 
    VALUES 
    ('${req.body.username}', '${req.body.post}');`;

    connection.query(sql, (err, result) =>
    {
      if (err) throw err;
      console.log("Query Successful!");
      console.log(result);
    });


    res.write(`
    <p>${JSON.stringify(req.body)}</p>
    <p>sql query :  ${sql}</p>
    `);

});


/**
 * SQL Statements made:
 * CREATE TABLE TEST (id int NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), post VARCHAR(1000));
 * INSERT INTO TEST (post) VALUES ('testing to see if i can insert entry into this table : from localhost')
 * SELECT * FROM TEST
 */


app.listen(PORT, () => console.log("App launched"));