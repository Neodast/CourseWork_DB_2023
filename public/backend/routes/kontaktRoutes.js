const express = require('express');
const router = express.Router();

const kontaktController = require('../controllers/kontaktController.js');

router.get('/kontakts', kontaktController.getAllKontakts);

router.get('/kontakt', kontaktController.getKontakt);

router.post('/kontakt', kontaktController.addKontakt);

router.put('/kontakt', kontaktController.updateKontakt);

router.delete('/kontakt', kontaktController.deleteKontakt);

module.exports = router;
