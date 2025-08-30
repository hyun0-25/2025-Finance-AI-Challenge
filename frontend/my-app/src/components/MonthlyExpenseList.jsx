import React from 'react';
import './MonthlyExpenseList.css';

const MonthlyExpenseList = ({ selectedDate, onDateSelect }) => {
  // 임시 소비내역 데이터 (1~31일)
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

  const handleDateClick = (day) => {
    const dateString = `2025-01-${day.toString().padStart(2, '0')}`;
    onDateSelect(dateString);
  };

  return (
    <div className="monthly-expense-list">
      <h3>이번 달 소비내역</h3>
      <div className="expense-summary">
        <span>총 소비: {expenses.reduce((sum, exp) => sum + exp.amount, 0).toLocaleString()}원</span>
        <span>일평균: {Math.round(expenses.reduce((sum, exp) => sum + exp.amount, 0) / 31).toLocaleString()}원</span>
      </div>
      
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
      
      {expenses.length === 0 && (
        <div className="no-expense">
          <p>이번 달 소비내역이 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default MonthlyExpenseList;
