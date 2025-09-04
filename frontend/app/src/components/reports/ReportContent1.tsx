import { COLORS } from "../../styles/colors";

interface ReportContent1Props {
  year: number;
  quarter: number;
  characterName: string;
  userName: string;
  characterImg: string;
}

export default function ReportContent1({
  year,
  quarter,
  characterName,
  userName,
  characterImg,
}: ReportContent1Props) {
  return (
    <div >
      {/* 타이틀 & 옵션바 */}
      <div style={{ display: "flex", justifyContent: "start", alignItems: "center", marginLeft: 25, margin: 20}}>
        <span
          style={{
            fontWeight: 700,
            fontSize: 24,
            color: "#222",
          }}
        >
          금융 리포트
        </span>
        <span
          style={{
            fontWeight: 700,
            fontSize: 20,
            background: COLORS.main,
            color: "#222",
            marginLeft: 16,
            borderRadius: 8,
            padding: "4px 12px",
          }}
        >
          {year}년 {quarter}분기
        </span>
      </div>
      {/* 캐릭터 이름 */}
      <div
        style={{
          fontWeight: 700,
          fontSize: 28,
          color: COLORS.accent,
        }}
      >
        {characterName}
      </div>
      {/* 캐릭터 이미지 */}
      <img
        src={characterImg}
        alt="캐릭터"
        style={{
          width: 255,
          height: 255,
          objectFit: "contain",
        }}
      />
      {/* 문구 */}
      <div style={{ fontWeight: 500, fontSize: 20, color: "#222", marginBottom: 24 }}>
        지난 3개월, {userName}의 시간은 이렇게 채워졌어요.
      </div>
    </div>
  );
}