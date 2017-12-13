const db = require('../db/config');
const Email = {}

Email.getTemplate = (id) => {
  return db.one(`SELECT * FROM templates WHERE id = $1`,[id])
}

Email.getAllTemplates = () => {
  return db.query(`SELECT * FROM templates`);
}

module.exports = Email;
