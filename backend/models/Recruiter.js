const mongoose = require("mongoose");

const recruiterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "올바른 이메일 형식이 아닙니다.",
    ],
  },
  password_hash: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    match: [/^\d{3}-?\d{4}-?\d{4}$/, "올바른 전화번호 형식이 아닙니다."],
  },
  role: {
    type: String,
    enum: ["headhunter", "company"],
    required: true,
  },
  company_name: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Recruiter = mongoose.model("Recruiter", recruiterSchema);

module.exports = Recruiter;
