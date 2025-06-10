import { useState } from "react";
import { useLocation } from "react-router-dom";
import FileLogo from "../../Image/Icon/FileLogo.svg";
import MemberNavigation from "../../Component/Navigation/MemberNavigation";
import "./corporateImageResult.css";
import ArrowIcon from "../../Image/Icon/ArrowIcon.svg";
import RecommandReport from "../../Component/RecommandComponent/CorporateImageReport";
import { motion, AnimatePresence } from "framer-motion";
import dummyCandidates from "../../data/dummyCandidate";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

const CorporateImageResult = () => {
  const location = useLocation();

  const categoryMapping = {
    Teamculture: "조직문화",
    Evaluation: "공정한 평가, 성장지원",
    "Pay Level": "보상수준",
    "Vision & Direction": "비전 및 방향성",
    "Welfare Quality": "복지",
    Workload: "워라밸",
  };

  const companyDummydata = [
    { rank: "1", subject: "복지", score: 4.18 },
    { rank: "2", subject: "워라밸", score: 3.47 },
    { rank: "3", subject: "조직문화", score: 3.23 },
    { rank: "4", subject: "공정한 평가, 성장지원", score: 2.5 },
    { rank: "5", subject: "보상수준", score: 2.49 },
    { rank: "6", subject: "비전 및 방향성", score: 2.31 },
  ];

  const { data } = location.state || {};
  const companyName = location.state?.companyName || "ooo";
  const companyData = data?.keywordArray || companyDummydata;

  const mappedCompanyData = companyData.map((item) => ({
    ...item,
    category: categoryMapping[item.category] || item.subject,
  }));

  const topTwoKeywords = mappedCompanyData
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);

  const [showReport, setShowReport] = useState(false);

  const resultsSummary = [
    {
      title: "마케팅 팀장 직무 추천 결과",
      author: "유니코서치 대리 김가연",
      keywords: "[ 복지 ] [ 워라밸 ]",
      candidates: [
        { rank: 1, info: "김철수 (29), 남", score: "5.0" },
        { rank: 2, info: "김민지 (27), 여", score: "4.9" },
        { rank: 3, info: "박희망 (30), 남", score: "4.0" },
        { rank: 4, info: "박찬희 (30), 남", score: "3.9" },
        { rank: 5, info: "최민서 (30), 여", score: "3.5" },
      ],
    },
  ];

  return (
    <div className="image-recommend-result_wrapper">
      <MemberNavigation />

      <AnimatePresence mode="wait">
        {!showReport ? (
          <motion.div
            key="firstPage"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            <header>
              <div className="image-recommend-result_page-index-wrapper">
                <img src={FileLogo} alt="파일 아이콘" />
                <h2>
                  [ {companyName} ] 기업 이미지 점수 / 점수 기반 후보자 추천
                </h2>
              </div>
            </header>

            <div className="image-recommend-result_first-page">
              <main>
                <h3 className="image-recommend-result_graph-header">
                  이미지 카테고리별 점수
                </h3>
                <div className="result-graph-and-keyword">
                  <div className="image-recommend-result_graph">
                    <RadarChart
                      cx={200}
                      cy={150}
                      outerRadius={120}
                      width={450}
                      height={300}
                      data={mappedCompanyData}
                    >
                      <PolarGrid />
                      <PolarAngleAxis
                        dataKey="category"
                        tick={{ fill: "#1e1e1e", fontSize: 16 }}
                        tickMargin={100}
                      />
                      <PolarRadiusAxis
                        domain={[0, 5]}
                        tick={{ fontSize: 0 }}
                        axisLine={false}
                        tickCount={6}
                      />
                      <Radar
                        name="점수"
                        dataKey="score"
                        stroke="#008A34"
                        fill="#008A34"
                        fillOpacity={0.5}
                      />
                    </RadarChart>

                    <div className="image-recommend-result_top2">
                      <div className="keyword-result-title">
                        [{companyName} 기업] 이미지 키워드 Top 2를 뽑았어요 !
                      </div>

                      <div className="image-recommend-result_keyword">
                        {topTwoKeywords.map((item, idx) => (
                          <div className="keyword-detail" key={idx}>
                            <span className="keyword">{item.category}</span>
                            <p>{item.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="image-recommend-result_review">
                  <h3 className="image-recommend-result_graph-header">
                    실제 {companyName} 기업 직원 반응
                  </h3>

                  <ul className="review-list">
                    {topTwoKeywords.flatMap((item) =>
                      item.comments.map((comment, i) => (
                        <li key={`${item.category}-${i}`}>
                          <span className="keyword">{item.category}</span>
                          <p>“{comment}”</p>
                        </li>
                      ))
                    )}
                  </ul>
                </div>

                <div className="image-recommend-result_score-header">
                  <h3>추천된 후보자 전체 점수표</h3>
                  <div className="score-legend">
                    <div>
                      <span className="high-score"></span>
                      <span className="middle-score"></span>
                      <span className="low-score"></span>
                    </div>
                    <p>점수 (높음-보통-낮음) 순</p>
                  </div>
                </div>

                <div className="company-result-summary-tables">
                  <table className="image-recommend-result_score-table">
                    <tbody>
                      {resultsSummary[0].candidates.map((item, idx) => {
                        const numericScore = parseFloat(item.score); // 예: "4.7" → 4.7
                        let levelClass = "";

                        if (numericScore >= 4.0) {
                          levelClass = "high-score";
                        } else if (numericScore >= 2.5) {
                          levelClass = "middle-score";
                        } else {
                          levelClass = "low-score";
                        }

                        return (
                          <tr key={idx}>
                            <td>{item.rank}</td>
                            <td>{item.info}</td>
                            <td>{item.score} 점</td>
                            <td>
                              <span className={levelClass}></span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <button
                  className="image-recommend-result_job-seeker-button"
                  onClick={() => setShowReport(true)}
                >
                  <img src={ArrowIcon} alt="➜" />
                  <span>추천 결과 보고서 열람</span>
                </button>
              </main>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="reportPage"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.4 }}
          >
            <RecommandReport
              onBack={() => setShowReport(false)}
              companySummary={companyDummydata}
              resultsSummary={resultsSummary}
              candidates={dummyCandidates}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CorporateImageResult;
