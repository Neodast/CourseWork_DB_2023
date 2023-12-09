const asyncHandler = require('express-async-handler');
const sql = require('mssql');

const contactModel = require('../models/contactModel.js');
const sortModel = require('../models/sortModel.js');

exports.getContacts = asyncHandler(async (req, res, next) => {
  try {
    const query = await req.db.request().query('select * from Contact');
    res.send(query.recordset);
  } catch (e) {
    console.log(e);
  }
});

exports.getContact = asyncHandler(async (req, res, next) => {
  try {
    const contactData = new contactModel(req.body);
    const query = await req.db
      .request()
      .input('contactId', sql.Int, contactData.contactId)
      .query(`SELECT * from Contact where contactId = @contactId`);
    res.send(query.recordset);
  } catch (e) {
    console.log(e);
  }
});

exports.addContact = asyncHandler(async (req, res, next) => {
  try {
    const contactData = new contactModel(req.body);
    const query = await req.db
      .request()
      .input('contactId', sql.Int, contactData.contactId)
      .input('nickname', sql.NVarChar, contactData.nickname)
      .input('contactName', sql.NVarChar, contactData.contactName)
      .input('contactSurname', sql.NVarChar, contactData.contactSurname)
      .input('mobileNumber', sql.NVarChar, contactData.mobileNumber)
      .input('email', sql.NVarChar, contactData.email)
      .input('companyName', sql.NVarChar, contactData.companyName)
      .input('companyPosition', sql.NVarChar, contactData.companyPosition)
      .query(`
        Insert into Contact
        (contactId, nickname, contactName, contactSurname, mobileNumber, email, companyName, companyPosition)
        values
        (
        @contactId,
        @nickname,
        @contactName,
        @contactSurname,
        @mobileNumber,
        @email,
        @companyName,
        @companyPosition
        )
      `);
    res.send(query.recordset);
  } catch (e) {
    console.log(e);
  }
});

exports.updateContact = asyncHandler(async (req, res, next) => {
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
      ).query(`
        Update Contact
        Set
        nickname = @nickname,
        contactName = @contactName,
        contactSurname = @contactSurname,
        mobileNumber = @mobileNumber,
        email = @email,
        companyName = @companyName,
        companyPosition = @companyPosition
        where contactId = @contactId
      `);
    res.send(query.recordset);
  } catch (e) {
    console.log(e);
  }
});

exports.deleteContact = asyncHandler(async (req, res, next) => {
  try {
    const contactData = new contactModel(req.body);
    const query = await req.db
      .request()
      .input('contactId', sql.Int, contactData.contactId).query(`
      Delete from Call where contactId = @contactId
      Delete from ContactsGroup where contactId = @contactId
      Delete from SocialNetwork where contactId = @contactId
      Delete from Contact where contactId = @contactId
      `);
    res.send(query.recordset);
  } catch (e) {
    console.log(e);
  }
});

//*Orders

exports.OrderContacts = asyncHandler(async (req, res, next) => {
  try {
    const contactData = new sortModel(req.body);
    const query = await req.db.request().query(`
        select * from Contact order by ${contactData.SortBy}
      `);
    res.send(query.recordset);
  } catch (e) {
    console.log(e);
  }
});
