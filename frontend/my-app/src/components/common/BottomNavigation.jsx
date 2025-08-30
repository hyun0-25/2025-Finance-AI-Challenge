import React from 'react';
import './BottomNavigation.css';

/**
 * BottomNavigation 컴포넌트
 * 
 * 앱 하단에 고정된 네비게이션 바를 제공합니다.
 * "내 카드", "캘린더", "금융 리포트" 탭으로 구성되어 있습니다.
 * 
 * @param {string} activeTab - 현재 활성화된 탭
 * @param {Function} onTabChange - 탭 변경 시 호출되는 콜백 함수
 * @returns {JSX.Element} 하단 네비게이션 컴포넌트
 */
const BottomNavigation = ({ activeTab, onTabChange }) => {
  /**
   * 탭이 클릭되었을 때 호출되는 핸들러입니다.
   * 해당 탭을 활성화하고 상위 컴포넌트에 알립니다.
   * 
   * @param {string} tabName - 클릭된 탭의 이름
   */
  const handleTabClick = (tabName) => {
    onTabChange(tabName);
  };

  return (
    <nav className="bottom-navigation">
      {/* 내 카드 탭 */}
      <div 
        className={`nav-item ${activeTab === 'mycards' ? 'active' : ''}`}
        onClick={() => handleTabClick('mycards')}
      >
        <span className="nav-icon">💳</span>
        <span className="nav-text">내 카드</span>
      </div>

      {/* 캘린더 탭 */}
      <div 
        className={`nav-item ${activeTab === 'calendar' ? 'active' : ''}`}
        onClick={() => handleTabClick('calendar')}
      >
        <span className="nav-icon">📅</span>
        <span className="nav-text">캘린더</span>
      </div>

      {/* 금융 리포트 탭 */}
      <div 
        className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`}
        onClick={() => handleTabClick('reports')}
      >
        <span className="nav-icon">📊</span>
        <span className="nav-text">금융 리포트</span>
      </div>
    </nav>
  );
};

export default BottomNavigation;
