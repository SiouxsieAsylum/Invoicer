const Email = require('../models/Email');
const emailController = {};

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
emailControllers.sendEmail = (req,res,next) =>{
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
  .catch(next)
}

module.exports = emailControllers;
