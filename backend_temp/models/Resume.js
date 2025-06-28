const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  resume_id: {
    // 고유 아이디
    type: String,
    required: true,
    unique: true,
  },
  name: {
    // 구직자 이름
    type: String,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  keyword: {
    type: [String],
    default: [],
  },
  birth_date: {
    type: Date,
    required: true,
  },
  age: {
    // 만 나이
    type: Number,
    //required: true,
  },
  gender: {
    type: String,
    enum: ["남성", "여성"],
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  current_salary: {
    type: Number,
  },
  desired_salary: {
    type: Number,
  },
  wishlist: {
    type: [String],
    default: [],
  },
  createdAt: { type: Date, required: true },
});

// birth_date로 나이 계산하는 함수 추가
resumeSchema.pre("save", function (next) {
  if (this.birth_date) {
    const birthDate = new Date(this.birth_date);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    const monthDiff = new Date().getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && new Date().getDate() < birthDate.getDate())
    ) {
      this.age = age - 1;
    } else {
      this.age = age;
    }
  }
  next();
});

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;
