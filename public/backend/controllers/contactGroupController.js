const sql = require('mssql');

const groupModel = require('../models/contactsGroupModel.js');
const sortModel = require('../models/sortModel.js');

exports.getContactGroups = async (req, res, next) => {
  try {
    const sortData = new sortModel(req.query);
    const query = await req.db.request().query(`select * from ContactGroup order by ${sortData.sortBy || 'groupId'}`);
    res.send(query.recordset);
  } catch (e) {
    console.log(e);
  }
};

exports.getContactGroupInfo = async (req, res, next) => {
  try {
    const data = new groupModel(req.body);
    const query = await req.db
      .request()
      .input('groupId', sql.Int, data.groupId)
      .query(`select * from ContactGroup where groupId = @groupId`);
    res.send(query.recordset);
  } catch (e) {
    console.log(e);
  }
};

exports.getContactGroupMembers = async (req, res, next) => {
  try{
    const data = new groupModel(req.body);
    const sortData = new sortModel(req.query);
    const query = await req.db
      .request()
      .input('groupId', sql.Int, data.groupId)
      .query(`
        select * from Contact c
        where c.groupId = @groupId
        order by ${sortData.sortBy || 'contactId'}
      `);
    res.send(query.recordset);
  }catch(e){
    console.log(e);
  }
}

exports.addContactGroup = async (req, res, next) => {
  try {
    const data = new groupModel(req.body);
    const query = await req.db
      .request()
      .input('groupId', sql.Int, data.groupId)
      .input('groupName', sql.NVarChar, data.groupName).query(`
      Insert into ContactGroup
      (groupId, groupName, contactId)
      values
      (
        @groupId,
        @groupName
      )
    `);
    res.send(query.recordset);
  } catch (e) {
    console.log(e);
  }
};

exports.updateContactGroup = async (req, res, next) => {
  try {
    const newData = new groupModel(req.body);
    const selectQuery = await req.db
      .request()
      .input('groupId', sql.Int, newData.groupId)
      .query(`select * from ContactGroup where groupId = @groupId`);
    const oldData = new groupModel(selectQuery.recordset[0]);
    const query = await req.db
      .request()
      .input('groupName', sql.NVarChar, newData.groupName || oldData.groupName)
      .query(`
      Update ContactGroup
      Set
      groupName = @groupName
    `);
    res.send(query.recordset);
  } catch (e) {
    console.log(e);
  }
};

exports.deleteContactGroup = async (req, res, next) => {
  try {
    const data = new groupModel(req.body);
    const query = await req.db
      .request()
      .input('groupId', sql.Int, data.groupId).query(`
      Delete from ContactGroup where groupId = @groupId
    `);
    res.send(query.recordset);
  } catch (e) {
    console.log(e);
  }
};
