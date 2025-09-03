import React from "react";

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
  return (
    <div
      style={{
        width: FRAME_WIDTH,
        height: FRAME_HEIGHT,
        borderRadius: FRAME_RADIUS,
        border: `${FRAME_BORDER}px solid #222`,
        background: "#18181b",
        position: "relative",
        // boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        overflow: "hidden",
        margin: "40px auto",
      }}
    >
      {/* 펀치홀 */}
      <div
        style={{
          position: "absolute",
          top: 18,
          left: "50%",
          transform: "translateX(-50%)",
          width: 126,
          height: 37,
          background: "#000",
          borderRadius: 24,
          boxShadow: "0 0 0 2px rgba(0,0,0,0.6)",
          zIndex: 2,
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
  );
}