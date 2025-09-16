import ReportContent1 from "../components/reports/ReportContent1";
import ReportContent2 from "../components/reports/ReportContent2";
import CardRecommendContent1 from "../components/cardRecommend/CardRecommendContent1";

export default function ReportsPage() {
  // 목업 데이터
  const reportData1 = {
    year: 2025,
    quarter: 2,
    characterName: "결혼식 프로참석러 사랑꾼",
    userName: "나영님",
    characterImg: "/character-img.png",
  };

  const reportData2 = [
    { icon: "💍", label: "소중한 사람을 위한", highlight: "결혼식 참석 2회" },
    { icon: "💕", label: "설렘 가득했던", highlight: "데이트 8회" },
    { icon: "👨‍👩‍👧‍👦", label: "가족과 함께한", highlight: "국내여행 1회" },
    { icon: "🎬", label: "영화관에서의", highlight: "문화생활 3회" },
  ];

  // 카드 추천 데이터
  const cardRecommendData = [
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
    <div style={{ paddingTop: "54px", textAlign: "center", maxHeight: "100vh" }}>
      <ReportContent1 {...reportData1} />
      <ReportContent2 activities={reportData2} />
      
      {/* 카드 추천 섹션 */}
      <div id="card-recommend-section" >
        <CardRecommendContent1 cards={cardRecommendData} />
      </div>
    </div>
  );
}