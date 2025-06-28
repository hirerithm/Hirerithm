import React from "react";
import "../candidatePage.css";

const Other = ({ candidate }) => {
  const otherContent = candidate.other;

  if (Array.isArray(otherContent)) {
    return (
      <div className="image-recommend-result_item-container">
        <div className="image-recommend-result_item">
          <label>기타</label>
          <ul>
            {otherContent.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="image-recommend-result_item-container">
        <div className="image-recommend-result_item">
          <label>기타</label>
          <p>{otherContent}</p>
        </div>
      </div>
    );
  }
};

export default Other;
