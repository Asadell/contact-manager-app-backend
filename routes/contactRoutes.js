const express = require('express');
const router = express.Router();
const {
  getAllContact,
  createContact,
  getContactById,
  updateContactById,
  deleteContactById,
} = require('../controllers/contactController');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);
router.route('/').get(getAllContact).post(createContact);
router
  .route('/:id')
  .get(getContactById)
  .put(updateContactById)
  .delete(deleteContactById);

module.exports = router;
