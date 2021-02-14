const { readFile, writeFile } = require("fs/promises");
const path = require("path");
const ID = require("nodejs-unique-numeric-id-generator");

// === DB ===
const contactsPath = path.join("db", "contacts.json");

// === GET all contacts ===
async function listContacts() {
  try {
    const jsonString = await readFile(contactsPath, "utf8");
    const contctList = JSON.parse(jsonString);

    console.log("Seccess! Here is the All contact from contacts.json");
    console.table(contctList);
  } catch (err) {
    console.log("Error parsing JSON string:", err);
  }
}

// === GET contact by ID ===
async function getContactById(contactId) {
  try {
    const jsonString = await readFile(contactsPath, "utf8");

    JSON.parse(jsonString).filter((contact) => {
      if (contact.id === contactId) {
        console.log("Seccess! You got it");
        console.table([contact]);
      }
    });
  } catch (err) {
    console.log("Error parsing JSON string:", err);
  }
}

// === REMOVE contact by ID ===
async function removeContact(contactId) {
  try {
    const jsonString = await readFile(contactsPath, "utf8");
    const toRemove = JSON.parse(jsonString).filter(
      ({ id }) => id === contactId
    );
    const contctList = JSON.parse(jsonString).filter(
      ({ id }) => id !== contactId
    );

    // write a new collection of contact to contacts.json
    await writeFile(contactsPath, JSON.stringify(contctList));

    console.log("Seccess! The contact was removed from contacts.json");
    console.table(toRemove);
  } catch (err) {
    console.log("Error parsing JSON string:", err);
  }
}

// === ADD new contact ===
async function addContact(name, email, phone) {
  try {
    const jsonString = await readFile(contactsPath, "utf8");
    const id = await Number(ID.generate(new Date().toJSON()));
    const contact = {
      id,
      name,
      email,
      phone,
    };
    const contctList = [...JSON.parse(jsonString), contact];

    // create new collection and write to contacts.json
    await writeFile(contactsPath, JSON.stringify(contctList));

    console.log("Seccess! The new contact was add to contacts.json");
    console.table([contact]);
  } catch (err) {
    console.log("Error parsing JSON string:", err);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
