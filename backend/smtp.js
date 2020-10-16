const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

const sendMail = async(option, cb) => {
  try{
    await transporter.sendMail(option);
    cb();
  }catch(err){
    cb(err);
  }
};

module.exports = { sendMail };

