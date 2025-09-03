import React, { useEffect, useState } from "react";

interface MobileFrameProps {
  children: React.ReactNode;
}

const FRAME_WIDTH = 434;
const FRAME_HEIGHT = 898;
const FRAME_RADIUS = 44;
const FRAME_BORDER = 7;
const SCREEN_WIDTH = FRAME_WIDTH - FRAME_BORDER * 2;
const SCREEN_HEIGHT = FRAME_HEIGHT - FRAME_BORDER * 2;
const SCREEN_RADIUS = 38;

export default function MobileFrame({ children }: MobileFrameProps) {
  const [time, setTime] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", hour12: false });
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", hour12: false }));
    }, 1000 * 10); // 10초마다 갱신
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        width: FRAME_WIDTH,
        height: FRAME_HEIGHT,
        borderRadius: FRAME_RADIUS,
        border: `${FRAME_BORDER}px solid #222`,
        background: "#18181b",
        position: "relative",
        overflow: "hidden",
        margin: "40px auto",
      }}
    >
      {/* 상단 바 */}
      <div
        style={{
          position: "absolute",
          top: 18,
          left: 0,
          width: "420px",
          height: 37,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 8px", // 좌우 여백을 줄임
          zIndex: 999,
          pointerEvents: "none",
        }}
      >
        {/* 현재 시간 */}
        <span style={{ fontSize: 22, fontWeight: 500, color: "#222", marginLeft: 40 }}>{time}</span>
        {/* 펀치홀 */}
        <div
          style={{
            position: "relative",
            width: 126,
            height: 37,
            background: "#000",
            borderRadius: 24,
            boxShadow: "0 0 0 2px rgba(0,0,0,0.6)",
          }}
        >
          {/* 카메라 점 */}
          <div
            style={{
              position: "absolute",
              right: 12,
              top: 10,
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: "#18181b",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                margin: "auto",
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "rgba(55,65,81,0.8)",
              }}
            />
          </div>
        </div>
        {/* 네트워크/배터리 아이콘 */}
        <div style={{ display: "flex", alignItems: "center", marginRight: 40, gap: 10 }}>
          <img src="/icons/icon-signal.png" alt="신호" style={{ width: 20, height: 20 }} />
          <img src="/icons/icon-wifi.png" alt="와이파이" style={{ width: 20, height: 20 }} />
          <img src="/icons/icon-battery.png" alt="배터리" style={{ width: 20, height: 20 }} />
        </div>
      </div>
      {/* 화면 영역 */}
      <div
        style={{
          position: "absolute",
          top: FRAME_BORDER,
          left: FRAME_BORDER,
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
          borderRadius: SCREEN_RADIUS,
          background: "#fff",
          overflow: "hidden",
        }}
      >
        <div style={{ height: "100%", overflowY: "auto" }}>
          {children}
          {/* 홈 인디케이터 */}
          <div
            style={{
              position: "absolute",
              bottom: 16,
              left: "50%",
              transform: "translateX(-50%)",
              width: 120,
              height: 6,
              borderRadius: 3,
              background: "rgba(0,0,0,0.2)",
            }}
          />
        </div>
      </div>
    </div>
  );
}