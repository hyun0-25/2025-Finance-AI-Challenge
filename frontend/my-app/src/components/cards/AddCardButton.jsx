import React from 'react';
import './AddCardButton.css';

/**
 * AddCardButton 컴포넌트
 * 
 * 새로운 카드를 추가할 수 있는 버튼 컴포넌트입니다.
 * 점선 테두리와 플러스 아이콘으로 구성되어 있습니다.
 * 
 * @param {Function} onClick - 버튼 클릭 시 호출되는 콜백 함수
 * @returns {JSX.Element} 카드 추가 버튼 컴포넌트
 */
const AddCardButton = ({ onClick }) => {
  return (
    <div className="add-card-button" onClick={onClick}>
      {/* 플러스 아이콘 */}
      <div className="add-icon">+</div>
      {/* 버튼 텍스트 */}
      <span>새 카드 추가</span>
    </div>
  );
};

export default AddCardButton;
