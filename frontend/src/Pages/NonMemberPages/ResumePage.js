import React, { useReducer, useEffect } from "react";
import Resume from "./Resume";
import {
  resumeReducer,
  initialResumeState,
} from "../../reducers/resumeReducer";

const ResumePage = () => {
  const [resumeState, dispatch] = useReducer(
    resumeReducer,
    initialResumeState,
    () => {
      const saved = localStorage.getItem("resumeData");
      return saved
        ? { ...initialResumeState, ...JSON.parse(saved) }
        : initialResumeState;
    }
  );

  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(resumeState));
  }, [resumeState]);

  return <Resume resumeData={resumeState} dispatch={dispatch} />;
};

export default ResumePage;
