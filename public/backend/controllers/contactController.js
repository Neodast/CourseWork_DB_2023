const sql = require('mssql');

const contactModel = require('../models/contactModel.js');
const sortModel = require('../models/sortModel.js');
const filterModel = require('../models/filterModel.js');

exports.getContacts = async (req, res, next) => {
  try {
    const sortData = new sortModel(req.query);
    const contactFilter = new filterModel(req.query);
    let queryString = `select * from Contact `;
    try {
      for (let i = 0; i < Object.keys(contactFilter.filter).length; i++) {
        if (i == 0) {
          queryString +=
            'where ' +
            Object.keys(contactFilter.filter)[i] +
            ' = ' + `'` +
            Object.values(contactFilter.filter)[i] + `'`;
        } else {
          queryString +=
            ' and ' +
            Object.keys(contactFilter.filter)[i] +
            ' = ' + `'` +
            Object.values(contactFilter.filter)[i] + `'`;
        }
      }
    } catch {}
    const query = await req.db
      .request()
      .query(queryString + ' order by ' + (sortData.sortBy || 'contactId'));
    res.send(query.recordset);
  } catch (e) {
    console.log(e);
  }
};

exports.getContact = async (req, res, next) => {
  try {
    const data = new contactModel(req.body);
    const query = await req.db
      .request()
      .input('contactId', sql.Int, data.contactId)
      .query(`SELECT * from Contact where contactId = @contactId`);
    res.send(query.recordset);
  } catch (e) {
    console.log(e);
  }
};

exports.addContact = async (req, res, next) => {
  try {
    const data = new contactModel(req.body);
    const query = await req.db
      .request()
      .input('contactId', sql.Int, data.contactId)
      .input('nickname', sql.NVarChar, data.nickname)
      .input('contactName', sql.NVarChar, data.contactName)
      .input('contactSurname', sql.NVarChar, data.contactSurname)
      .input('mobileNumber', sql.NVarChar, data.mobileNumber)
      .input('email', sql.NVarChar, data.email)
      .input('companyName', sql.NVarChar, data.companyName)
      .input('companyPosition', sql.NVarChar, data.companyPosition)
      .input('groupId', sql.Int, data.groupId)
      .input('snId', sql.Int, data.snId).query(`
        Insert into Contact
        (contactId, nickname, contactName, contactSurname, mobileNumber, email, companyName, companyPosition, groupId, snId)
        values
        (
        @contactId,
        @nickname,
        @contactName,
        @contactSurname,
        @mobileNumber,
        @email,
        @companyName,
        @companyPosition,
        @groupId,
        @snId
        )
      `);
    res.send(query.recordset);
  } catch (e) {
    console.log(e);
  }
};

exports.updateContact = async (req, res, next) => {
  try {
    const newData = new contactModel(req.body);
    const selectQuery = await req.db
      .request()
      .input('contactId', sql.Int, newData.contactId)
      .query(`SELECT * from Contact where contactId = @contactId`);
    const oldData = new contactModel(selectQuery.recordset[0]);
    const query = await req.db
      .request()
      .input('contactId', sql.Int, newData.contactId)
      .input('nickname', sql.NVarChar, newData.nickname || oldData.nickname)
      .input(
        'contactName',
        sql.NVarChar,
        newData.contactName || oldData.contactName
      )
      .input(
        'contactSurname',
        sql.NVarChar,
        newData.contactSurname || oldData.contactSurname
      )
      .input(
        'mobileNumber',
        sql.NVarChar,
        newData.mobileNumber || oldData.mobileNumber
      )
      .input('email', sql.NVarChar, newData.email || oldData.email)
      .input(
        'companyName',
        sql.NVarChar,
        newData.companyName || oldData.companyName
      )
      .input(
        'companyPosition',
        sql.NVarChar,
        newData.companyPosition || oldData.companyPosition
      )
      .input('groupId', sql.Int, newData.groupId || oldData.groupId)
      .input('snId', sql.Int, newData.snId || oldData.snId).query(`
        Update Contact
        Set
        nickname = @nickname,
        contactName = @contactName,
        contactSurname = @contactSurname,
        mobileNumber = @mobileNumber,
        email = @email,
        companyName = @companyName,
        companyPosition = @companyPosition,
        groupId = @groupId,
        snId = @snId,
        where contactId = @contactId
      `);
    res.send(query.recordset);
  } catch (e) {
    console.log(e);
  }
};

exports.deleteContact = async (req, res, next) => {
  try {
    const data = new contactModel(req.body);
    const query = await req.db
      .request()
      .input('contactId', sql.Int, data.contactId).query(`
      Delete from Contact where contactId = @contactId
      `);
    res.send(query.recordset);
  } catch (e) {
    console.log(e);
  }
};
