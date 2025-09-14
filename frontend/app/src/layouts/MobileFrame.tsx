import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { COLORS } from '../styles/colors';

// NavigationBar 아이콘 import
import mypageIcon from '../assets/icons/navigation/mypage.png';
import calendarIcon from '../assets/icons/navigation/calendar.png';
import reportIcon from '../assets/icons/navigation/report.png';

interface MobileFrameProps {
  children: React.ReactNode;
}

const FRAME_WIDTH = 434;
const FRAME_HEIGHT = 898;
const FRAME_RADIUS = 60;
const FRAME_BORDER = 4;
const SCREEN_WIDTH = FRAME_WIDTH - FRAME_BORDER * 2;
const SCREEN_HEIGHT = FRAME_HEIGHT - FRAME_BORDER * 2;
const SCREEN_RADIUS = 55;

export default function MobileFrame({ children }: MobileFrameProps) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [time, setTime] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", hour12: false });
  });

  // NavigationBar를 표시할 페이지들
  const pagesWithNavigation = ['/mypage', '/calendar'];
  const showNavigation = pagesWithNavigation.includes(location.pathname);

  // NavigationBar 탭 설정
  const navigationTabs = [
    {
      id: 'my',
      label: '마이',
      path: '/mypage',
      icon: mypageIcon
    },
    {
      id: 'calendar',
      label: '캘린더', 
      path: '/calendar',
      icon: calendarIcon
    },
    {
      id: 'reports',
      label: '리포트',
      path: '/reports', 
      icon: reportIcon
    }
  ];

  const isActive = (path: string) => location.pathname === path;

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
        margin: "20px auto",
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
        {/* 현재 시간 (클릭시 "/"경로로 이동*/}
        <span style={{ 
          fontSize: 20, 
          fontWeight: 500, 
          color: "#222", 
          marginLeft: 50, 
          pointerEvents: "auto", 
        }} onClick={() => { navigate("/") }}>{time}</span>
        {/* 펀치홀 */}
        <div
          style={{
            position: "relative",
            width: 126,
            height: 37,
            marginLeft: 24,
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
        <div style={{ display: "flex", alignItems: "center", marginRight: 40, gap: 8 }}>
          <img src="/icons/icon-signal1.png" alt="신호" style={{ width: 22, height: 22 }} />
          <img src="/icons/icon-wifi1.png" alt="와이파이" style={{ width: 22, height: 22 }} />
          <img src="/icons/icon-battery1.png" alt="배터리" style={{ width: 26, height: 26 }} />
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
          
          {/* NavigationBar - 특정 페이지에서만 표시 */}
          {showNavigation && (
            <div style={{
              position: 'absolute',
              bottom: '0px',
              left: '0',
              right: '0',
              height: '70px',
              backgroundColor: COLORS.main,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              paddingBottom: '12px',
              paddingTop: '4px',
              borderTop: `1px solid ${COLORS.main}`,
              borderRadius: '0 0 38px 38px',
              zIndex: 0
            }}>
              {navigationTabs.map((tab) => (
                <div
                  key={tab.id}
                  onClick={() => navigate(tab.path)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                    padding: '8px 16px',
                    borderRadius: '12px',
                    transition: 'all 0.2s ease',
                    backgroundColor: isActive(tab.path) ? COLORS.main : 'transparent'
                  }}
                >
                  <img 
                    src={tab.icon}
                    alt={tab.label}
                    style={{
                      width: '30px',
                      height: '30px',
                      marginBottom: '4px',
                      filter: isActive(tab.path) ? 'none' : 'grayscale(0.5) opacity(0.7)',
                      transition: 'filter 0.2s ease'
                    }}
                  />
                  <span style={{
                    fontSize: '15px',
                    fontWeight: isActive(tab.path) ? '600' : '400',
                    color: isActive(tab.path) ? COLORS.black : COLORS.gray
                  }}>
                    {tab.label}
                  </span>
                </div>
              ))}
            </div>
          )}
          
          {/* 홈 인디케이터 */}
          <div
            style={{
              position: "absolute",
              bottom: 6,
              left: "50%",
              transform: "translateX(-50%)",
              width: 150,
              height: 6,
              borderRadius: 3,
              background: "rgba(0,0,0,1)",
            }}
          />
        </div>
      </div>
    </div>
  );
}