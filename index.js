//npm packeges
const express = require('express');
const app = express();
const path = require('path');
const sql = require('mssql');
const bodyParser = require('body-parser');
//progect packeges
const sqlConfig = require('./public/backend/configs/sqlConfig');
const router = require('./public/backend/routes/router');
//const values
const port = 5000;
let db;
//sql connection
async function sqlConnect() {
  db = await sql.connect(sqlConfig);
}

sqlConnect();
//app usages
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use( function(req, res, next) {
  req.db = db;
  next();
});

//routing
app.use('/', router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
  sqlConnect();
});
