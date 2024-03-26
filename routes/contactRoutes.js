const express = require('express');
const router = express.Router();
const {
  getAllContact,
  createContact,
  getContactById,
  updateContactById,
  deleteContactById,
} = require('../controllers/contactController');

router.route('/').get(getAllContact).post(createContact);
router
  .route('/:id')
  .get(getContactById)
  .put(updateContactById)
  .delete(deleteContactById);

module.exports = router;
