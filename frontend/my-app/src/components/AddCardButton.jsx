import React from 'react';
import './AddCardButton.css';

const AddCardButton = ({ onClick }) => {
  return (
    <div className="add-card-button" onClick={onClick}>
      <div className="add-icon">+</div>
      <span>새 카드 추가</span>
    </div>
  );
};

export default AddCardButton;
