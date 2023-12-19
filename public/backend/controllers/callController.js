const sql = require('mssql');

const callModel = require('../models/callModel.js');
const sortModel = require('../models/sortModel.js');
const filterModel = require('../models/filterModel.js');

exports.getCalls = async (req, res, next) => {
  try {
    const sortData = new sortModel(req.query);
    const callFilter = new filterModel(req.query);
    let queryString = `select * from Call `;
    try {
      for (let i = 0; i < Object.keys(callFilter.filter).length; i++) {
        if (i == 0) {
          queryString +=
            'where ' +
            Object.keys(callFilter.filter)[i] +
            ' = ' + `'` +
            Object.values(callFilter.filter)[i] + `'`;
        } else {
          queryString +=
            ' and ' +
            Object.keys(callFilter.filter)[i] +
            ' = ' + `'` +
            Object.values(callFilter.filter)[i] + `'`;
        }
      }
    } catch {}
    const query = await req.db
      .request()
      .query(queryString + ' order by ' + (sortData.sortBy || 'callId'));
    res.send(query.recordset);
  } catch (e) {
    res.send(400);
    console.log(e);
  }
};

exports.getCall = async (req, res, next) => {
  try {
    const data = new callModel(req.query);
    const query = await req.db
      .request()
      .input('callId', sql.Int, data.callId)
      .query('select * from Call where callId = @callId');
    res.send(query.recordset);
  } catch (e) {
    res.send(400);
    console.log(e);
  }
};

exports.addCall = async (req, res, next) => {
  try {
    const data = new callModel(req.body);
    const query = await req.db
      .request()
      .input('callId', sql.Int, data.callId)
      .input('callDate', sql.Date, data.callDate)
      .input('isResponce', sql.Bit, data.isResponce)
      .input('callTime', sql.NVarChar(8), data.callTime)
      .input('contactId', sql.Int, data.contactId).query(`
      insert into Call
      (callId, callDate, isResponce, callTime, contactId)
      values
      (
      @callId,
      @callDate,
      @isResponce,
      @callTime,
      @contactId
      )
    `);
    res.send(200);
  } catch (e) {
    res.send(400);
    console.log(e);
  }
};

exports.updateCall = async (req, res, next) => {
  try {
    const newData = new callModel(req.body);
    const selectQuery = await req.db
      .request()
      .input('callId', sql.Int, newData.callId)
      .query(`select * from Call where callId = @callId`);
    const oldData = new callModel(selectQuery.recordset[0]);
    const query = await req.db
      .request()
      .input('callId', sql.Int, newData.callId)
      .input('callDate', sql.Date, newData.callDate || oldData.callDate)
      .input('isResponce', sql.Bit, newData.isResponce || oldData.isResponce)
      .input('callTime', sql.NVarChar(8), newData.callTime || oldData.callTime)
      .input('contactId', sql.Int, newData.contactId || oldData.contactId)
      .query(`
      Update Call
      Set
      callDate = @callDate,
      isResponce = @isResponce,
      callTime = @callTime,
      contactId = @contactId
    `);
    res.send(200);
  } catch (e) {
    res.send(400);
    console.log(e);
  }
};

exports.deleteCall = async (req, res, next) => {
  try {
    const data = new callModel(req.query);
    const query = await req.db.request().input('callId', sql.Int, data.callId)
      .query(`
      Delete from Call where callId = @callId
    `);
    res.send(200);
  } catch (e) {
    res.send(400);
    console.log(e);
  }
};
