const Email = require('../models/Email');
const nodemailer = require('nodemailer')
const emailControllers = {};

// there as to be a password
const transporter = nodemailer.createTransport({
    // this is the host that sends the mail
    host: 'smtp.mail.yahoo.com',
    // this is the port it operates on
    port: 587,
    secure: true,
    auth: {
        user: 'datetimetest001@yahoo.com',
        pass: 'farrah12'
    }
});

emailControllers.getTemplate = (req,res,next) =>{
  Email.getTemplate(req.params.id)
  .then(template => {
    res.json({
      message: 'template found',
      data: { template }
    })
  })
  .catch(next)
}
emailControllers.getAllTemplates = (req,res,next) =>{
  Email.getAllTemplates()
  .then(templates => {
    res.json({
      message: 'all templates found',
      data: { templates }
    })
  })
  .catch(next)
}
emailControllers.sendEmails = (req,res,next) =>{
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
        res.send('sent')

    });

}

module.exports = emailControllers;
