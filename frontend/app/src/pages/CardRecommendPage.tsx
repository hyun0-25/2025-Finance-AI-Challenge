import CardRecommendContent1 from "../components/cardRecommend/CardRecommendContent1";

export default function CardRecommendPage() {
  const CardRecommendData = [
{
      cardImg: `/src/assets/cards/6.png`,
      cardName: "T끌카드 SOL트래블",
      recommendCount: 15,
      benefit: "환율 우대, 국내외 더하기 서비스, 수수료 빼기 서비스",
      medal: "🥇"
    },
    {
      cardImg: `/src/assets/cards/7.png`,
      cardName: "T끌카드 SOL Plan",
      recommendCount: 12,
      benefit: "주유 포인트 적립 5% 및 모든 가맹점 포인트 적립 1.5%",
      medal: "🥈"
    },
    {
      cardImg: `/src/assets/cards/10.png`,
      cardName: "T끌카드  B.Big(삑)",
      recommendCount: 8,
      benefit: "영화/문화 할인, 카페/디저트 할인 10%, 교통 할인 10%",
      medal: "🥉"
    }
  ];

  return (
    <div >
      <CardRecommendContent1 cards={CardRecommendData} />
    </div>
  );
}