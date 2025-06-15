const express = require("express");
const router = express.Router();
const recommendationController = require("../controllers/recommendationController");

// 인재 강점 기반 후보차 추천 엔드포인트
router.post("/candidate", recommendationController.StrengthRecommendCandidate);

// 기업 이미지 후보차 추천 엔드포인트
router.get(
  "/candidate/:companyName",
  recommendationController.KeywordRecommendCandidate
);

module.exports = router;
