const asyncHandler = require('express-async-handler');
const sql = require('mssql');

const groupModel = require('../models/contactsGroupModel.js');

exports.getContactsGroups = asyncHandler(async (req, res, next) => {
  try {
    const query = await req.db.request().query(`select * from ContactsGroup`);
    res.send(query.recordset);
  } catch (e) {
    console.log(e);
  }
});

exports.getContactsGroup = asyncHandler(async (req, res, next) => {
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

exports.addContactsGroup = asyncHandler(async (req, res, next) => {
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

exports.updateContactsGroup = asyncHandler(async (req, res, next) => {
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

exports.deleteContactsGroup = asyncHandler(async (req, res, next) => {
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
