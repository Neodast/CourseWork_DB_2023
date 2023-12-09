const asyncHandler = require('express-async-handler');
const sql = require('mssql');

const groupModel = require('../models/contactsGroupModel.js');
const sortModel =  require('../models/sortModel.js')

exports.getContactGroups = asyncHandler(async (req, res, next) => {
  try {
    const query = await req.db.request().query(`select * from ContactsGroup`);
    res.send(query.recordset);
  } catch (e) {
    console.log(e);
  }
});

exports.getContactGroup = asyncHandler(async (req, res, next) => {
  try {
    const groupData = new groupModel(req.body);
    const query = await req.db
      .request()
      .input('groupId', sql.Int, groupData.groupId)
      .query(`select * from ContactsGroup where groupId = @groupId`);
    res.send(query.recordset);
  } catch (e) {
    console.log(e);
  }
});

exports.addContactGroup = asyncHandler(async (req, res, next) => {
  try {
    const groupData = new groupModel(req.body);
    const query = await req.db
      .request()
      .input('groupId', sql.Int, groupData.groupId)
      .input('groupName', sql.NVarChar, groupData.groupName)
      .input('contactId', sql.Int, groupData.contactId).query(`
      Insert into ContactsGroup
      (groupId, groupName, contactId)
      values
      (
        @groupId,
        @groupName,
        @contactId
      )
    `);
    res.send(query.recordset);
  } catch (e) {
    console.log(e);
  }
});

exports.updateContactGroup = asyncHandler(async (req, res, next) => {
  try {
    const newData = new groupModel(req.body);
    const selectQuery = await req.db
      .request()
      .input('groupId', sql.Int, newData.groupId)
      .query(`select * from ContactsGroup where groupId = @groupId`);
    const oldData = new groupModel(selectQuery.recordset[0]);
    const query = await req.db
      .request()
      .input('groupName', sql.NVarChar, newData.groupName || oldData.groupName)
      .input('contactId', sql.Int, newData.contactId || oldData.contactId)
      .query(`
      Update ContactsGroup
      Set
      groupName = @groupName,
      contactId = @contactId
    `);
    res.send(query.recordset);
  } catch (e) {
    console.log(e);
  }
});

exports.deleteContactGroup = asyncHandler(async (req, res, next) => {
  try {
    const groupData = new groupModel(req.body);
    const query = await req.db
      .request()
      .input('groupId', sql.Int, groupData.groupId).query(`
      Delete from ContactsGroup where groupId = @groupId
    `);
    res.send(query.recordset);
  } catch (e) {
    console.log(e);
  }
});

//*Orders

exports.OrderGroups = asyncHandler(async (req, res, next) => {
  try {
    const groupData = new sortModel(req.body);
    const query = await req.db.request().query(`
        select * from ContactsGroup order by ${groupData.SortBy}
      `);
    res.send(query.recordset);
  } catch (e) {
    console.log(e);
  }
});
