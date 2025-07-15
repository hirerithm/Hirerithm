import React, { useState, useEffect } from "react";
import ResumePlusIcon from "../../Image/Icon/ResumePlusIcon.svg";
import "./resumeComponent.css";

const Career = ({ initialData = [], onChange }) => {
  const [careerList, setCareerList] = useState(initialData);

  const handleChange = (index, field, value) => {
    const updated = [...careerList];
    updated[index][field] = value;
    setCareerList(updated);
  };

  const addCareer = () => {
    setCareerList([
      ...careerList,
      {
        position: "",
        start_date: "",
        end_date: "",
        description: "",
      },
    ]);
  };

  const removeCareer = (index) => {
    const updated = careerList.filter((_, i) => i !== index);
    setCareerList(updated);
  };

  useEffect(() => {
    if (onChange) onChange(careerList);
  }, [careerList, onChange]);

  return (
    <div className="resume-item">
      {careerList.map((career, index) => (
        <div className="resume-item-container career-box" key={index}style={{ position: "relative" }}>
          
          <button
            type="button"
            className="delete-button-top"
            onClick={() => removeCareer(index)}
          >
            ❌
          </button>

          <div className="resume-form-item">
            <label>직무명:</label>
            <input
              type="text"
              value={career.position}
              onChange={(e) =>
                handleChange(index, "position", e.target.value)
              }
              placeholder="직무명을 입력하세요"
            />
          </div>

          <div className="resume-form-item">
            <label>시작일:</label>
            <input
              type="text"
              value={career.start_date}
              onChange={(e) =>
                handleChange(index, "start_date", e.target.value)
              }
              placeholder="예: 2020-01"
            />
          </div>

          <div className="resume-form-item">
            <label>종료일:</label>
            <input
              type="text"
              value={career.end_date}
              onChange={(e) =>
                handleChange(index, "end_date", e.target.value)
              }
              placeholder="예: 2022-12"
            />
          </div>

          <div className="resume-form-item">
            <label>주요 업무:</label>
            <textarea
              value={career.description}
              onChange={(e) =>
                handleChange(index, "description", e.target.value)
              }
              placeholder="주요 업무 내용을 입력하세요"
            />
          </div>
        </div>
      ))}

      <button onClick={addCareer} className="plus-button">
        경력 사항 추가 <img src={ResumePlusIcon} alt="➕" />
      </button>
    </div>
  );
};

export default Career;