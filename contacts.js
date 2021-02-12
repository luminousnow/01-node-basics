const fs = require("fs").promises;
const path = require("path");

// DB url to contacts.json file
const contactsPath = path.basename("./db/contacts.json");

function listContacts() {
  // ...твой код
}

function getContactById(contactId) {
  // ...твой код
}

function removeContact(contactId) {
  // ...твой код
}

function addContact(name, email, phone) {
  // ...твой код
}

module.exports = {
  contactsPath,
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
