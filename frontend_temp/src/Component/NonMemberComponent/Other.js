import React, { useState, useEffect } from "react";
import ResumePlusIcon from "../../Image/Icon/ResumePlusIcon.svg";
import DeleteIcon from "../../Image/Icon/DeleteIcon.svg";
import "./resumeComponent.css";

const Other = ({ initialData = {}, onChange }) => {
  const parsedNotes =
    initialData.otherinfo && Array.isArray(JSON.parse(initialData.otherinfo))
      ? JSON.parse(initialData.otherinfo).map((note) => ({ note }))
      : [{ note: "" }];

  const [otherItems, setOtherItems] = useState(parsedNotes);

  // mount 시 초기값 반영
  useEffect(() => {
    const noteList = otherItems
      .map((item) => item.note.trim())
      .filter((note) => note !== "");
    onChange({ otherinfo: JSON.stringify(noteList) });
  }, []);

  const handleChange = (index, value) => {
    const updated = [...otherItems];
    updated[index].note = value;
    setOtherItems(updated);
  };

  const addOther = () => {
    setOtherItems([...otherItems, { note: "" }]);
  };

  const removeOther = (index) => {
    const updated = otherItems.filter((_, i) => i !== index);
    setOtherItems(updated);
  };

  useEffect(() => {
    const noteList = otherItems
      .map((item) => item.note.trim())
      .filter((note) => note !== "");
    onChange({ otherinfo: JSON.stringify(noteList) });
  }, [otherItems]);

  return (
    <div className="resume-item">
      <div className="resume-item-container">
        {otherItems.map((item, index) => (
          <div className="resume-form-item" key={index}>
            <textarea
              id={`other-${index}`}
              type="text"
              placeholder="기타사항 입력 (예: 병역사항, 건강상태 등)"
              value={item.note}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          </div>
        ))}

        <button onClick={addOther} className="plus-button">
          기타 사항 추가 <img src={ResumePlusIcon} alt="➕" />
        </button>
      </div>
    </div>
  );
};

export default Other;
