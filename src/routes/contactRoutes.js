const route = require('express').Router();
const contactController = require('./../controllers/contactController');
const authController = require('./../controllers/authController');

router 
  .route('/')
  .get(contactController.getAllContacts) 

router 
  .route('/')
  .post(
    authController.restrictTo('user'),
    contactController.createContact
  )  

router.use(authController.restrictTo('user', 'admin'))

router
  .route('/:id')
  .patch(contactController.updateContact)
  .delete(contactController.deleteContact)
