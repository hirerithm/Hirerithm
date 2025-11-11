import express from "express";
import {
  AIKiller,
  companyFit,
  AIAnalyze,
} from "../controllers/selfintroController";
const router = express.Router();

// AI 의존도 검사
router.post("/aikiller", AIKiller);

// 기업 적합도 검사
router.post("/autosearch", companyFit);

// GPT 요약
router.post("/aianal", AIAnalyze);

export default router;
