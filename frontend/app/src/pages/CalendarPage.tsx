import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { COLORS } from '../styles/colors';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface Schedule {
  scheduleId: number;
  scheduleStartDate: string;
  scheduleEndDate: string;
  scheduleName: string;
  scheduleColor: string;
}

const CalendarPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date()); // 오늘 날짜로 초기화
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const navigate = useNavigate();

  // 날짜 선택 핸들러
  const handleDateClick = (date: Date) => {
    console.log(`클릭한 날짜: ${format(date, 'yyyy년 M월 d일')}`);
    setSelectedDate(date);
  };

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // API에서 월은 1부터 시작
    console.log(`API 요청: ${year}년 ${month}월 일정 조회`);
    axios.get(`${API_BASE_URL}/calendars`, { params: { year, month } })
      .then(res => {
        const scheduleData = res.data.scheduleListResponseDtoList || [];
        console.log('API 응답 데이터:', scheduleData);
        setSchedules(scheduleData);
      })
      .catch(err => {
        console.error('일정 조회 실패:', err);
      });
  }, [currentDate]);

  // 특정 날짜에서 시작하는 일정만 가져오기 (막대 표시용)
  const getSchedulesStartingOnDate = (date: Date) => {
    return schedules.filter(schedule => {
      const startDate = parseISO(schedule.scheduleStartDate);
      return isSameDay(date, startDate);
    });
  };

  // 특정 날짜에 일정이 있는지 확인하는 함수 (선택된 날짜 일정 목록용)
  const getSchedulesForDate = (date: Date) => {
    const filtered = schedules.filter(schedule => {
      // 시간 부분을 제거하고 날짜만 비교
      const startDate = new Date(parseISO(schedule.scheduleStartDate));
      startDate.setHours(0, 0, 0, 0);
      
      const endDate = new Date(parseISO(schedule.scheduleEndDate));
      endDate.setHours(23, 59, 59, 999);
      
      const compareDate = new Date(date);
      compareDate.setHours(12, 0, 0, 0); // 정오로 설정
      
      const isInRange = compareDate >= startDate && compareDate <= endDate;
      return isInRange;
    });
    
    return filtered;
  };

  // 선택된 날짜의 일정 목록 가져오기
  const selectedDateSchedules = getSchedulesForDate(selectedDate);

  const renderHeader = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', margin: '60px 0 20px 0' }}>
      <span style={{ position: 'absolute', left: 20, top: '30%', transform: 'translateY(-50%)', cursor: 'pointer' }} onClick={() => setCurrentDate(subMonths(currentDate, 1))}>
        <span style={{ fontSize: 40, color: COLORS.gray, userSelect: 'none' }}>‹</span>
      </span>
      <span style={{ fontWeight: 700, fontSize: 22 }}>{format(currentDate, 'yyyy년 M월')}</span>
      <span style={{ position: 'absolute', right: 20, top: '30%', transform: 'translateY(-50%)', cursor: 'pointer' }} onClick={() => setCurrentDate(addMonths(currentDate, 1))}>
        <span style={{ fontSize: 40, color: COLORS.gray, userSelect: 'none' }}>›</span>
      </span>
    </div>
  );

  const renderDays = () => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return (
      <div style={{ display: 'flex', marginBottom: 20 }}>
        {days.map((day, idx) => (
          <div key={day} style={{ flex: 1, textAlign: 'center', fontWeight: 600, fontSize: 20, color: idx === 0 ? '#FF0000' : COLORS.black }}>{day}</div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isSunday = day.getDay() === 0;
        const isToday = isSameDay(day, new Date());
        const isSelected = isSameDay(day, selectedDate);
        const startingSchedules = getSchedulesStartingOnDate(day);
        const currentDay = new Date(day);
        
        days.push(
          <div 
            key={day.toString()} 
            style={{ 
              flex: 1,
              // 달력 높이
              minHeight: 60, 
              padding: '2px', 
              background: isSelected ? COLORS.light : '#fff',
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              border: 'none', 
              color: isCurrentMonth ? (isSunday ? '#E74C3C' : '#222') : '#bbb', 
              fontWeight: isToday ? 700 : 400, 
              fontSize: 17, 
              position: 'relative',
              cursor: 'pointer'
            }}
            onClick={() => handleDateClick(currentDay)}
          >
            <div style={{width: 'auto', height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              {formattedDate}
            </div>
            {/* 일정 표시 - 시작일 기준 점으로만 표시 */}
            {startingSchedules.length > 0 && (
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap',
                gap: 2, 
                marginTop: 2,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                {startingSchedules.slice(0, 3).map((schedule, idx) => (
                  <div
                    key={`${schedule.scheduleId}-${idx}`}
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      backgroundColor: schedule.scheduleColor || COLORS.main
                    }}
                  />
                ))}
                {/* 일정이 3개 이상일 때 작은 점으로 표시 */}
                {startingSchedules.length > 3 && (
                  <div style={{
                    fontSize: 8,
                    color: COLORS.gray
                  }}>
                    +{startingSchedules.length - 3}
                  </div>
                )}
              </div>
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(<div key={day.toString()} style={{ display: 'flex', marginBottom: 2 }}>{days}</div>);
      days = [];
    }
    return <div>{rows}</div>;
  };


  return (
    <div className="calendar-page" style={{ position: 'relative', maxHeight: '100vh' }}>
      <div>
        <div className="calendar-header">{renderHeader()}</div>
        <div className="calendar-days">{renderDays()}</div>
        <div className="calendar-grid">{renderCells()}</div>
      </div>
      
      {/* 선택된 날짜의 일정 목록 */}
      <div style={{ 
        padding: '15px 20px', 
        backgroundColor: '#fff', 
        borderTop: '1px solid #f0f0f0',
        position: 'relative',
        minHeight: '200px'
}}>
        <div style={{ 
          fontSize: '16px', 
          fontWeight: '600', 
          marginBottom: '12px',
          color: COLORS.black
        }}>
          {/* 선택된 날짜 표시 d. 요일 한글로 */}
          {format(selectedDate, 'd. eeee')}
        </div>
        
        {selectedDateSchedules.length > 0 ? (
          <div>
            {selectedDateSchedules.map((schedule, index) => (
              <div 
                key={`selected-${schedule.scheduleId}-${index}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 0',
                  borderBottom: index < selectedDateSchedules.length - 1 ? '1px solid #f0f0f0' : 'none',
                  backgroundColor: '#fff'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  <div 
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: schedule.scheduleColor || COLORS.main,
                      marginRight: '12px',
                      flexShrink: 0
                    }}
                  />
                  <span style={{ 
                    fontSize: '15px', 
                    color: COLORS.black,
                    fontWeight: '500'
                  }}>
                    {schedule.scheduleName}
                  </span>
                </div>
                
                {/* AI 체크리스트 보기 버튼 */}
                <button
                  style={{
                    padding: '6px 12px',
                    backgroundColor: COLORS.accent,
                    color: COLORS.white,
                    border: 'none',
                    borderRadius: '15px',
                    fontSize: '11px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    fontWeight: '500'
                  }}
                  onClick={() => {
                    console.log(`${schedule.scheduleName}의 AI 체크리스트 보기`);
                  }}
                >
                  AI 체크리스트 보기
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ 
            color: COLORS.gray, 
            fontSize: '14px',
            textAlign: 'center',
            marginTop: '20px',
            padding: '20px 0'
          }}>
            일정이 없습니다.
          </div>
        )}
      </div>
      
      <button 
        className="calendar-add-btn" 
        onClick={() => navigate('/schedule-register')} 
        aria-label="일정 등록"
        style={{ 
          position: 'absolute', 
          right: 20, 
          bottom: 0, 
          width: 64, 
          height: 64, 
          borderRadius: '50%', 
          background: COLORS.main, 
          color: COLORS.white, 
          fontSize: 38, 
          border: 'none', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          cursor: 'pointer',
          zIndex: 1000
        }}
      >
        +
      </button>
    </div>
  );
};

export default CalendarPage;
