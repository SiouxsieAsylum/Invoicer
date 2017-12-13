const db = require('../db/config');
const User = {}

User.findById = id => {
  return db.one(`SELECT * FROM users WHERE id=$1`,[id])
}

User.findByEmail = email => {
  return db.one(`SELECT * FROM users WHERE email=$1`,[email])
}

User.create = user => {
  return db.one(`INSERT INTO users (email,password_digest,name,company,icon,signature) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,[user.email,user.password_digest,user.name,user.company,user.icon,user.signature])
}

User.update = (user,id) => {
 return db.one(`UPDATE users SET email=$1,name=$2,company=$3,icon=$4,signature=$5 WHERE id=$6`,[])
}

module.exports = User;

// when I get back, actually make the fucking database

