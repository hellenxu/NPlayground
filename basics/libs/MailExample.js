const mailer = require('nodemailer');

const transporter = mailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'xxx@gmail.com',
    pass: 'yyy'
  }
});

const mailOptions = {
  from: 'xxx@gmail.com',
  to: 'yyy9102@gmail.com',
  subject: 'Email Test',
  text: 'Test for sure.'
};

// this example doesn't work for second factor login
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(`xxl-error: ${error}`);
  } else {
    console.log(`xxl-result: ${info.response}`);
  }
});