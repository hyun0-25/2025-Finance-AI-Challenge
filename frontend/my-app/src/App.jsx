import React, { useState } from 'react';
import './App.css';
import Calendar from './components/calendar/Calendar';
import MonthlyExpenseList from './components/calendar/MonthlyExpenseList';
import ScheduleForm from './components/schedule/ScheduleForm';
import AIChecklist from './components/schedule/AIChecklist';
import BottomNavigation from './components/common/BottomNavigation';
import SettingsPage from './pages/cards/SettingsPage';

/**
 * App 컴포넌트
 *
 * 메인 애플리케이션 컴포넌트로, 네비게이션과 페이지 라우팅을 관리합니다.
 * 캘린더, 일정 등록, AI 체크리스트 등의 상태를 관리합니다.
 *
 * @returns {JSX.Element} 메인 애플리케이션 컴포넌트
 */
function App() {
  const [activeTab, setActiveTab] = useState('calendar');
  const [selectedDate, setSelectedDate] = useState(null);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [showAIChecklist, setShowAIChecklist] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState(null);
  const [schedules, setSchedules] = useState([]);

  /**
   * 날짜가 선택되었을 때 호출되는 핸들러입니다.
   * 일정 등록 폼을 표시하고 AI 체크리스트를 숨깁니다.
   *
   * @param {string} date - 선택된 날짜 (YYYY-MM-DD 형식)
   */
  const handleDateSelect = (date) => {
    if (selectedDate === date) {
      setSelectedDate(null);
      setShowScheduleForm(false);
      setShowAIChecklist(false);
    } else {
      setSelectedDate(date);
      setShowScheduleForm(true);
      setShowAIChecklist(false);
    }
  };

  /**
   * 일정이 등록되었을 때 호출되는 핸들러입니다.
   * 일정을 저장하고 AI 체크리스트를 표시합니다.
   *
   * @param {Object} schedule - 등록된 일정 객체
   */
  const handleScheduleSubmit = (schedule) => {
    setSchedules(prev => [...prev, schedule]);
    setCurrentSchedule(schedule);
    setShowScheduleForm(false);
    setShowAIChecklist(true);
  };

  /**
   * 일정 등록이 취소되었을 때 호출되는 핸들러입니다.
   * 폼을 숨기고 선택된 날짜를 초기화합니다.
   */
  const handleScheduleCancel = () => {
    setShowScheduleForm(false);
    setSelectedDate(null);
  };

  /**
   * AI 체크리스트가 닫혔을 때 호출되는 핸들러입니다.
   * 체크리스트와 관련 상태를 초기화합니다.
   */
  const handleCloseChecklist = () => {
    setShowAIChecklist(false);
    setCurrentSchedule(null);
    setSelectedDate(null);
  };

  /**
   * 캘린더 페이지의 내용을 렌더링합니다.
   * 현재 상태에 따라 캘린더, 일정 등록 폼, AI 체크리스트를 표시합니다.
   *
   * @returns {JSX.Element} 캘린더 페이지 내용
   */
  const renderCalendarContent = () => {
    return (
      <>
        <Calendar onDateSelect={handleDateSelect} />
        {showScheduleForm && (
          <ScheduleForm
            selectedDate={selectedDate}
            onSubmit={handleScheduleSubmit}
            onCancel={handleScheduleCancel}
          />
        )}
        {showAIChecklist && currentSchedule && (
          <AIChecklist
            schedule={currentSchedule}
            onClose={handleCloseChecklist}
          />
        )}
        {!showScheduleForm && !showAIChecklist && (
          <MonthlyExpenseList
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
          />
        )}
      </>
    );
  };

  /**
   * 현재 활성 탭에 따라 적절한 콘텐츠를 렌더링합니다.
   *
   * @returns {JSX.Element} 현재 탭에 해당하는 콘텐츠
   */
  const renderContent = () => {
    switch (activeTab) {
      case 'mycards':
        return <SettingsPage />;
      case 'calendar':
        return renderCalendarContent();
      case 'reports':
        return (
          <div className="page-content">
            <h2>나의 금융 리포트</h2>
            <p>리포트 페이지입니다.</p>
          </div>
        );
      default:
        return <SettingsPage />;
    }
  };

  return (
    <div className="App">
      <main className="App-main">
        {renderContent()}
      </main>

      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
}

export default App;