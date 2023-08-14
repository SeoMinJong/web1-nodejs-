const mysql = require('mysql');

var db = mysql.createConnection({
  host:'127.0.0.1',
  user:'root',
  password:'123123',
  database:'opentutorials'
})
db.connect();


module.exports = db