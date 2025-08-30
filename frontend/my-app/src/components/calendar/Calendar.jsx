import React, { useState } from 'react';
import './Calendar.css';

/**
 * Calendar 컴포넌트
 * 
 * 월별 캘린더를 표시하고 날짜 선택 기능을 제공합니다.
 * 
 * @param {Function} onDateSelect - 날짜가 선택되었을 때 호출되는 콜백 함수
 * @returns {JSX.Element} 월별 캘린더 컴포넌트
 */
const Calendar = ({ onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // 현재 년도와 월
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  // 요일 배열
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  
  // 월의 첫 번째 날과 마지막 날
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  /**
   * 달력에 표시할 날짜들을 생성합니다.
   * 이전 달, 현재 달, 다음 달의 날짜를 포함하여 6주 × 7일 = 42일을 만듭니다.
   * 
   * @returns {Array} 날짜 객체 배열
   */
  const getCalendarDays = () => {
    const days = [];
    
    // 이전 달의 마지막 날짜들
    const prevMonthLastDay = new Date(year, month, 0);
    const prevMonthDays = firstDay.getDay();
    
    for (let i = prevMonthDays - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthLastDay.getDate() - i),
        isCurrentMonth: false
      });
    }
    
    // 현재 달의 날짜들
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true
      });
    }
    
    // 다음 달의 첫 번째 날짜들
    const nextMonthDays = 42 - days.length; // 6주 * 7일 = 42
    for (let i = 1; i <= nextMonthDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false
      });
    }
    
    return days;
  };
  
  /**
   * 이전 달로 이동합니다.
   */
  const goToPrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };
  
  /**
   * 다음 달로 이동합니다.
   */
  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };
  
  /**
   * 날짜가 클릭되었을 때 호출되는 핸들러입니다.
   * 현재 달의 날짜만 선택 가능하며, 선택된 날짜는 일정 등록 폼을 표시합니다.
   * 
   * @param {Object} day - 클릭된 날짜 객체
   */
  const handleDateClick = (day) => {
    if (day.isCurrentMonth && onDateSelect) {
      const dateString = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.date.getDate().toString().padStart(2, '0')}`;
      onDateSelect(dateString);
    }
  };
  
  const calendarDays = getCalendarDays();
  
  return (
    <div className="calendar">
      {/* 월별 헤더 - 년/월 표시 및 월 이동 버튼 */}
      <div className="calendar-header">
        <button className="month-nav-btn" onClick={goToPrevMonth}>
          ‹
        </button>
        <div className="month-title">
          {year}년 {month + 1}월
        </div>
        <button className="month-nav-btn" onClick={goToNextMonth}>
          ›
        </button>
      </div>
      
      {/* 요일 헤더 - 일월화수목금토 */}
      <div className="weekdays-header">
        {weekdays.map((day, index) => (
          <div key={index} className={`weekday ${index === 0 ? 'sunday' : ''}`}>
            {day}
          </div>
        ))}
      </div>
      
      {/* 날짜 그리드 - 6주 × 7일 = 42개 날짜 */}
      <div className="calendar-grid">
        {calendarDays.map((day, index) => {
          const today = new Date();
          const isToday = day.date.getFullYear() === today.getFullYear() &&
            day.date.getMonth() === today.getMonth() &&
            day.date.getDate() === today.getDate();
          return (
            <div 
              key={index}
              className={`calendar-day${!day.isCurrentMonth ? ' other-month' : ''}${isToday ? ' today' : ''}`}
              onClick={() => handleDateClick(day)}
            >
              <span className="day-number">{day.date.getDate()}</span>
              {/* TODO: 여기에 카드 사용 내역이나 지출 금액을 표시할 수 있습니다 */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
