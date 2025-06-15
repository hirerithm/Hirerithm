import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import "./strengthCoverPage.css";

const StrengthCoverPage = forwardRef(({ summary, isGeneratingPdf }, ref) => {
  //const [companyName, setCompanyName] = useState("oo 기업");
  const [authorInfo, setAuthorInfo] = useState("하이어리즘 대표 김가연");

  const localRef = useRef();

  useImperativeHandle(ref, () => ({
    getContent: () => localRef.current,
  }));

  const { keywords = "", candidates = [] } = summary || {};

  return (
    <div
      ref={localRef}
      className={`strength-category-result_report-cover-page-content ${
        isGeneratingPdf ? "pdf-mode" : ""
      }`}
    >
      <div className="strength-category-result_report-summary">
        하이어리즘 / 추천 결과
      </div>
      <h3>강점 기반 후보자 추천 결과</h3>

      <div className="strength-category-result_report-author-input">
        {authorInfo}
      </div>

      <div className="strength-category-result_recommand-result-summary">
        <h4>{keywords || "강점 키워드"}</h4>
        <table className="strength-category-result_report-candidate-table">
          <thead>
            <tr>
              <th>순위</th>
              <th>기본 인적사항</th>
              <th>점수</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate.rank}>
                <td>{candidate.rank}</td>
                <td>{candidate.info}</td>
                <td>{candidate.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>자세한 후보자 이력서는 뒷장에 첨부.</p>
    </div>
  );
});

export default StrengthCoverPage;
