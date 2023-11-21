const asyncHandler = require('express-async-handler');
const sql = require('mssql');

const snModel = require('../models/socialNetworkModel.js');

exports.getSocialNetworks = asyncHandler(async (req, res, next) => {
  try {
    const query = await req.db.request().query(`select * from SocialNetwork`);
    res.send(query.recordset);
  } catch (e) {
    console.log(e);
  }
});

exports.getSocialNetwork = asyncHandler(async (req, res, next) => {
  try {
    const snData = new snModel(req.body);
    const query = await req.db
      .request()
      .input('snId', sql.Int, snData.snId)
      .query(`select * from SocialNetwork where snId = @snId`);
    res.send(query.recordset);
  } catch (e) {
    console.log(e);
  }
});

exports.addSocialNetwork = asyncHandler(async (req, res, next) => {
  try {
    const snData = new snModel(req.body);
    const query = await req.db
      .request()
      .input('snId', sql.Int, snData.snId)
      .input('snName', sql.NVarChar, snData.snName)
      .input('snLink', sql.NVarChar, snData.snLink)
      .input('contactId', sql.Int, snData.contactId).query(`
      Insert into SocialNetwork
      (snId, snName, snLink, contactId)
      values
      (
        @snId,
        @snName,
        @snLink,
        @contactId
      )
    `);
    res.send(query.recordset);
  } catch (e) {
    console.log(e);
  }
});

exports.updateSocialNetwork = asyncHandler(async (req, res, next) => {
  try {
    const newData = new snModel(req.body);
    const selectQuery = await req.db
      .request()
      .input('snId', sql.Int, newData.snId)
      .query(`select * from SocialNetwork where snId = @snId`);
    const oldData = new snModel(selectQuery.recordset[0]);
    const query = await req.db
      .request()
      .input('snName', sql.NVarChar, newData.snName || oldData.snName)
      .input('snLink', sql.NVarChar, newData.snLink || oldData.snLink)
      .input('contactId', sql.Int, newData.contactId || oldData.contactId)
      .query(`
      Update SocialNetwork
      Set
      snName = @snName,
      snLink = @snLink,
      contactId = @contactId
    `);
    res.send(query.recordset);
  } catch (e) {
    console.log(e);
  }
});

exports.deleteSocialNetwork = asyncHandler(async (req, res, next) => {
  try {
    const snData = new snModel(req.body);
    const query = await req.db.request().input('snId', sql.Int, snData.snId)
      .query(`
      Delete from SocialNetwork where snId = @snId
    `);
    res.send(query.recordset);
  } catch (e) {
    console.log(e);
  }
});
