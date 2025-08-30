import React, { useState } from 'react';
import './Card.css';

const Card = ({ card, onDelete }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // 카드 뒤집기 방지
    onDelete(card.id);
  };

  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={handleCardClick}>
      <div className="card-inner">
        {/* 카드 앞면 */}
        <div className="card-front">
          <div className="card-header">
            <span className="card-bank">{card.bank}</span>
            <span className="card-name">{card.name}</span>
          </div>
          <div className="card-chip">
            <div className="chip-icon">💳</div>
            <div className="arrow">‹</div>
          </div>
        </div>

        {/* 카드 뒷면 */}
        <div className="card-back">
          <div className="card-back-header">
            <h3>{card.name}</h3>
            <button className="delete-btn" onClick={handleDelete}>
              삭제
            </button>
          </div>
          <div className="card-benefits">
            <h4>카드 혜택</h4>
            <ul>
              {card.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
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
