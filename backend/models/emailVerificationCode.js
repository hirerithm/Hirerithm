const mongoose = require("mongoose");

const emailVerificationCodeSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, "올바른 이메일 형식이 아닙니다."],
  },
  verify_code: {
    type: String,
    required: true,
  },
  expires_at: {
    type: Date,
    required: true,
  },
  is_verified: {
    type: Boolean,
    default: false,
  },
});

const EmailVerificationCode = mongoose.model(
  "EmailVerificationCode",
  emailVerificationCodeSchema
);

module.exports = EmailVerificationCode;
