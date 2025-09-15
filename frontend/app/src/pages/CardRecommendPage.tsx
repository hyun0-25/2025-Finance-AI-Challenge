import CardRecommendContent1 from "../components/cardRecommend/CardRecommendContent1";

export default function CardRecommendPage() {
  const CardRecommendData = [
    {
      cardImg: "/card-img.png",
      cardName: "A카드",
      recommendCount: 4,
      benefit: "주말 데이트 시 카페/맛집 할인 혜택을 위해 추천됐어요!",
      medal: "🥇",
    },
    {
      cardImg: "/card-img.png",
      cardName: "B카드",
      recommendCount: 2,
      benefit: "주말 데이트 시 카페/맛집 할인 혜택을 위해 추천됐어요!",
      medal: "🥈",
    },
    {
      cardImg: "/card-img.png",
      cardName: "C카드",
      recommendCount: 1,
      benefit: "주말 데이트 시 카페/맛집 할인 혜택을 위해 추천됐어요!",
      medal: "🥉",
    }
  ];

  return (
    <div >
      <CardRecommendContent1 cards={CardRecommendData} />
    </div>
  );
}