import React from "react";
import "../candidatePage.css";

const AcademicAbility = ({ candidate }) => {
  if (!candidate || !candidate.education) return null;

  const educationList = candidate.education;

  return (
    <div className="image-recommend-result_item-container">
      <div className="image-recommend-result_item">
        <label>학력</label>
        <ul>
          {educationList.map((edu, index) => (
            <li key={index}>
              {edu.school} / {edu.major} / {edu.year}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AcademicAbility;
