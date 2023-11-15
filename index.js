//npm packeges
const express = require('express');
const app = express();
const path = require('path');
const sql = require('mssql');
const bodyParser = require('body-parser')
//progect packeges
const sqlConfig = require('./public/backend/configs/sqlConfig');
const router = require('./public/backend/routes/kontaktRoutes');
//const values
const port = 5000;
//sql connection
async function sqlConnect() {
  await sql.connect(sqlConfig);
}

sqlConnect();
//app usages
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended:  true }));
app.use(bodyParser.json());
//routing
app.use('/', router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));