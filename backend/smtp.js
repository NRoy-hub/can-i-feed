const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  pool: true,
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

const sendMail = (option, cb) => {
  transporter.sendMail(option, (err) => cb(err));
};

module.exports = { sendMail };

