import React, { useState, useEffect } from "react";
import "./resume.css";
import FileLogo from "../../Image/Icon/FileLogo.svg";
import NotMemberNavigation from "../../Component/Navigation/NotMemberNavigation";
import PersonalData from "../../Component/NonMemberComponent/PersonalData";
import Education from "../../Component/NonMemberComponent/Education";
import Experience from "../../Component/NonMemberComponent/Career";
import License from "../../Component/NonMemberComponent/License";
import Skills from "../../Component/NonMemberComponent/Skills";
import Other from "../../Component/NonMemberComponent/Other";
import TestResult from "../../Component/NonMemberComponent/TestResult";
import CompanyTest from "../../Component/NonMemberComponent/CompanyTest";
import { AnimatePresence, motion } from "framer-motion";



const Resume = ({ resumeData, dispatch }) => {
  const [showCompanyTest, setShowCompanyTest] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [testScores, setTestScores] = useState(null);
  const [author, setAuthor] = useState("");

  const BACK_URL = process.env.REACT_APP_BACKEND_ADDRESS;

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleStartTest = () => {
    window.scrollTo(0, 0);
    setShowCompanyTest(true);
  };

  const handleBackToResume = (scores) => {
    if (scores) {
      dispatch({ type: "SET_COMPANYTEST", payload: scores });
    }
    setShowCompanyTest(false);
  };

  const handleSubmitResume = async () => {
    const {
      personalData,
      education,
      career,
      certificates,
      skills,
      otherinfo,
      companyTest,
    } = resumeData;

    const {
      name,
      birth_date,
      gender,
      address,
      phone,
      current_salary,
      desired_salary,
    } = personalData;

    // 필수 항목 검증
    if (
      !name ||
      !birth_date ||
      !gender ||
      !address ||
      !phone ||
      !current_salary ||
      !desired_salary
    ) {
      alert("인적사항의 모든 필수 항목을 입력해주세요.");
      return;
    }

    if (!author.trim()) {
      alert("작성자를 입력해주세요.");
      return;
    }

    // 최종 서버 전송 데이터
    const finalResumeData = {
      name,
      birth_date,
      gender,
      address,
      phone,
      current_salary,
      desired_salary,
      education: JSON.stringify(education),
      career: JSON.stringify(career),
      certificates: JSON.stringify(certificates),
      skills: JSON.stringify(skills),
      otherinfo: JSON.stringify(otherinfo),
      companyTest,
    };

    try {
      const response = await fetch(`${BACK_URL}/resume/upload`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalResumeData),
      });

      if (response.ok) {
        const result = await response.json();
        const resumeId = result.resume_id;
        const keywordResponse = await fetch(
          `${BACK_URL}/resume/${resumeId}/keyword`,
          { method: "POST" }
        );
        if (keywordResponse.ok) {
          const keywordResult = await keywordResponse.json();
          console.log("추출된 키워드:", keywordResult.keywords);
        }
        alert("이력서가 성공적으로 제출되었습니다!");
      } else {
        alert("제출 실패: 서버 오류");
      }
    } catch (error) {
      console.error("제출 중 오류:", error);
      alert("제출 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="resume-container">
      <NotMemberNavigation />

      <AnimatePresence mode="wait">
        {showCompanyTest ? (
          <motion.div
            key="company-test"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.4 }}
          >
            <CompanyTest onBackToResume={handleBackToResume} />
          </motion.div>
        ) : (
          <motion.div
            key="resume"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            <div>
              <header>
                <div className="image-recommend_page-index-wrapper">
                  <img src={FileLogo} alt="-" />
                  <h2>이력서 등록</h2>
                </div>
                <p>
                  ' <strong>*</strong> ' 표시되어있는 항목은 필수 항목입니다!
                  필수가 아닌 항목도 자세히 작성할수록 기업과 매칭 확률이
                  올라갑니다!
                </p>
                <p>
                  <strong>입력하신 내용은 자동 저장 됩니다.</strong> 따라서 같은
                  기기로 접속하실경우, 입력 내용이 그대로 유지됩니다.
                </p>
              </header>

              <main className="resume-main">
                <label className="resume-title-label">인적사항</label>
                <PersonalData
                  initialData={resumeData.personalData}
                  onChange={(data) =>
                    dispatch({ type: "SET_PERSONAL", payload: data })
                  }
                />

                <label className="resume-title-label">학력</label>
                <Education
                  initialData={resumeData.education}
                  onChange={(data) =>
                    dispatch({ type: "SET_EDUCATION", payload: data })
                  }
                />

                <div className="experience-label">
                  <label className="resume-title-label">경력</label>
                  <p>
                    직무명, 직무내용은 자세히 입력할수록 매칭 확률이 올라갑니다!
                  </p>
                </div>
                <Experience
                  initialData={resumeData.career}
                  onChange={(data) =>
                    dispatch({ type: "SET_CAREER", payload: data })
                  }
                />

                <label className="resume-title-label">자격증</label>
                <License
                  initialData={resumeData.certificates}
                  onChange={(data) =>
                    dispatch({ type: "SET_CERTIFICATES", payload: data })
                  }
                />

                <div className="skills-label">
                  <label className="resume-title-label">SKILLS</label>
                  <p>Language / Web FE & BE / DB / DevOps & Cloud / Tool</p>
                </div>
                <Skills
                  initialData={resumeData.skills}
                  onChange={(data) =>
                    dispatch({ type: "SET_SKILLS", payload: data })
                  }
                />
                <div className="others-label">
                  <label className="resume-title-label">기타</label>
                  <p>병역사항, 건강상태 등을 자유롭게 작성해주세요!</p>
                </div>

                <Other
                  initialData={resumeData.otherinfo}
                  onChange={(data) =>
                    dispatch({ type: "SET_OTHERINFO", payload: data })
                  }
                />

                <div className="test-result-label">
                  <label className="resume-title-label">맞춤기업 TEST</label>
                  <p>나와 잘 맞는 기업과 매칭될 확률을 높여보세요!</p>
                </div>
                <TestResult
                  onStartTest={handleStartTest}
                  scores={
                    typeof resumeData.companyTest === "string"
                      ? JSON.parse(resumeData.companyTest)
                      : resumeData.companyTest
                  }
                  onChange={(data) =>
                    dispatch({
                      type: "SET_COMPANYTEST",
                      payload: data.companyTest,
                    })
                  }
                />

                <div className="resume-signature-section">
                  <p>본 지원서의 내용은 사실이며 본인이 작성하였습니다.</p>
                  <div className="signature-author">
                    <label>
                      작성자<strong>*</strong>:
                    </label>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="작성자명 입력"
                    />
                  </div>

                  <div className="signature-buttons">
                    <button onClick={handleSubmitResume}>제출</button>
                    <button>취소</button>
                  </div>
                </div>
              </main>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Resume;
