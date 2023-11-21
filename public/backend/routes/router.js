const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contactController.js');
const callController = require('../controllers/callController.js');
//Contact CRUDs
router.get('/contacts', contactController.getContacts);

router.get('/contact', contactController.getContact);

router.post('/contact', contactController.addContact);

router.put('/contact', contactController.updateContact);

router.delete('/contact', contactController.deleteContact);
//Call CRUDs
router.get('/calls', callController.getCalls);

router.get('/call', callController.getCall);

router.post('/call', callController.addCall)

router.put('/call', callController.updateCall);

router.delete('/call', callController.deleteCall);
//
module.exports = router;
