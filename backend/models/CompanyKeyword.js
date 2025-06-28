const mongoose = require("mongoose");

const companyKeywordSchema = new mongoose.Schema({
  company_name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Teamculture", // 조직 분위기, 수평/수직 구조, 팀워크, 소통, 배려 등
      "Evaluation", // 성과 평가의 공정성, 피드백, 성장 기회, 경력 개발 등
      "Pay Level", // 연봉 수준, 보상 체계, 인센티브의 만족도 등
      "Vision & Direction", // 경영진의 비전, 방향성, 전략의 명확성, 회사의 장기적 방향
      "Welfare Quality", // 복지 혜택, 사내제도, 근무환경, 휴가 정책 등
      "Workload", // 업무량, 야근 빈도, 휴식 보장, 워라밸 수준 등
    ],
  },
  description: {
    type: String,
    default: "",
  },
  score: {
    type: Number,
    min: 1,
    max: 5,
    default: 0,
  },
  count: {
    type: Number,
    default: 0,
  },
  comments: {
    type: [String],
    default: [],
  },
});

const CompanyKeyword = mongoose.model("CompanyKeyword", companyKeywordSchema);

module.exports = CompanyKeyword;
