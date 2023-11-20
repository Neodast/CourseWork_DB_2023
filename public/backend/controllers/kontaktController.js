const asyncHandler = require('express-async-handler');
const sql = require('mssql');

const kontaktModel = require('../models/kontaktModel.js');
const sqlConfig = require('../configs/sqlConfig.js');

exports.getAllKontakts = asyncHandler(async (req, res, next) => {
  try {
    const query = await req.db.request().query('select * from Kontakt');
    res.send(query.recordset);
  } catch (e) {
    console.log(e);
  }
});

exports.getKontakt = asyncHandler(async (req, res, next) => {
  try {
    const query = await req.db
      .request()
      .input('kontaktId', sql.Int, req.body.kontaktId)
      .query(`SELECT * from Kontakt where kontaktId = @kontaktId`);
    res.send(query.recordset);
  } catch (e) {
    console.log(e);
  }
});

exports.addKontakt = asyncHandler(async (req, res, next) => {
  try {
    let kontaktData = new kontaktModel(req.body);
    let query = await req.db
      .request()
      .input('kontaktId', sql.Int, kontaktData.kontaktId)
      .input('nickname', sql.NVarChar, kontaktData.nickname)
      .input('kontaktName', sql.NVarChar, kontaktData.kontaktName)
      .input('kontaktSurname', sql.NVarChar, kontaktData.kontaktSurname)
      .input('mobileNumber', sql.NVarChar, kontaktData.mobileNumber)
      .input('email', sql.NVarChar, kontaktData.email).query(`
        Insert into Kontakt
        (kontaktId, nickname, kontaktName, kontaktSurname, mobileNumber, email)
        values
        (
        @kontaktId,
        @nickname,
        @kontaktName,
        @kontaktSurname,
        @mobileNumber,
        @email
        )
      `);
    res.send(query.recordset);
  } catch (e) {
    console.log(e);
  }
});

exports.updateKontakt = asyncHandler(async (req, res, next) => {
  try {
    let selectQuery = await req.db
      .request()
      .input('kontaktId', sql.Int, req.body.kontaktId)
      .query(`SELECT * from Kontakt where kontaktId = @kontaktId`);
    let oldData = new kontaktModel(selectQuery.recordset[0]);
    let newData = new kontaktModel(req.body);
    let query = await req.db
      .request()
      .input('kontaktId', sql.Int, newData.kontaktId)
      .input('nickname', sql.NVarChar, newData.nickname || oldData.nickname)
      .input(
        'kontaktName',
        sql.NVarChar,
        newData.kontaktName || oldData.kontaktName
      )
      .input(
        'kontaktSurname',
        sql.NVarChar,
        newData.kontaktSurname || oldData.kontaktSurname
      )
      .input(
        'mobileNumber',
        sql.NVarChar,
        newData.mobileNumber || oldData.mobileNumber
      )
      .input('email', sql.NVarChar, newData.email || oldData.email).query(`
        Update Kontakt
        Set
        nickname = @nickname,
        kontaktName = @kontaktName,
        kontaktSurname = @kontaktSurname,
        mobileNumber = @mobileNumber,
        email = @email
        where kontaktId = @kontaktId
      `);
    res.send(query.recordset);
  } catch (e) {
    console.log(e);
  }
});

exports.deleteKontakt = asyncHandler(async (req, res, next) => {
  try {
    let kontaktData = new kontaktModel(req.body);
    let query = await req.db
      .request()
      .input('kontaktId', sql.Int, kontaktData.kontaktId)
      .query('Delete from Kontakt where kontaktId = @kontaktId');
    res.send(query.recordset);
  } catch (e) {
    console.log(e);
  }
});
