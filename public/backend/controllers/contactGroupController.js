const sql = require('mssql');

const groupModel = require('../models/contactsGroupModel.js');
const sortModel = require('../models/sortModel.js');
const filterModel = require('../models/filterModel.js');

exports.getContactGroups = async (req, res, next) => {
  try {
    const sortData = new sortModel(req.query);
    const groupFilter = new filterModel(req.query);
    let queryString = `select * from ContactGroup `;
    try {
      for (let i = 0; i < Object.keys(groupFilter.filter).length; i++) {
        if (i == 0) {
          queryString +=
            'where ' +
            Object.keys(groupFilter.filter)[i] +
            ' = ' +
            `'` +
            Object.values(groupFilter.filter)[i] +
            `'`;
        } else {
          queryString +=
            ' and ' +
            Object.keys(groupFilter.filter)[i] +
            ' = ' +
            `'` +
            Object.values(groupFilter.filter)[i] +
            `'`;
        }
      }
    } catch {}
    const query = await req.db
      .request()
      .query(queryString + ' order by ' + (sortData.sortBy || 'groupId'));
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
  try {
    const data = new groupModel(req.body);
    const sortData = new sortModel(req.query);
    const groupFilter = new filterModel(req.query);
    let queryString = `select * from Contact c where c.groupId = ${data.groupId} `;
    try {
      for (let i = 0; i < Object.keys(groupFilter.filter).length; i++) {
        queryString +=
          ' and ' +
          Object.keys(groupFilter.filter)[i] +
          ' = ' +
          `'` +
          Object.values(groupFilter.filter)[i] +
          `'`;
      }
    } catch {}
    const query = await req.db
      .request()
      .query(queryString + ' order by ' + (sortData.sortBy || 'groupId'));
    res.send(query.recordset);
  } catch (e) {
    console.log(e);
  }
};

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
    const query = await req.db.request().input('groupId', sql.Int, data.groupId)
      .query(`
      Delete from ContactGroup where groupId = @groupId
    `);
    res.send(query.recordset);
  } catch (e) {
    console.log(e);
  }
};
