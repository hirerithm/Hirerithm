import React, { useState, useEffect } from "react";
import ResumePlusIcon from "../../Image/Icon/ResumePlusIcon.svg";
import DeleteIcon from "../../Image/Icon/DeleteIcon.svg";
import "./resumeComponent.css";

const License = ({ initialData = [], onChange }) => {
  const [license, setLicense] = useState(initialData);

  useEffect(() => {
    if (onChange) onChange(license);
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...license];
    updated[index][field] = value;
    setLicense(updated);
  };

  const addLicense = () => {
    setLicense([
      ...license,
      {
        issued_date: "",
        certificate_name: "",
        certificate_number: "",
      },
    ]);
  };

  const removeLicense = (index) => {
    const updated = license.filter((_, i) => i !== index);
    setLicense(updated);
  };

  useEffect(() => {
    const filtered = license.filter(
      (item) =>
        item.issued_date || item.certificate_name || item.certificate_number
    );

    onChange(filtered);
  }, [license, onChange]);

  return (
    <div className="resume-item">
      {license.map((item, index) => (
        <div
          className="resume-item-container career-box"
          key={index}
          style={{ position: "relative" }}
        >
          {/* X 버튼 추가 */}
          <button
            type="button"
            className="delete-button-top"
            onClick={() => removeLicense(index)}
          >
            <img src={DeleteIcon} alt="삭제" />
          </button>

          <div className="resume-form-item">
            <label>취득일</label>
            <input
              type="text"
              placeholder="취득일 8자리 입력"
              value={item.issued_date}
              onChange={(e) =>
                handleChange(index, "issued_date", e.target.value)
              }
            />
          </div>

          <div className="resume-form-item">
            <label>자격증명</label>
            <input
              type="text"
              placeholder="자격증명 이름"
              value={item.certificate_name}
              onChange={(e) =>
                handleChange(index, "certificate_name", e.target.value)
              }
            />
          </div>

          <div className="resume-form-item">
            <label>자격번호</label>
            <input
              type="text"
              placeholder="자격번호 (예: 20210520-12345)"
              value={item.certificate_number}
              onChange={(e) =>
                handleChange(index, "certificate_number", e.target.value)
              }
            />
          </div>
        </div>
      ))}

      <button onClick={addLicense} className="plus-button">
        자격증 추가 <img src={ResumePlusIcon} alt="➕" />
      </button>
    </div>
  );
};

export default License;
