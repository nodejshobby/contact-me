const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
})

sendMail = async (subject, name, sender, message) => {
  let options = {
    from: `"${name}" <${sender}>`,
    to: process.env.MY_MAIL,
    subject: subject,
    text: message,
  }

  let info = await transporter.sendMail(options)
  return info
}

module.exports = sendMail
