import ReportContent1 from "../components/reports/ReportContent1";

export default function ReportsPage() {
  // 목업 데이터
  const reportData1 = {
    year: 2025,
    quarter: 2,
    characterName: "결혼식 프로참석러 사랑꾼",
    userName: "나영님",
    characterImg: "/character-img.png",
  };

  return (
    <div style={{ paddingTop: "54px", textAlign: "center" }}>
      <ReportContent1
        year={reportData1.year}
        quarter={reportData1.quarter}
        characterName={reportData1.characterName}
        userName={reportData1.userName}
        characterImg={reportData1.characterImg}
      />
      {/* ReportContent2, ReportContent3도 같은 방식으로 전달 */}
    </div>
  );
}