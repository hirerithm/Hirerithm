const express = require("express");
const router = express.Router();
const Company = require("../models/CompanyKeyword");
const companyController = require("../controllers/companyController");

// 기업 키워드 조회 엔드포인트
router.get("/:companyName/keyword", companyController.getCompanyKeywords);

// 기업 자동 완성 엔드포인트
router.get("/autosearch", companyController.getCompanyAutoSearch);

module.exports = router;
