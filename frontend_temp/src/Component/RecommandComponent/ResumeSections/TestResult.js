import React from "react";
import "../candidatePage.css";

const TestResult = ({ candidate }) => {
  const testResults = candidate.test;

  if (!Array.isArray(testResults) || testResults.length === 0) return null;

  const result = testResults[0]; // 첫 번째 테스트 결과만 사용

  const labelMap = {
    TeamCulture: "팀 문화",
    Evaluation: "평가 체계",
    PayLevel: "급여 수준",
    VisionDirection: "비전 및 방향성",
    Welfare: "복지",
    Workload: "업무 강도",
  };

  return (
    <div className="image-recommend-result_item-container">
      <div className="image-recommend-result_item">
        <label>맞춤기업 TEST 결과</label>
        <ul className="image-recommend-license-list">
          {Object.entries(result).map(([key, value], index) => (
            <li key={index}>
              <strong>{labelMap[key] || key}</strong>: {value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TestResult;
