import React from "react";
import "../candidatePage.css";

const Experience = ({ candidate }) => {
  if (!candidate || candidate.experience.length === 0) return null;

  const Experience = candidate.experience;

  return (
    <div className="image-recommend-result_item-container">
      <div className="image-recommend-result_item">
        <label>경력</label>
        <ul className="image-recommend-experience-list">
          {Experience.map((exp, index) => (
            <li key={index}>
              <strong>{exp.company}</strong> / {exp.role} / {exp.duration}
              <p>{exp.datail}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Experience;
