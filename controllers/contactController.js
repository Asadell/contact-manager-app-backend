const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');
const mongoose = require('mongoose');

//@desc Get all contacts
//@route Get /api/contacts
//@access public
const getAllContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
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

  const contact = await Contact.create({
    name,
    email,
    phone,
  });
  res.status(201).json(contact);
});

//@desc Get contact
//@route Get /api/contacts/:id
//@access public
const getContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error('Contact Not Found');
  }
  res.status(200).json(contact);
});

//@desc Update contact by id
//@route PUT /api/contacts/:id
//@access public
const updateContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error('Contact Not Found');
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

//@desc Delete contact by id
//@route DELETE /api/contacts/:id
//@access public
const deleteContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error('Contact Not Found');
  }
  const deletedContact = await Contact.findByIdAndDelete(req.params.id);
  res.status(200).json(deletedContact);
});

module.exports = {
  getAllContact,
  createContact,
  getContactById,
  updateContactById,
  deleteContactById,
};
