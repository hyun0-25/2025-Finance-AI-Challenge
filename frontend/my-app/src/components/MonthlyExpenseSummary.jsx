import React from 'react';
import './MonthlyExpenseSummary.css';

const MonthlyExpenseSummary = () => {
  // 임시 데이터
  const expenseData = {
    totalAmount: 1250000,
    categories: [
      { name: '식비', amount: 450000, percentage: 36, color: '#FF6B6B' },
      { name: '교통비', amount: 120000, percentage: 10, color: '#4ECDC4' },
      { name: '쇼핑', amount: 300000, percentage: 24, color: '#45B7D1' },
      { name: '문화생활', amount: 200000, percentage: 16, color: '#96CEB4' },
      { name: '기타', amount: 180000, percentage: 14, color: '#FFEAA7' }
    ]
  };

  return (
    <div className="monthly-expense-summary">
      <div className="summary-header">
        <h3>이번 달 소비 내역</h3>
        <span className="total-amount">
          {expenseData.totalAmount.toLocaleString()}원
        </span>
      </div>
      
      <div className="category-list">
        {expenseData.categories.map((category, index) => (
          <div key={index} className="category-item">
            <div className="category-info">
              <div 
                className="category-color" 
                style={{ backgroundColor: category.color }}
              ></div>
              <span className="category-name">{category.name}</span>
            </div>
            <div className="category-amount">
              <span className="amount">{category.amount.toLocaleString()}원</span>
              <span className="percentage">({category.percentage}%)</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="summary-footer">
        <button className="view-details-btn">
          상세 내역 보기
        </button>
      </div>
    </div>
  );
};

export default MonthlyExpenseSummary;
