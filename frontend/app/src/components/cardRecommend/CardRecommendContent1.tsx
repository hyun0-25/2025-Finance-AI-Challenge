import { COLORS } from "../../styles/colors";
import { useNavigate } from "react-router-dom";
import React from "react";

interface CardRecommendData {
  cardImg: string;
  cardName: string;
  recommendCount: number;
  benefit: string;
  medal: string; // 🥇, 🥈, 🥉
}

interface CardRecommendContent1Props {
  cards: CardRecommendData[];
}

export default function CardRecommendContent1({ cards }: CardRecommendContent1Props) {
  const totalRecommend = cards.reduce((sum, card) => sum + card.recommendCount, 0);
  const navigate = useNavigate();
  const [hoverIdx, setHoverIdx] = React.useState<number | null>(null);

  return (
    <div style={{ textAlign: "left", padding: "0 15px" }}>
      <div style={{ fontWeight: 700, fontSize: 40, color: "#222", marginBottom: 12 }}>
        AI가 추천한<br />나영님을 위한<br /> 카드
      </div>
      <div style={{ color: COLORS.accent, fontWeight: 700, fontSize: 20, marginBottom: 12 }}>
        총 {totalRecommend}회의 카드 추천을 받았어요!
      </div>
      {cards.map((card, idx) => ( 
        <div
          key={idx}
          style={{
            width: 380,
            height: 166,
            background: hoverIdx === idx ? COLORS.accent : COLORS.light,
            borderRadius: 24,
            display: "flex",
            alignItems: "center",
            marginBottom: 20,
            cursor: "pointer",
          }}
          onClick={() => navigate(`/card-detail/${encodeURIComponent(card.cardName)}`, { state: { cardImg: card.cardImg, cardName: card.cardName } })}
          onMouseEnter={() => setHoverIdx(idx)}
          onMouseLeave={() => setHoverIdx(null)}
        >
          <img
            src={card.cardImg}
            alt={card.cardName}
            style={{
              width: 80,
              borderRadius: 8,
              objectFit: "cover",
              margin: 16,
            }}
          />
          <div style={{ color: "#222" }}>
            <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 10 }}>
              <span style={{ fontSize: 20, padding: 2 }}>{card.medal}</span>
              {card.cardName} <span style={{ fontSize: 18, padding: 1 }}>(총 {card.recommendCount}회 추천)</span>
            </div>
            <div style={{ fontSize: 18, width: 240, marginBottom: 20 }}>{card.benefit}</div>
          </div>
          <span style={{ position: "absolute", right: 35, fontSize: 50, color: COLORS.accent }}>›</span>
        </div>
      ))}
    </div>
  );
}