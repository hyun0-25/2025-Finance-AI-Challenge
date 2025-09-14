import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { COLORS } from '../styles/colors';

// 이미지 import
import mypageIcon from '../assets/icons/navigation/mypage.png';
import calendarIcon from '../assets/icons/navigation/calendar.png';
import reportIcon from '../assets/icons/navigation/report.png';

const NavigationBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
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

  return (
    <div style={{
      position: 'absolute',
      bottom: '50px', // 홈 인디케이터 위에 위치
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
      {tabs.map((tab) => (
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
  );
};

export default NavigationBar;