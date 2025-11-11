import { Request, Response } from "express";
import CompanyKeyword, {
  CompanyKeywordDocument,
} from "../models/CompanyKeyword";

// AI 의존도 검사
export const AIKiller = async (
  req: Request<{ companyName: string }>,
  res: Response
): Promise<void> => {
  try {
  } catch (error) {
    console.error("기업 키워드 조회 오류:", error);
  }
};

// 기업 적합도 검사
export const companyFit = async (
  req: Request<{ companyName: string }>,
  res: Response
): Promise<void> => {
  try {
  } catch (error) {
    console.error("기업 키워드 조회 오류:", error);
  }
};

// GPT 요약
export const AIAnalyze = async (
  req: Request<{ companyName: string }>,
  res: Response
): Promise<void> => {
  try {
  } catch (error) {
    console.error("기업 키워드 조회 오류:", error);
  }
};
