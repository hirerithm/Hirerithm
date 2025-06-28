import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./calendar.css";
import CalendarIcon from "../../Image/Icon/CalendarIcon.svg";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false); // 달력 열린 상태

  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <div
      className={`calendar-input-wrapper ${isOpen ? "active" : ""}`}
      onClick={onClick}
      ref={ref}
    >
      <span className="calendar-input-text">{value}</span>
      <img src={CalendarIcon} alt="달력 아이콘" className="calendar-icon" />
    </div>
  ));

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      customInput={<CustomInput />}
      dateFormat="yyyy-MM-dd"
      onCalendarOpen={() => setIsOpen(true)}
      onCalendarClose={() => setIsOpen(false)}
    />
  );
};

export default Calendar;
