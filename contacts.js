const { readFile, writeFile } = require("fs/promises");
const path = require("path");
const ID = require("nodejs-unique-numeric-id-generator");

// DB url to contacts.json file
const contactsPath = path.join("db", "contacts.json");

// === GET all contacts ===
async function listContacts() {
  try {
    const contctList = JSON.parse(await readFile(contactsPath, "utf8"));

    console.log("Seccess! Here is the All contact from contacts.json");
    console.table(contctList);
  } catch (err) {
    console.log("Error parsing JSON string:", err);
  }
}

// === GET contact by ID ===
async function getContactById(contactId) {
  try {
    JSON.parse(await readFile(contactsPath, "utf8")).filter((contact) => {
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
    const toRemove = JSON.parse(await readFile(contactsPath, "utf8")).filter(
      (contact) => contact.id === contactId
    );
    const contctList = JSON.parse(await readFile(contactsPath, "utf8")).filter(
      (contact) => contact.id !== contactId
    );

    // write a new collection of contact to contacts.json
    await writeFile(contactsPath, JSON.stringify(contctList));

    console.log("Seccess! The contact was removed from contacts.json");
    console.table(toRemove);
  } catch (err) {
    console.log("Error parsing JSON string:", err);
  }
}

async function addContact(name, email, phone) {
  try {
    const id = await Number(ID.generate(new Date().toJSON()));
    const contact = {
      id,
      name,
      email,
      phone,
    };
    const contctList = [
      ...JSON.parse(await readFile(contactsPath, "utf8")),
      contact,
    ];

    // create new collection whis a new contact adn write to contacts.json
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
