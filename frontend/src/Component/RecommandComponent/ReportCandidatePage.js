import React, { forwardRef, useImperativeHandle, useRef } from "react";
import "./reportCandidatePage.css";
import CandidatePersonalData from "./CandidatePersonalData";

const ReportCandidatePage = forwardRef(
  ({ candidate, isGeneratingPdf }, ref) => {
    const localRef = useRef();

    useImperativeHandle(ref, () => ({
      getContent: () => localRef.current,
    }));

    if (!candidate) {
      return (
        <div ref={localRef} className="report-candidate-page">
          <p>후보자 정보가 없습니다.</p>
        </div>
      );
    }
    const resume = candidate.resume || {};

    return (
      <div
        ref={localRef}
        className={`report-candidate-page ${isGeneratingPdf ? "pdf-mode" : ""}`}
      >
        <div className="image-recommend-result_report-summary">
          {candidate.name} 후보자
        </div>
        <CandidatePersonalData candidate={candidate} />
      </div>
    );
  }
);

export default ReportCandidatePage;
