import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import "./corporateImageCoverPage.css";

const CorporateImageCoverPage = forwardRef(
  ({ resultsSummary, companySummary, isGeneratingPdf }, ref) => {
    const [companyName, setCompanyName] = useState("");
    const [authorInfo, setAuthorInfo] = useState("유니코서치 대리 김가연");

    const localRef = useRef();

    useImperativeHandle(ref, () => ({
      getContent: () => localRef.current,
    }));

    return (
      <div
        ref={localRef}
        className={`image-recommend-result_report-cover-page-content ${
          isGeneratingPdf ? "pdf-mode" : ""
        }`}
      >
        <div className="image-recommend-result_report-summary">
          하이어리즘 / {companyName} 추천 결과
        </div>
        <h3>기업 이미지 기반 후보자 추천 결과</h3>

        <div className="image-recommend-result_report-author-input">
          {authorInfo}
        </div>

        <div className="image-recommend-result_recommand-result-summary">
          <h4>{resultsSummary.keywords}</h4>
          <table className="image-recommend-result_report-candidate-table">
            <thead>
              <tr>
                <th>순위</th>
                <th>기본 인적사항</th>
                <th>점수</th>
              </tr>
            </thead>
            <tbody>
              {resultsSummary.candidates.map((c) => (
                <tr key={c.rank}>
                  <td>{c.rank}</td>
                  <td>{c.info}</td>
                  <td>{c.score}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <table className="image-recommend-result_report-candidate-table">
            <thead>
              <tr>
                <th>순위</th>
                <th>기업 이미지</th>
                <th>점수</th>
              </tr>
            </thead>
            <tbody>
              {companySummary.map((c) => (
                <tr key={c.rank}>
                  <td>{c.rank}</td>
                  <td>{c.subject}</td>
                  <td>{c.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p>자세한 후보자 이력서는 뒷장에 첨부.</p>
      </div>
    );
  }
);

export default CorporateImageCoverPage;
