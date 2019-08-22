const mailer = require('nodemailer');

const transporter = mailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'xxx@gmail.com',
    pass: 'yyy'
  }
});

const normalMailOptions = {
  from: 'xxx@gmail.com',
  to: 'yyy9102@gmail.com',
  subject: 'Email Test',
  text: 'Test for sure.'
};

const multiReceiverMailOptions = {
  from: 'xxx@gmail.com',
  to: 'yyy9102@gmail.com, ccc9102@gmail.com',
  subject: 'Test',
  text: 'Test, Test, Test...'
};

const htmlMailOptions = {
  from: 'xxx@gmail.com',
  to: 'yyy9102@gmail.com',
  subject: 'Test',
  html: '<P>hei hei</P>'
};

// this example doesn't work for second factor login
transporter.sendMail(normalMailOptions, (error, info) => {
  if (error) {
    console.log(`xxl-error: ${error}`);
  } else {
    console.log(`xxl-result: ${info.response}`);
  }
});