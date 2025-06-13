import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import "./strengthCoverPage.css";

const StrengthCoverPage = forwardRef(({ summary, isGeneratingPdf }, ref) => {
  const [companyName, setCompanyName] = useState("oo 기업");
  const [authorInfo, setAuthorInfo] = useState("하이어리즘 대표 김가연");

  const localRef = useRef();

  useImperativeHandle(ref, () => ({
    getContent: () => localRef.current,
  }));

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
      <h3>강점 키워드 기반 후보자 추천 결과</h3>

      <div className="strength-category-result_report-author-input">
        {authorInfo}
      </div>

      <div className="strength-category-result_recommand-result-summary">
        <h4>
          [ DevOps 엔지니어 ] [ Node.js ] [ CI/CD 파이프라인 ] 강점 키워드
        </h4>
        <table className="strength-category-result_report-candidate-table">
          <thead>
            <tr>
              <th>순위</th>
              <th>기본 인적사항</th>
              <th>점수</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>감도현 (29), 남</td>
              <td>4.8 / 5.0</td>
            </tr>
            <tr>
              <td>2</td>
              <td>이서준 (27), 남</td>
              <td>4.5 / 5.0</td>
            </tr>
            <tr>
              <td>3</td>
              <td>김예진 (30), 여</td>
              <td>4.3 / 5.0</td>
            </tr>
            <tr>
              <td>4</td>
              <td>정하늘 (28), 여</td>
              <td>4.0 / 5.0</td>
            </tr>
            <tr>
              <td>5</td>
              <td>박세민 (30), 여</td>
              <td>3.8 / 5.0</td>
            </tr>
            <tr>
              <td>6</td>
              <td>최지우 (25), 여</td>
              <td>3.5 / 5.0</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>자세한 후보자 이력서는 뒷장에 첨부.</p>
    </div>
  );
});

export default StrengthCoverPage;
