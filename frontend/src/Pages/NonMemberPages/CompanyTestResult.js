// localhost:3000/nonmember/companytest/result

import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
//import axios from "axios";
import FileLogo from "../../Image/Icon/FileLogo.svg";
import DownloadIcon from "../../Image/Icon/download.svg";
import NonMemberNavigation from "../../Component/Navigation/NotMemberNavigation";
import "./CompanyTestResult.css";

const CompanyTestResult = () => {
  //const navigate = useNavigate();
  //const address = process.env.REACT_APP_BACKEND_ADDRESS;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 2; // 고정된 페이지 수

  // 임시 컴포넌트 (별도 파일로 만들 수도 있음)
  const Cover = () => (
    <div className="pdf-page">
      <h3>표지 페이지</h3>
      <p>이곳은 Cover 페이지입니다. 결과 개요를 간단히 보여줄 수 있어요.</p>
    </div>
  );

  const Detail = () => (
    <div className="pdf-page">
      <h3>상세 결과 페이지</h3>
      <p>이곳은 Detail 페이지입니다. 결과 상세 내용을 보여줍니다.</p>
    </div>
  );

  const handleDownload = async () => {
    // TODO : pdf 다운
    alert("ㅎㅇ");
  };

  // 페이지별 렌더링
  const renderReportContent = () => {
    switch (currentPage) {
      case 1:
        return <Cover />;
      case 2:
        return <Detail />;
      default:
        return null;
    }
  };

  return (
    <div className="image-recommend_wrapper">
      <NonMemberNavigation />

      <header>
        <div className="image-recommend_page-index-wrapper">
          <img src={FileLogo} alt="-" />
          <h2>맞춤기업 TEST 결과</h2>
        </div>
        <p>
          : 결과 pdf 파일을 이력서에 포함시키면, 나와 잘 맞는 기업과 매칭될
          확률이 올라가요!
        </p>
      </header>

      <main>
        {/* 다운로드 버튼 */}
        <button
          className="test-result_download-button"
          onClick={handleDownload}
        >
          <img src={DownloadIcon} className="download-icon" alt="다운로드" />
          <span className="download-text">다운로드 (pdf 형식)</span>
        </button>

        <div className="test-result_report-content">
          <div className="test-result_report-summary">맞춤기업 TEST</div>

          <div className="pdf-preview-content">{renderReportContent()}</div>
        </div>

        {/* 페이지네이션 */}
        <div className="report-pagination-controls">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            이전
          </button>
          <span>
            {currentPage} / {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            다음
          </button>
        </div>
      </main>
    </div>
  );
};

export default CompanyTestResult;
