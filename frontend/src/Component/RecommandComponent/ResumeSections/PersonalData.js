import React from "react";
import "../candidatePage.css";

const PersonalData = ({ candidate }) => {
  if (!candidate) return null;

  const {
    name,
    birth,
    age,
    gender,
    address,
    phone,
    currentSalary,
    desiredSalary,
  } = candidate;

  return (
    <div className="image-recommend-result_item-container">
      <div className="image-recommend-result_item">
        <label>성명</label>
        <p>{name}</p>
      </div>

      <div className="image-recommend-result_item">
        <label>출생</label>
        <p>
          {birth} (만 {age}세)
        </p>
      </div>

      <div className="image-recommend-result_item">
        <label>성별</label>
        <p>{gender}</p>
      </div>

      <div className="image-recommend-result_item">
        <label>주소</label>
        <p>{address}</p>
      </div>

      <div className="image-recommend-result_item">
        <label>연락처</label>
        <p>{phone}</p>
      </div>

      <div className="image-recommend-result_item">
        <label>연봉정보</label>
        <p>
          현 {currentSalary} / 희망 {desiredSalary}
        </p>
      </div>
    </div>
  );
};

export default PersonalData;
