const Email = require('../models/Email');
const Contact = require('../models/Contact')
const nodemailer = require('nodemailer')
const emailControllers = {};

emailControllers.getTemplate = (req,res,next) =>{
  Email.getTemplate(req.params.id)
    .then(template =>{
      Contact.findAll(req.user.id)
        .then(contacts => {
          res.render('emails/new',{
            template:template,
            contacts:contacts,
            auth: true,
            user: req.user
          })
        })
        .catch(err => console.log(err))
    })
  .catch(next)
}
emailControllers.getAllTemplates = (req,res,next) =>{
  console.log("templates")
  Email.getAllTemplates()
  .then(templates => {
    res.render('emails/index',{
      templates:templates,
      auth: true,
      user: req.user
    })
  })
  .catch(next)
}
emailControllers.sendEmails = (req,res,next) =>{
  let  transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port:465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: req.user,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        accessToken: req.user.accessToken
    }
  });

  let mailOptions = {
        from: req.user.email,
        to: req.body.to, // list of receivers
        subject: req.body.subject, // Subject line
        text: req.body.text, // plain text body
        html: `<b>${req.body.text}</b>` // html body
  };

  transporter.sendMail(mailOptions, (error, response) => {
        if (error) {
            console.log(error);
            res.send(error)
        }
        console.log('Message sent: %s', response.messageId);
      res.render('emails/sent',{
        auth: true,
        user: req.user
      })

    });

}

module.exports = emailControllers;
