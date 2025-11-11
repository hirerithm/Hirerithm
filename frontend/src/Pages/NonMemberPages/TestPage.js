// localhost:3000/recommend_strength

import { useState, useEffect } from "react";
import axios from "axios";
import RecommendIcon from "../../Image/Icon/RecommendIcon.svg";
import FileLogo from "../../Image/Icon/FileLogo.svg";
import AiIcon from "../../Image/Icon/AiIcon.svg";
import NonMemberNavigation from "../../Component/Navigation/NotMemberNavigation";
import "./TestPage.css";
import { useNavigate } from "react-router-dom";
import CheckIcon from "../../Image/Icon/CheckIcon.svg";

const TestPage = ({ setRecommendResult }) => {
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");
  const [question, setQuestion] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const BACK_URL = process.env.REACT_APP_BACKEND_ADDRESS;

  const handleSubmit = async () => {
    if (!companyName.trim()) {
      alert("'기업명'을 입력해주세요!");
      return;
    }
    if (!question.trim()) {
      alert("'자소서 문항'을 입력해주세요!");
      return;
    }
    if (!content.trim()) {
      alert("'자소서 내용'을 입력해주세요!");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post(`${BACK_URL}/selfintro`, {
        companyName,
        question,
        content,
      });

      //console.log("분석 결과:", res.data);
      setRecommendResult(res.data);
      navigate("/test_result");
    } catch (error) {
      console.error("데이터 전송 에러:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="strength-category_wrapper">
      {/* 네비게이션 */}
      <NonMemberNavigation />

      <header>
        {/* 페이지 인덱스 */}
        <div className="strength-category_page-index-wrapper">
          <img src={FileLogo} alt="-" />
          <h2>AI 기반 자기소개서 의존도 검사</h2>
        </div>

        {/* 페이지 소개글 */}
        <p>
          AI 기반 자기소개서 의존도 검사는 AI가 생성한 자기소개서의 의존도를
          분석하여, 구직자가 AI에 얼마나 의존하고 있는지를 평가합니다.
        </p>
      </header>

      <main>
        {/* 추천페이지 아이콘 */}
        <img
          src={RecommendIcon}
          className="recommend-icon"
          alt="강점 기반 후보자 추천"
        />

        {/* 입력창 */}
        <div className="selfintro_form-wrapper">
          <li>
            <label>기업명</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="예 : 코멘토"
            />
          </li>
          <li>
            <label>자소서 문항</label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="예 : 본인의 강점과 약점을 서술하세요."
            />
          </li>
          <li>
            <label>자소서 내용</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="자기소개서를 입력하세요"
              rows="7"
            ></textarea>
            <div className="char-counter">글자수 : {content.length}자</div>
          </li>
        </div>

        <div className="selfintro_button-group">
          <button
            type="button"
            className="temp-save-btn"
            onClick={() => alert("준비 중입니다.")}
          >
            임시저장
          </button>
          <button
            type="button"
            className="analyze-btn"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "분석 중..." : "제출하고 분석하기"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default TestPage;
