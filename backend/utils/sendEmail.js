const nodemailer = require("nodemailer");

const sendEmail = async (to, code) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"HireRithm 인증센터" <${process.env.EMAIL_USER}>`,
    to,
    subject: "[HireRithm] 이메일 인증번호",
    text: `인증번호는 [${code}] 입니다. 3분 안에 입력해주세요.`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;