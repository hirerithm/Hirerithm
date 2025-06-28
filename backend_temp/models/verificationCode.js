const mongoose = require("mongoose");

const verificationCodeSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d{3}-?\d{4}-?\d{4}$/, "올바른 전화번호 형식이 아닙니다."],
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

const VerificationCode = mongoose.model("VerificationCode", verificationCodeSchema);

module.exports = VerificationCode;
