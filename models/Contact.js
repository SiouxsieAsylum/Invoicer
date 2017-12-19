const db = require('../db/config')
const Contact = {};

Contact.findAll = (userId) => {
  return db.manyOrNone(`SELECT * FROM contacts WHERE contractor = $1`,[userId])
}
Contact.findById = (contactId) => {
  return db.one(`SELECT * FROM contacts WHERE contactid = $1`,[contactId])
}
Contact.create = (contact) => {
  return db.one(`INSERT INTO contacts (name,email,owed,service,date_of_service,contractor) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,[contact.name, contact.email, contact.owed, contact.service, contact.date_of_service, contact.contractor])
}
Contact.update = (contact,id) => {
  console.log(contact)
  return db.one(`UPDATE contacts SET name=$1, email=$2, owed=$3, service=$4, date_of_service=$5 WHERE contactId = $6 RETURNING *`,[contact.name, contact.email, contact.owed, contact.service, contact.date_of_service, id])
}
Contact.destroy = (id) => {
  return db.none(`DELETE FROM contacts WHERE contactId = $1`,[id])
}

module.exports = Contact;
