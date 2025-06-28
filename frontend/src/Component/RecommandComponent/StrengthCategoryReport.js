import React, { useState, useEffect, useRef } from "react";
import StrengthCoverPage from "./StrengthCoverPage";
import ReportCandidatePage from "./ReportCandidatePage";
import DownloadIcon from "../../Image/Icon/DownloadIcon.svg";
import LeftArrow from "../../Image/Icon/LeftArrow.svg";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./strengthCategoryReport.css";
import PageWrapper from "./PageWrapper";
import { createRoot } from "react-dom/client";

const StrengthCategoryReport = ({ onBack, resultsSummary, candidates }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const contentRef = useRef([]);
  const totalPages = 1 + candidates.length;

  useEffect(() => {
    contentRef.current.length = 0; // 렌더링 전에 비워줌
  }, [candidates.length]);

  // 화면에 보여주는 현재 페이지 하나만 렌더링
  const renderPreviewPage = () => {
    if (currentPage === 1) {
      return (
        <PageWrapper>
          <StrengthCoverPage
            ref={(el) => (contentRef.current[0] = el)}
            summary={resultsSummary[0]}
            isGeneratingPdf={false}
          />
        </PageWrapper>
      );
    }

    const candidateIndex = currentPage - 2;
    const candidate = candidates[candidateIndex];

    return (
      <PageWrapper>
        <ReportCandidatePage
          ref={(el) => (contentRef.current[currentPage - 1] = el)}
          candidate={candidate}
          isGeneratingPdf={false}
        />
      </PageWrapper>
    );
  };

  // PDF 다운로드용 전체 페이지 렌더링
  const renderAllPages = () => {
    return (
      <>
        <PageWrapper>
          <StrengthCoverPage
            ref={(el) => (contentRef.current[0] = el)}
            summary={resultsSummary[0]}
            isGeneratingPdf={true}
          />
        </PageWrapper>

        {candidates.map((candidate, index) => (
          <PageWrapper key={index}>
            <ReportCandidatePage
              ref={(el) => (contentRef.current[index + 1] = el)}
              candidate={candidate}
              isGeneratingPdf={true}
            />
          </PageWrapper>
        ))}
      </>
    );
  };

  // PDF로 저장
  const handleDownloadPDF = async () => {
    setIsGeneratingPdf(true);

    // invisible container에 전체 페이지 렌더링
    const hiddenContainer = document.createElement("div");
    hiddenContainer.style.position = "absolute";
    hiddenContainer.style.top = "-9999px";
    hiddenContainer.style.left = "-9999px";
    document.body.appendChild(hiddenContainer);

    // 강제로 렌더링된 전체 페이지 삽입
    const allPages = renderAllPages();
    const tempRoot = document.createElement("div");
    hiddenContainer.appendChild(tempRoot);

    const root = createRoot(tempRoot);
    root.render(allPages);

    await new Promise((resolve) => setTimeout(resolve, 500)); // 렌더링 시간 기다림

    const pdf = new jsPDF("p", "pt", "a4");

    for (let i = 0; i < contentRef.current.length; i++) {
      const element = contentRef.current[i]?.getContent?.();
      if (!element) continue;

      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL("image/png");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      if (i > 0) pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    }

    const companyName = resultsSummary[0]?.company || "기업";
    pdf.save(`하이어리즘_${companyName}_강점기반추천결과.pdf`);

    // 클린업
    document.body.removeChild(hiddenContainer);
    setIsGeneratingPdf(false);
  };

  return (
    <div className="image-recommend-result_second-page">
      <header>
        <div className="image-recommend-result_page-index-wrapper">
          <img src={DownloadIcon} alt="-" />
          <h2>추천 결과 기반 보고서</h2>
        </div>
      </header>

      <main>
        {/* PDF 다운로드 버튼 */}
        <button
          className="image-recommend-result_download-button"
          onClick={handleDownloadPDF}
        >
          <img src={DownloadIcon} alt="다운로드" />
          <span>다운로드 (pdf 형식)</span>
        </button>

        {/* 현재 보고 있는 한 페이지 */}
        <div>{renderPreviewPage()}</div>

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

        {/* 뒤로가기 버튼 */}
        <button className="report-back-button" onClick={onBack}>
          <img src={LeftArrow} alt="뒤로가기" />
          <span>기업 이미지 점수 화면</span>
        </button>
      </main>
    </div>
  );
};

export default StrengthCategoryReport;
