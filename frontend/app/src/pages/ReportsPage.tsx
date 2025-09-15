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
      cardImg: "/public/card-img.png",
      cardName: "T끌카드 The PLATINUM",
      recommendCount: 15,
      benefit: "국내외 여행, 호텔 할인 혜택",
      medal: "🥇"
    },
    {
      cardImg: "/public/card-img.png", 
      cardName: "T끌카드 ZERO Edition2",
      recommendCount: 12,
      benefit: "모든 가맹점 0.7% 적립",
      medal: "🥈"
    },
    {
      cardImg: "/public/card-img.png",
      cardName: "T끌카드 taptap O",
      recommendCount: 8,
      benefit: "대중교통, 주유 할인",
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