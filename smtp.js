const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

const sendEmail = async(to, title, text, cb) => {
  const option = {
    from: `"CanIFeed Team" <${process.env.NODEMAILER_USER}>`,
    to,
    subject: title,
    text
  }
  try{
    await transporter.sendMail(option);
    cb();
  }catch(err){
    cb(err);
  }
};

module.exports = { sendEmail };

