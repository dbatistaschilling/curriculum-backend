const validationResult = require('../utils/validation-result');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


exports.clientEmail = (req, res, next) => {
    validationResult(req);
    sgMail.send({
        to: 'dbatistaschilling@gmail.com',
        from: 'dbatistaschilling@gmail.com',
        subject: req.body.subject,
        text: `${req.body.firstName} ${req.body.lastName}`,
        html: `<strong>${req.body.email}</strong>
                <p>${req.body.message}</p>
                <spam>Message from front end</spam>`,
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
    });
    res.status(200).json({ message: 'Email successfully sent!' });
}