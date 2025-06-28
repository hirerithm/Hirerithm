import React, { forwardRef, useImperativeHandle, useRef } from "react";
import "./candidatePage.css";
import AcademicAbility from "./ResumeSections/AcademicAbility";
import Experience from "./ResumeSections/Experience";
import License from "./ResumeSections/License";
import Other from "./ResumeSections/Other";
import PersonalData from "./ResumeSections/PersonalData";
import Skiils from "./ResumeSections/Skills";
import TestResult from "./ResumeSections/TestResult";

const CandidatePersonalData = ({ candidate }) => {
  console.log(candidate);
  return (
    <div>
      <PersonalData candidate={candidate} />

      <AcademicAbility candidate={candidate} />

      <Experience candidate={candidate} />

      <License candidate={candidate} />

      <Skiils candidate={candidate} />

      <Other candidate={candidate} />

      <TestResult candidate={candidate} />
    </div>
  );
};

export default CandidatePersonalData;
