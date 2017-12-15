const User = require('../../models/User')
// const bcrypt = require('bcryptjs')

// const firstOriginalPassword = "farrah"
// const salt = bcrypt.genSaltSync();
// const firstPassword = bcrypt.hashSync(firstOriginalPassword, salt);

// const secondOriginalPassword = "healer"
// const swiggitysalt = bcrypt.genSaltSync();
// const secondPassword = bcrypt.hashSync(secondOriginalPassword, salt);

const firstUser = {email: "mckenzie.andrea.m@gmail.com",
                   // password_digest: firstPassword,
                   name: "Andrea McKenzie",
                   company: "MacDaddy Enterprises"}

const secondUser = {email: "datetimetest001@yahoo.com",
                    // password_digest: secondPassword,
                    name: "Testy McTest",
                    company: "TestCorp"}

User.create(firstUser)
User.create(secondUser)
