const db = require('../db/config');
const Email = {}

Email.getTemplate = (templateId) => {
  return db.one(`SELECT * FROM templates WHERE templateid = $1`,[templateId])
}

Email.getAllTemplates = () => {
  return db.query(`SELECT * FROM templates`);
}

Email.newTemplate = (template) => {
  return db.one(`INSERT INTO templates (name,template) VALUES ($1,$2) RETURNING *`,[template.name, template.template])
}

module.exports = Email;
