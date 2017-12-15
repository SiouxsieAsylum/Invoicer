const db = require('../db/config');
const User = {}

User.findById = id => {
  return db.oneOrNone(`SELECT * FROM users WHERE id=$1`,[id])
}

User.findByEmail = email => {
  return db.oneOrNone(`SELECT * FROM users WHERE email=$1`,[email])
}

User.create = user => {
  return db.one(`INSERT INTO users (email,name,company,icon,signature,accessToken) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,[user.email,user.name,user.company,user.icon,user.signature,user.accessToken])
}

User.update = (user,id) => {
 return db.one(`UPDATE users SET email=$1,name=$2,company=$3,icon=$4,signature=$5 WHERE id=$6`,[])
}

// User.updateRefreshToken = (token,email) => {
//   return db.one(`UPDATE users SET refreshToken=$1 WHERE email=$2 RETURNING`,[token, email])
// }

User.updateAccessToken = (token,email) => {
  return db.one(`UPDATE users SET accessToken=$1 WHERE email=$2 RETURNING *`,[token, email])
}

module.exports = User;

// when I get back, actually make the fucking database

