import { COLORS } from "../../styles/colors";
import { useNavigate } from "react-router-dom";
import React from "react";

interface CardRecommendData {
  cardImg: string;
  cardName: string;
  recommendCount: number;
  benefit: string;
  medal: string; // 🥇, 🥈, 🥉
  cardId?: number; // 카드 ID 추가
}

interface CardRecommendContent1Props {
  cards: CardRecommendData[];
}

export default function CardRecommendContent1({ cards }: CardRecommendContent1Props) {
  const totalRecommend = cards.reduce((sum, card) => sum + card.recommendCount, 0);
  const navigate = useNavigate();
  const [hoverIdx, setHoverIdx] = React.useState<number | null>(null);

  return (
    <div style={{ textAlign: "left", padding: "0 20px" }}>
      {/* 상단 바 */}
      <div style={{ display: 'flex', alignItems: 'center', marginTop: 60 }}>
        <button 
          onClick={() => navigate('/reports')} 
          style={{ 
            background: 'none', 
            border: 'none',
            marginTop: 12,
            marginRight: 16,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <img 
            src="/src/assets/icons/back.png" 
            alt="뒤로가기" 
            style={{ 
              width: '16px', 
              height: '24px' 
            }} 
          />
        </button>
      </div>
      <div style={{ fontWeight: 700, fontSize: 40, color: "#222", marginBottom: 12, marginLeft: 8 }}>
        AI가 추천한<br />나영님을 위한<br /> 카드
      </div>
      <div style={{ color: COLORS.accent, fontWeight: 700, fontSize: 20, marginBottom: 12, marginLeft: 8 }}>
        총 {totalRecommend}회의 카드 추천을 받았어요!
      </div>
      {cards.map((card, idx) => ( 
        <div
          key={idx}
          style={{
            width: 380,
            height: 166,
            background: hoverIdx === idx ? COLORS.main : COLORS.light,
            borderRadius: 24,
            display: "flex",
            alignItems: "center",
            marginBottom: 20,
            cursor: "pointer",
          }}
          onClick={() => {
            // cardImg에서 카드 ID 추출 (예: "/src/assets/cards/3.png" -> 3)
            const cardId = card.cardId || (() => {
              const match = card.cardImg.match(/\/(\d+)\.png$/);
              return match ? parseInt(match[1]) : null;
            })();
            
            navigate(`/card-detail/${encodeURIComponent(card.cardName)}`, { 
              state: { 
                cardImg: card.cardImg, 
                cardName: card.cardName,
                cardId: cardId
              } 
            });
          }}
          onMouseEnter={() => setHoverIdx(idx)}
          onMouseLeave={() => setHoverIdx(null)}
        >
          <img
            src={card.cardImg}
            alt={card.cardName}
            style={{
              width: 80,
              borderRadius: 4,
              objectFit: "cover",
              margin: 16,
            }}
          />
          <div style={{ color: "#222" }}>
            <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 10 }}>
              <span style={{ fontSize: 16, marginLeft: 8, color: COLORS.accent }}>{card.recommendCount}회 추천!</span>
              <br />
              <span style={{ fontSize: 20, padding: 2 }}>{card.medal}</span>{card.cardName}
            </div>
            <div style={{  fontSize: 16, width: 220, marginLeft: 8 }}>{card.benefit}</div>
          </div>
          <img 
            src="/src/assets/icons/right.png" 
            alt="오른쪽 화살표" 
            style={{ 
              position: "absolute", 
              right: 40, 
              width: '16px', 
              height: '28px' 
            }} 
          />
        </div>
      ))}
      <div style={{ height: 20 }}></div>
    </div>
  );
}