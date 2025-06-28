const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  resume_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resume",
    required: true,
  },
  //start_year: { type: Number, required: true },
  //end_year: { type: Number, required: true },
  school_name: { type: String },
  major: { type: String },
  degree: {
    type: String,
    enum: [
      "대학교(4년 이상)",
      "대학원(석사)",
      "대학원(박사)",
      "대학교(2,3년)",
      "고등학교",
      "중학교",
      "초등학교",
      "",
    ],
    default: "",
  },
  graduation_status: {
    type: String,
    enum: ["졸업", "재학", "수료", "중퇴", "휴학"],
  },
  exam_passed: { type: Boolean, default: false },
});

module.exports = mongoose.model("Education", educationSchema);
