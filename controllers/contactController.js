const asyncHandler = require('express-async-handler');

//@desc Get all contacts
//@route Get /api/contacts
//@access public
const getAllContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Get all contact' });
});

//@desc Create new contacts
//@route POST /api/contacts
//@access public
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error('All fields are mandatory');
  }
  res.status(201).json({ message: 'Create contact' });
});

//@desc Get contact
//@route Get /api/contacts/:id
//@access public
const getContactById = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Get contact for ${req.params.id}` });
});

//@desc Update contact by id
//@route PUT /api/contacts/:id
//@access public
const updateContactById = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update contact for ${req.params.id}` });
});

//@desc Delete contact by id
//@route DELETE /api/contacts/:id
//@access public
const deleteContactById = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete contact for ${req.params.id}` });
});

module.exports = {
  getAllContact,
  createContact,
  getContactById,
  updateContactById,
  deleteContactById,
};
