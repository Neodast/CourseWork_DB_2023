const asyncHandler = require('express-async-handler');
const sql = require('mssql');

const callModel = require('../models/callModel.js');

exports.getCalls = asyncHandler(async (req, res, next) => {
  try {
    const query = await req.db.request().query('select * from Call');
    res.send(query.recordset);
  } catch (e) {
    console.log(e);
  }
});

exports.getCall = asyncHandler(async (req, res, next) => {
  try {
    const callData = new callModel(req.body);
    const query = await req.db
      .request()
      .input('callId', sql.Int, callData.callId)
      .query('select * from Call where callId = @callId');
    res.send(query.recordset);
  } catch (e) {
    console.log(e);
  }
});

exports.addCall = asyncHandler(async (req, res, next) => {
  try {
    const callData = new callModel(req.body);
    const query = await req.db
      .request()
      .input('callId', sql.Int, callData.callId)
      .input('callDate', sql.Date, callData.callDate)
      .input('isResponce', sql.Bit, callData.isResponce)
      .input('callTime', sql.NVarChar(8), callData.callTime)
      .input('contactId', sql.Int, callData.contactId).query(`
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
    res.send(query.recordset);
  } catch (e) {
    console.log(e);
  }
});

exports.updateCall = asyncHandler(async (req, res, next) => {
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
      callId = @callId,
      callDate = @callDate,
      isResponce = @isResponce,
      callTime = @callTime,
      contactId = @contactId
    `);
    res.send(query.recordset);
  } catch (e) {
    console.log(e);
  }
});

exports.deleteCall = asyncHandler(async (req, res, next) => {
  try {
    const callData = new callModel(req.body);
    const query = await req.db
      .request()
      .input('callId', sql.Int, callData.callId).query(`
      Delete from Call where callId = @callId
    `);
    res.send(query.recordset);
  } catch (e) {
    console.log(e);
  }
});
