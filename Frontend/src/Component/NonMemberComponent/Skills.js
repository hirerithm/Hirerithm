import React, { useState, useEffect } from "react";
import ResumePlusIcon from "../../Image/Icon/ResumePlusIcon.svg";
import DeleteIcon from "../../Image/Icon/DeleteIcon.svg";
import "./resumeComponent.css";

const Skills = ({ onChange }) => {
  const [skills, setSkills] = useState([{ skill: "" }]);

  const handleChange = (index, value) => {
    const updated = [...skills];
    updated[index].skill = value;
    setSkills(updated);
  };

  const addSkill = () => {
    setSkills([...skills, { skill: "" }]);
  };

  const removeSkill = (index) => {
    const updated = skills.filter((_, i) => i !== index);
    setSkills(updated);
  };

  useEffect(() => {
    onChange(skills);
  }, [skills]);

  return (
    <div className="resume-item">
      <div className="resume-item-container">
        {skills.map((item, index) => (
          <div className="resume-form-item" key={index}>
            <label>Stack</label>
            <input
              id={`skill-${index}`}
              type="text"
              placeholder="사용 가능한 기술스택 입력"
              value={item.skill}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
