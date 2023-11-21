const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contactController.js');
const callController = require('../controllers/callController.js');
const socialNetworkController = require('../controllers/socialNetworkController.js');
const contactsGroupController = require('../controllers/contactsGroupController.js');

//Contact CRUDs

router.get('/contacts', contactController.getContacts);

router.get('/contact', contactController.getContact);

router.post('/contact', contactController.addContact);

router.put('/contact', contactController.updateContact);

router.delete('/contact', contactController.deleteContact);

//Call CRUDs

router.get('/calls', callController.getCalls);

router.get('/call', callController.getCall);

router.post('/call', callController.addCall);

router.put('/call', callController.updateCall);

router.delete('/call', callController.deleteCall);

//SocialNetwork CRUDs

router.get('/socialNetworks', socialNetworkController.getSocialNetworks);

router.get('/socialNetwork', socialNetworkController.getSocialNetwork);

router.post('/socialNetwork', socialNetworkController.addSocialNetwork);

router.put('/socialNetwork', socialNetworkController.updateSocialNetwork);

router.delete('/socialNetwork', socialNetworkController.deleteSocialNetwork);

//ContactsGroup CRUDs

router.get('/contactsGroups', contactsGroupController.getContactsGroups);

router.get('/contactsGroup', contactsGroupController.getContactsGroup);

router.post('/contactsGroup', contactsGroupController.addContactsGroup);

router.put('/contactsGroup', contactsGroupController.updateContactsGroup);

router.delete('/contactsGroup', contactsGroupController.deleteContactsGroup);

module.exports = router;
