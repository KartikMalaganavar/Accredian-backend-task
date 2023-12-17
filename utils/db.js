const mysql =  require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
})

con.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL: ' + err.stack);
      return;
    }
  
    console.log('Connected to MySQL as id ' + con.threadId);
  
    
  });


  module.exports = con;
