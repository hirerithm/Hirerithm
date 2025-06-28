import React from "react";
import "../candidatePage.css";

const License = ({ candidate }) => {
  if (!candidate || !candidate.license || candidate.license.length === 0)
    return null;

  const licenseList = candidate.license;

  return (
    <div className="image-recommend-result_item-container">
      <div className="image-recommend-result_item">
        <label>자격증</label>
        <ul className="image-recommend-license-list">
          {licenseList.map((license, index) => (
            <li key={index}>
              <strong>{license.licenseName}</strong> / {license.licenseDate} /{" "}
              {license.licenseNumber}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default License;
