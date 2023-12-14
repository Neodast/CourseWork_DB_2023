const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contactController.js');
const callController = require('../controllers/callController.js');
const socialNetworkController = require('../controllers/socialNetworkController.js');
const contactGroupController = require('../controllers/contactGroupController.js');

//!Contact CRUDs

router.get('/contacts', contactController.getContacts);

router.get('/contact', contactController.getContact);

router.post('/contact', contactController.addContact);

router.put('/contact', contactController.updateContact);

router.delete('/contact', contactController.deleteContact);

//*Contact Oreders

router.get('/contacts/OrderBy', contactController.OrderContacts);

//!Call CRUDs

router.get('/calls', callController.getCalls);

router.get('/call', callController.getCall);

router.post('/call', callController.addCall);

router.put('/call', callController.updateCall);

router.delete('/call', callController.deleteCall);

//*Call Orders

router.get('/calls/OrderBy', callController.OrderCalls);

//*Call Filters

router.get('/calls/FilterBy', callController.FilterCalls);

//!SocialNetwork CRUDs

router.get('/socialNetworks', socialNetworkController.getSocialNetworks);

router.get('/socialNetwork', socialNetworkController.getSocialNetwork);

router.post('/socialNetwork', socialNetworkController.addSocialNetwork);

router.put('/socialNetwork', socialNetworkController.updateSocialNetwork);

router.delete('/socialNetwork', socialNetworkController.deleteSocialNetwork);

//*SocialNetwork Orders

router.get('/networks/OrderBy', socialNetworkController.OrderNetworks);

//!ContactGroup CRUDs

router.get('/groups', contactGroupController.getContactGroups);

router.get('/group', contactGroupController.getContactGroup);

router.post('/group', contactGroupController.addContactGroup);

router.put('/group', contactGroupController.updateContactGroup);

router.delete('/group', contactGroupController.deleteContactGroup);

//*Group Orders

router.get('/groups/OrderBy', contactGroupController.OrderGroups);

module.exports = router;
