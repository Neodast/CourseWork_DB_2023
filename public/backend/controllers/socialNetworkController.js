const sql = require('mssql');

const snModel = require('../models/socialNetworkModel.js');
const sortModel = require('../models/sortModel.js');
const filterModel = require('../models/filterModel.js');

exports.getSocialNetworks = async (req, res, next) => {
  try {
    const sortData = new sortModel(req.query);
    const snFilter = new filterModel(req.query);
    let queryString = `select * from SocialNetwork `;
    try {
      for (let i = 0; i < Object.keys(snFilter.filter).length; i++) {
        if (i == 0) {
          queryString +=
            'where ' +
            Object.keys(snFilter.filter)[i] +
            ' = ' + `'` +
            Object.values(snFilter.filter)[i] + `'`;
        } else {
          queryString +=
            ' and ' +
            Object.keys(snFilter.filter)[i] +
            ' = ' + `'` +
            Object.values(snFilter.filter)[i] + `'`;
        }
      }
    } catch {}
    const query = await req.db
      .request()
      .query(queryString + ' order by ' + (sortData.sortBy || 'snId'));
    res.send(query.recordset);
  } catch (e) {
    console.log(e);
  }
};


exports.getSocialNetwork = async (req, res, next) => {
  try {
    const data = new snModel(req.body);
    const query = await req.db
      .request()
      .input('snId', sql.Int, data.snId)
      .query(`select * from SocialNetwork where snId = @snId`);
    res.send(query.recordset);
  } catch (e) {
    console.log(e);
  }
};

exports.addSocialNetwork = async (req, res, next) => {
  try {
    const data = new snModel(req.body);
    const query = await req.db
      .request()
      .input('snId', sql.Int, data.snId)
      .input('snName', sql.NVarChar, data.snName)
      .input('snLink', sql.NVarChar, data.snLink).query(`
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
    const data = new snModel(req.body);
    const selectQuery = await req.db
      .request()
      .input('snId', sql.Int, data.snId)
      .query(`select * from SocialNetwork where snId = @snId`);
    const oldData = new snModel(selectQuery.recordset[0]);
    const query = await req.db
      .request()
      .input('snName', sql.NVarChar, data.snName || oldData.snName)
      .input('snLink', sql.NVarChar, data.snLink || oldData.snLink).query(`
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
    const data = new snModel(req.body);
    const query = await req.db.request().input('snId', sql.Int, data.snId)
      .query(`
      Delete from SocialNetwork where snId = @snId
    `);
    res.send(query.recordset);
  } catch (e) {
    console.log(e);
  }
};
