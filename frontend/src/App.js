import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import PersonalMain from "./Pages/MainPages/PersonalMain";
import CorporateMain from "./Pages/MainPages/CorporateMain";
import LoginPage from "./Pages/MainPages/LoginPage";
import SignupPage from "./Pages/MainPages/SignupPage";
import FindIdPage from "./Pages/MainPages/FindIdPage";
import FindPasswordPage from "./Pages/MainPages/FindPasswordPage";
import CorporateImage from "./Pages/RecommendPages/CorporateImage";
import CorporateImageResult from "./Pages/RecommendPages/CorporateImageResult";
import StrengthRecommend from "./Pages/RecommendPages/StrengthRecommend";
import StrengthResult from "./Pages/RecommendPages/StrengthResult";
import ResumePage from "./Pages/NonMemberPages/ResumePage";
import FullViewMainPage from "./Pages/FullViewPages/FullViewMainPage";
import MyPage from "./Pages/MainPages/MyPage";
import HeadhunterMain from "./Pages/MainPages/HeadhunterMain";

import TestPage from "./Pages/NonMemberPages/TestPage";
import TestResultPage from "./Pages/NonMemberPages/TestResultPage";

import "./App.css";
import react from "react";

function App() {
  const [recommendResult, setRecommendResult] = useState(null);
  

  return (
    <Router>
      <Routes>
        {/* 메인페이지 */}
        <Route path="/user" element={<PersonalMain />} />
        <Route path="/" element={<CorporateMain />} />
        <Route path="/headhunter" element={<HeadhunterMain />} />

        {/* 로그인 & 회원가입 페이지 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/find_id" element={<FindIdPage />} />
        <Route path="/find_password" element={<FindPasswordPage />} />

        {/* 추천 페이지 */}
        <Route path="/recommend_company" element={<CorporateImage />} />
        <Route
          path="/recommend_strength"
          element={
            <StrengthRecommend setRecommendResult={setRecommendResult} />
          }
        />

        {/* 추천 결과 페이지 */}
        <Route
          path="/recommend_company/result"
          element={<CorporateImageResult />}
        />
        <Route
          path="/recommend_strength/result"
          element={<StrengthResult recommendResult={recommendResult} />}
        />

        {/* NonMember(구직자) 이력서 등록 페이지 */}
        <Route path="/user/resume" element={<ResumePage />} />

        {/* DB 전체 열람 페이지 */}
        <Route path="/full_view" element={<FullViewMainPage />} />

        {/* 마이페이지지 */}
        <Route path="/MyPage" element={<MyPage />} />

        {/* AI 의존도 검사 페이지 */}
        <Route path="/test" element={<TestPage />} />
        <Route path="/test_result" element={<TestResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;
