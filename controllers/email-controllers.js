const Email = require('../models/Email');
const Contact = require('../models/Contact')
const nodemailer = require('nodemailer')
const emailControllers = {};

  let  transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port:465,
    secure: true,
    auth:{ type: 'OAuth2',
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }
  });

emailControllers.getTemplate = (req,res,next) =>{
  Promise.all([Email.getTemplate(req.params.templateId),
              Contact.findById(req.params.contactid)])
  .then(alldata => {
    res.render('emails/new',{
      template: alldata[0],
      contact: alldata[1],
      auth: true,
      user: req.user
    })
  })
  .catch(err => console.log(err))
}
emailControllers.getAllTemplates = (req,res,next) =>{
  Promise.all([Email.getAllTemplates(),
              Contact.findById(req.params.contactid)])
  .then(alldata => {
    res.render('emails/index',{
      templates: alldata[0],
      contact: alldata[1],
      auth: true,
      user: req.user
    })
  })
  .catch(err => console.log(err))
}
emailControllers.sendEmails = (req,res,next) =>{
  console.log("user",req.user)


  let mailOptions = {
        from: req.user.email,
        to: req.body.to, // list of receivers
        subject: req.body.subject, // Subject line
        text: req.body.text, // plain text body
        html: `<b>${req.body.text}</b>`, // html body
        auth: {
          username: req.user.email,
          accessToken: req.user.accesstoken,
          refreshToken: req.user.refreshtoken
        // expires: 99999999999
    }
  };

  transporter.sendMail(mailOptions, (error, response) => {
        if (error) {
            console.log(transporter)
            console.log(error);
            console.log(response)
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
