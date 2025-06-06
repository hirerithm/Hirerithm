const express = require("express");
const router = express.Router();
const recommendationController = require("../controllers/recommendationController");

// 후보차 추천 엔드포인트
router.post("/candidate", recommendationController.recommendCandidate);

module.exports = router;
