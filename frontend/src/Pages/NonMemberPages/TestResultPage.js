import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NonMemberNavigation from "../../Component/Navigation/NotMemberNavigation";
import "./TestResultPage.css";

const AIAnalysisResult = () => {
  const location = useLocation();
  const BACK_URL = process.env.REACT_APP_BACKEND_ADDRESS;

  const [isLoading, setIsLoading] = useState(false);

  const data = {
    companyName: "코멘토",
    essay:
      "저의 가장 큰 강점은 새로운 기술을 빠르게 배우고 실무에 적용하는 적응력입니다...",
    aiScore: 11,
    companyFit: 85,
    keywords: ["도전정신", "문제해결능력", "React.js"],
    summary:
      "지원자의 자기소개서는 코멘토의 인재상과 높은 수준으로 부합하며, 핵심 키워드와 경험이 잘 어우러져 있음.",
  };

  // 로딩 상태 테스트용
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="image-recommend-result_wrapper">
      {isLoading ? (
        <div className="loading-wrapper">
          <div className="loading-spinner"></div>
          <span className="loading-text">결과를 불러오는 중입니다...</span>
        </div>
      ) : (
        <div>
          <NonMemberNavigation />

          {/* 본문 */}
          <div className="result-card">
            <h2 className="title">AI 분석 결과</h2>

            {/* 기업명 */}
            <div className="info-row">
              <span className="label">기업명</span>
              <span className="value company">{data.companyName}</span>
            </div>

            {/* 자소서 내용 */}
            <div className="info-row">
              <span className="label">자소서 내용</span>
              <div className="essay-box">{data.essay}</div>
            </div>

            {/* AI 의존도 & 기업 적합도 */}
            <div className="score-container">
              <div className="score-box ai-score">
                <p className="score-label">AI 의존도</p>
                <p className="score-value">{data.aiScore}%</p>
              </div>
              <div className="score-box fit-score">
                <p className="score-label">기업 적합도</p>
                <p className="score-value">{data.companyFit}%</p>
              </div>
            </div>

            {/* 핵심 키워드 */}
            <div className="info-row">
              <span className="label">핵심 키워드</span>
              <div className="keywords">
                {data.keywords.map((keyword, i) => (
                  <span key={i} className="keyword-tag">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            {/* 분석 요약 */}
            <div className="info-row">
              <span className="label">분석 요약</span>
              <div className="summary-box">{data.summary}</div>
            </div>

            {/* 버튼 */}
            <div className="button-group">
              <button
                className="save-btn"
                onClick={() => alert("준비 중입니다.")}
              >
                결과 저장
              </button>
              <button
                className="rewrite-btn"
                onClick={() => alert("준비 중입니다.")}
              >
                다시 작성
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAnalysisResult;
