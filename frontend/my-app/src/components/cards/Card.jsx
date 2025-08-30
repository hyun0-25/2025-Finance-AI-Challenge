import React, { useState } from 'react';
import './Card.css';

/**
 * Card 컴포넌트
 * 
 * 카드의 앞면과 뒷면을 3D 뒤집기 애니메이션으로 표시합니다.
 * 앞면에는 카드 디자인, 뒷면에는 카드 혜택과 삭제 버튼이 표시됩니다.
 * 카드 범위를 벗어나지 않도록 스크롤과 오버플로우를 제어합니다.
 * 
 * @param {Object} card - 카드 정보 객체
 * @param {Function} onDelete - 카드 삭제 시 호출되는 콜백 함수
 * @returns {JSX.Element} 카드 컴포넌트
 */
const Card = ({ card, onDelete }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  /**
   * 카드 클릭 시 뒤집기 상태를 토글합니다.
   */
  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  /**
   * 카드 삭제 버튼 클릭 시 호출되는 핸들러입니다.
   * 이벤트 버블링을 방지하여 카드 뒤집기가 발생하지 않도록 합니다.
   * 
   * @param {Event} e - 클릭 이벤트 객체
   */
  const handleDelete = (e) => {
    e.stopPropagation(); // 카드 뒤집기 방지
    if (window.confirm('정말로 이 카드를 삭제하시겠습니까?')) {
      onDelete(card.id);
    }
  };

  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={handleCardClick}>
      <div className="card-inner">
        {/* 카드 앞면 - 카드 디자인 및 기본 정보 */}
        <div className="card-front">
          <div className="card-header">
            <span className="card-bank">{card.bank}</span>
            <span className="card-name">{card.name}</span>
          </div>
          <div className="card-hint">
            <p>터치하여 카드 혜택 확인</p>
          </div>
        </div>

        {/* 카드 뒷면 - 카드 혜택, 연회비, 적립률, 삭제 버튼 */}
        <div className="card-back">
          <div className="card-back-header">
            <h3>{card.name}</h3>
            <button className="delete-btn" onClick={handleDelete}>
              삭제
            </button>
          </div>
          <div className="card-benefits">
            <h4>카드 혜택</h4>
            <div className="benefits-list">
              {card.benefits && card.benefits.length > 0 ? (
                <ul>
                  {card.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              ) : (
                <p className="no-benefits">혜택 정보가 없습니다.</p>
              )}
            </div>
          </div>
          <div className="card-info">
            <p><strong>연회비:</strong> {card.annualFee}</p>
            <p><strong>적립률:</strong> {card.rewardRate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
