import { COLORS } from "../../styles/colors";

interface ActivityItem {
  icon: string;      // 이모지
  label: string;     // 설명 텍스트
  highlight: string; // 강조 텍스트
}

interface ReportContent2Props {
  activities: ActivityItem[];
}

export default function ReportContent2({ activities }: ReportContent2Props) {
  return (
    <div
      style={{
        height: 380,
        background: COLORS.main,
        borderRadius: 20,
        padding: "20px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {activities.map((item, idx) => (
        <div
          key={idx}
          style={{
            background: COLORS.light,
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            width: 372,
            padding: "12px",
            marginBottom: 20,
          }}
        >
          <span style={{ fontSize: 30 }}>{item.icon}</span>
          <span style={{ fontSize: 20, fontWeight: 700, color: "#222", marginLeft: 12 }}>
            {item.label}{" "}
            <span style={{ color: COLORS.accent }}>
              {item.highlight}
            </span>
          </span>
        </div>
      ))}
      {/* 아래쪽 화살표 */}
        {/* <svg width="50" height="50" viewBox="0 0 36 36">
          <path
            d="M10 15l8 8 8-8"
            stroke="#c3c3c3"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg> */}
    </div>
  );
}