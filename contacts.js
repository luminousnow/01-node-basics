const fs = require("fs");
const path = require("path");
const ID = require("nodejs-unique-numeric-id-generator");

// DB url to contacts.json file
const contactsPath = path.join("db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf8", (err, jsonString) => {
    if (err) {
      console.log("Error reading file", err);
      return;
    }

    try {
      const contctList = JSON.parse(jsonString);
      console.log("Seccess! Here is the All contact from contacts.json");
      console.table(contctList);
    } catch (err) {
      console.log("Error parsing JSON string:", err);
    }
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf8", (err, jsonString) => {
    if (err) {
      console.log("Error reading file", err);
      return;
    }

    try {
      const contctList = JSON.parse(jsonString);

      contctList.filter((contact) => {
        if (contact.id === contactId) {
          console.log("Seccess! You got it");
          console.table([contact]);
        }
      });
    } catch (err) {
      console.log("Error parsing JSON string:", err);
    }
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf8", (err, jsonString) => {
    if (err) {
      console.log("Error reading file", err);
      return;
    }

    try {
      const toRemove = JSON.parse(jsonString).filter(
        (contact) => contact.id === contactId
      );
      const contctList = JSON.parse(jsonString).filter(
        (contact) => contact.id !== contactId
      );

      // write a new collection of contact to contacts.json
      fs.writeFile(contactsPath, JSON.stringify(contctList), (err) => {
        if (err) {
          console.log("Error reading file", err);
          return;
        }
        console.log("Seccess! The contact was removed from contacts.json");
        console.table(toRemove);
      });
    } catch (err) {
      console.log("Error parsing JSON string:", err);
    }
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf8", (err, jsonString) => {
    if (err) {
      console.log("Error reading file", err);
      return;
    }

    try {
      const id = Number(ID.generate(new Date().toJSON()));
      const contact = {
        id,
        name,
        email,
        phone,
      };
      const contctList = [...JSON.parse(jsonString), contact];

      // create new collection whis a new contact adn write to contacts.json
      fs.writeFile(contactsPath, JSON.stringify(contctList), (err) => {
        if (err) {
          console.log("Error append data", err);
          return;
        }

        console.log("Seccess! The new contact was add to contacts.json");
        console.table([contact]);
      });
    } catch (err) {
      console.log("Error parsing JSON string:", err);
    }
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
