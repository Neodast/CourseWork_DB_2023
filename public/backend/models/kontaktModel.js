const sqlConfig = require('../configs/sqlConfig.js');
const sql = require('mssql');

class kontaktModel {
  constructor(json) {
    this.kontaktId = json.kontaktId;
    this.nickname = json.nickname;
    this.kontaktName = json.kontaktName;
    this.kontaktSurname = json.kontaktSurname;
    this.mobileNumber = json.mobileNumber;
    this.email = json.email;
  }
}

module.exports = kontaktModel;
