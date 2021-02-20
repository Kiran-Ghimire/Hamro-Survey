// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey("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");
const msg = {
  to: "n4scent9@gmail.com",
  from: "kiran.ghimiray098@gmail.com",
  subject: "Sending with Twilio SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};
sgMail.send(msg)
  .then(() => {
  console.log('Email sent')
})
.catch((error) => {
  console.error(error)
})