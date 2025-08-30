import React from 'react';
import './MonthlyExpenseList.css';

/**
 * MonthlyExpenseList 컴포넌트
 * 
 * 월별 소비내역을 1~31일 리스트로 표시하고, 날짜 클릭 시 일정 등록 폼을 표시합니다.
 * 
 * @param {string} selectedDate - 현재 선택된 날짜 (YYYY-MM-DD 형식)
 * @param {Function} onDateSelect - 날짜가 선택되었을 때 호출되는 콜백 함수
 * @returns {JSX.Element} 월별 소비내역 리스트 컴포넌트
 */
const MonthlyExpenseList = ({ selectedDate, onDateSelect }) => {
  /**
   * 임시 소비내역 데이터를 생성합니다.
   * 1~31일 중 70% 확률로 소비내역이 있는 날짜를 생성합니다.
   * 
   * @returns {Array} 소비내역 객체 배열
   */
  const generateExpenseData = () => {
    const expenses = [];
    for (let day = 1; day <= 31; day++) {
      const hasExpense = Math.random() > 0.3; // 70% 확률로 소비내역 있음
      if (hasExpense) {
        expenses.push({
          day,
          amount: Math.floor(Math.random() * 100000) + 5000, // 5천원 ~ 10만원
          category: ['식비', '교통비', '쇼핑', '문화생활', '기타'][Math.floor(Math.random() * 5)],
          description: ['점심식사', '지하철', '온라인쇼핑', '영화관람', '편의점'][Math.floor(Math.random() * 5)]
        });
      }
    }
    return expenses.sort((a, b) => a.day - b.day);
  };

  const expenses = generateExpenseData();

  /**
   * 소비내역 날짜가 클릭되었을 때 호출되는 핸들러입니다.
   * 선택된 날짜를 YYYY-MM-DD 형식으로 변환하여 상위 컴포넌트에 전달합니다.
   * 
   * @param {number} day - 클릭된 일자 (1~31)
   */
  const handleDateClick = (day) => {
    const dateString = `2025-01-${day.toString().padStart(2, '0')}`;
    onDateSelect(dateString);
  };

  return (
    <div className="monthly-expense-list">
      {/* 제목 */}
      <h3>이번 달 소비내역</h3>
      
      {/* 소비 요약 정보 - 총 소비금액과 일평균 */}
      <div className="expense-summary">
        <span>총 소비: {expenses.reduce((sum, exp) => sum + exp.amount, 0).toLocaleString()}원</span>
        <span>일평균: {Math.round(expenses.reduce((sum, exp) => sum + exp.amount, 0) / 31).toLocaleString()}원</span>
      </div>
      
      {/* 소비내역 리스트 */}
      <div className="expense-items">
        {expenses.map((expense, index) => (
          <div key={index} className="expense-item" onClick={() => handleDateClick(expense.day)}>
            <div className="expense-date">
              <span className="day">{expense.day}일</span>
              <span className="category">{expense.category}</span>
            </div>
            <div className="expense-details">
              <span className="description">{expense.description}</span>
              <span className="amount">{expense.amount.toLocaleString()}원</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* 소비내역이 없을 때 표시되는 메시지 */}
      {expenses.length === 0 && (
        <div className="no-expense">
          <p>이번 달 소비내역이 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default MonthlyExpenseList;
