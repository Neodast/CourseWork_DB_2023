const asyncHandler = require('express-async-handler');
const sql = require('mssql');

const snModel = require('../models/socialNetworkModel.js');
const sortModel = require('../models/sortModel.js');

exports.getSocialNetworks = async (req, res, next) => {
  try {
    const query = await req.db.request().query(`select * from SocialNetwork`);
    res.send(query.recordset);
  } catch (e) {
    console.log(e);
  }
};

exports.getSocialNetwork = async (req, res, next) => {
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
};

exports.addSocialNetwork = async (req, res, next) => {
  try {
    const snData = new snModel(req.body);
    const query = await req.db
      .request()
      .input('snId', sql.Int, snData.snId)
      .input('snName', sql.NVarChar, snData.snName)
      .input('snLink', sql.NVarChar, snData.snLink).query(`
      Insert into SocialNetwork
      (snId, snName, snLink, contactId)
      values
      (
        @snId,
        @snName,
        @snLink
      )
    `);
    res.send(query.recordset);
  } catch (e) {
    console.log(e);
  }
};

exports.updateSocialNetwork = async (req, res, next) => {
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
      .input('snLink', sql.NVarChar, newData.snLink || oldData.snLink).query(`
      Update SocialNetwork
      Set
      snName = @snName,
      snLink = @snLink
    `);
    res.send(query.recordset);
  } catch (e) {
    console.log(e);
  }
};

exports.deleteSocialNetwork = async (req, res, next) => {
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
};

//*Orders

exports.OrderNetworks = async (req, res, next) => {
  try {
    const networkData = new sortModel(req.body);
    const query = await req.db.request().query(`
        select * from SocialNetwork order by ${networkData.SortBy}
      `);
    res.send(query.recordset);
  } catch (e) {
    console.log(e);
  }
};
