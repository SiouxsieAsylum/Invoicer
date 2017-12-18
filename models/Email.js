const db = require('../db/config');
const Email = {}

Email.getTemplate = (templateId) => {
  return db.one(`SELECT * FROM templates WHERE templateid = $1`,[templateId])
}

Email.getAllTemplates = () => {
  return db.query(`SELECT * FROM templates`);
}

module.exports = Email;
