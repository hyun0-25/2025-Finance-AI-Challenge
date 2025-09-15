import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
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

interface ScheduleDetail {
  scheduleId: number;
  userId: string;
  scheduleStartDate: string;
  scheduleEndDate: string;
  scheduleFrequencyType: string;
  scheduleRepeatStartDate: string | null;
  scheduleRepeatEndDate: string | null;
  scheduleName: string;
  scheduleColor: string;
  scheduleIsChecklist: boolean;
  checklistItemResponseDtoList: ChecklistItem[];
}

interface ChecklistItem {
  checklistItemId: number;
  checklistItemName: string;
  checklistItemIsChecked: boolean;
}

const CalendarPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date()); // 오늘 날짜로 초기화
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [scheduleDetails, setScheduleDetails] = useState<{[key: number]: ScheduleDetail}>({});
  const [showModal, setShowModal] = useState(false);
  const [modalSchedule, setModalSchedule] = useState<ScheduleDetail | null>(null);
  const navigate = useNavigate();

  // 일정 상세 정보 가져오기
  const fetchScheduleDetail = async (scheduleId: number) => {
    try {
      console.log(`일정 상세 정보 요청: ${scheduleId}`);
      const response = await axios.get(`${API_BASE_URL}/schedules/${scheduleId}`);
      console.log('일정 상세 정보:', response.data);
      setScheduleDetails(prev => ({
        ...prev,
        [scheduleId]: response.data
      }));
    } catch (error) {
      console.error('일정 상세 정보 조회 실패:', error);
    }
  };

  // 날짜 선택 핸들러
  const handleDateClick = (date: Date) => {
    console.log(`클릭한 날짜: ${format(date, 'yyyy년 M월 d일')}`);
    setSelectedDate(date);
    
    // 선택된 날짜의 일정들을 가져와서 상세 정보 요청
    const dateSchedules = getSchedulesForDate(date);
    dateSchedules.forEach(schedule => {
      fetchScheduleDetail(schedule.scheduleId);
    });
  };

  // AI 체크리스트 활성화 API 호출
  const enableChecklist = async (scheduleId: number) => {
    try {
      console.log(`체크리스트 활성화 요청: ${scheduleId}`);
      await axios.put(`${API_BASE_URL}/schedules/${scheduleId}/on-off`, {
        enable: true
      });
      console.log('체크리스트 활성화 성공');
      // 활성화 후 상세 정보 다시 가져오기
      await fetchScheduleDetail(scheduleId);
    } catch (error) {
      console.error('체크리스트 활성화 실패:', error);
    }
  };

  // 일정 삭제 API 호출
  const deleteSchedule = async (scheduleId: number) => {
    try {
      console.log(`일정 삭제 요청: ${scheduleId}`);
      await axios.put(`${API_BASE_URL}/schedules/${scheduleId}`);
      console.log('일정 삭제 성공');
      // 삭제 후 일정 목록 다시 불러오기
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const response = await axios.get(`${API_BASE_URL}/calendars`, { params: { year, month } });
      const scheduleData = response.data.scheduleListResponseDtoList || [];
      setSchedules(scheduleData);
    } catch (error) {
      console.error('일정 삭제 실패:', error);
    }
  };

  // 일정 삭제 확인 핸들러
  const handleDeleteSchedule = (scheduleId: number, scheduleName: string) => {
    if (window.confirm(`"${scheduleName}" 일정을 삭제하시겠습니까?`)) {
      deleteSchedule(scheduleId);
    }
  };

  // AI 체크리스트 버튼 클릭 핸들러
  const handleChecklistClick = async (scheduleId: number) => {
    const detail = scheduleDetails[scheduleId];
    if (detail && detail.scheduleIsChecklist) {
      setModalSchedule(detail);
      setShowModal(true);
    } else {
      // 체크리스트가 비활성화된 경우 활성화 요청
      await enableChecklist(scheduleId);
    }
  };

  // 모달 닫기
  const closeModal = () => {
    setShowModal(false);
    setModalSchedule(null);
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
    <div className="calendar-page" 
      style={{ 
      height: '100vh',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* 달력 부분 */}
      <div style={{ flex: '0 0 auto' }}>
        <div className="calendar-header">{renderHeader()}</div>
        <div className="calendar-days">{renderDays()}</div>
        <div className="calendar-grid">{renderCells()}</div>
      </div>
      
      {/* 선택된 날짜의 일정 목록 - 남은 공간 차지 */}
      <div style={{ 
        padding: '15px 20px', 
        backgroundColor: '#fff', 
        borderTop: '1px solid #f0f0f0',
        position: 'relative',
        flex: '1 1 auto',
        overflow: 'auto'
      }}>
        <div style={{ 
          fontSize: '20px', 
          fontWeight: '600', 
          marginBottom: '12px',
          color: COLORS.black
        }}>
          {/* 선택된 날짜 표시 d. 요일 한글로 한글자만*/}
          {format(selectedDate, 'd. eee', { locale: ko })}
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
                      width: '4px',
                      height: '50px',
                      backgroundColor: schedule.scheduleColor || COLORS.main,
                      marginRight: '12px',
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      fontSize: '16px', 
                      color: COLORS.black,
                      fontWeight: '600',
                      lineHeight: '1.2',
                      marginBottom: '6px',
                      display: 'flex',
                      alignItems: 'center',
                    }}>
                      <span>{schedule.scheduleName}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteSchedule(schedule.scheduleId, schedule.scheduleName);
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: COLORS.gray,
                          fontSize: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        ×
                      </button>
                    </div>
                    <div style={{ 
                      fontSize: '14px', 
                      color: '#666',
                      fontWeight: '400',
                      lineHeight: '1.2',
                      marginLeft: '2px'
                    }}>
                      {(() => {
                        const startDate = new Date(schedule.scheduleStartDate);
                        const endDate = new Date(schedule.scheduleEndDate);
                        
                        // 같은 날인지 확인
                        const isSameDay = startDate.toDateString() === endDate.toDateString();
                        
                        if (isSameDay) {
                          // 같은 날이면 "m.d.요일" 형식
                          return format(startDate, 'M.d.eee', { locale: ko });
                        } else {
                          // 다른 날이면 "m.d.요일 - m.d.요일" 형식
                          return `${format(startDate, 'M.d.eee', { locale: ko })} - ${format(endDate, 'M.d.eee', { locale: ko })}`;
                        }
                      })()}
                    </div>
                  </div>
                </div>
                
                {/* AI 체크리스트 보기 버튼 - 항상 표시 */}
                <button
                  style={{
                    width: '143px',
                    height: '35px',
                    backgroundColor: scheduleDetails[schedule.scheduleId]?.scheduleIsChecklist 
                      ? COLORS.white 
                      : '#F5F5F5',
                    color: scheduleDetails[schedule.scheduleId]?.scheduleIsChecklist 
                      ? COLORS.sub 
                      : COLORS.gray,
                    border: scheduleDetails[schedule.scheduleId]?.scheduleIsChecklist 
                      ? `1px solid ${COLORS.main}` 
                      : '1px solid #E0E0E0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                  onClick={() => handleChecklistClick(schedule.scheduleId)}
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
      
      {/* AI 체크리스트 모달 */}
      {showModal && modalSchedule && (
        <div 
          style={{
            position: 'fixed',
            top: -200,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
          onClick={closeModal}
        >
          <div 
            style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              padding: '20px',
              width: '310px',
              height: '400px',
              overflow: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 모달 헤더 */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <div>
                <h3 style={{ 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  margin: 0,
                  color: COLORS.black
                }}>
                  AI 추천 체크리스트
                </h3>
                <p style={{ 
                  fontSize: '14px', 
                  color: COLORS.gray, 
                  margin: '4px 0 0 0'
                }}>
                  {modalSchedule.scheduleName} ({modalSchedule.checklistItemResponseDtoList.filter(item => item.checklistItemIsChecked).length}/{modalSchedule.checklistItemResponseDtoList.length})
                </p>
              </div>
              <button
                onClick={closeModal}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '32px',
                  cursor: 'pointer',
                  color: COLORS.gray,
                  padding: '0',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ×
              </button>
            </div>

            {/* 체크리스트 항목들 */}
            <div style={{ marginBottom: '20px' }}>
              {modalSchedule.checklistItemResponseDtoList.map((item, index) => (
                <div 
                  key={item.checklistItemId}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px 0',
                    borderBottom: index < modalSchedule.checklistItemResponseDtoList.length - 1 ? '1px solid #f0f0f0' : 'none'
                  }}
                >
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: item.checklistItemIsChecked ? COLORS.accent : '#f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '12px'
                  }}>
                    {item.checklistItemIsChecked && (
                      <span style={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}>✓</span>
                    )}
                  </div>
                  <span style={{ 
                    fontSize: '14px', 
                    color: item.checklistItemIsChecked ? COLORS.black : COLORS.gray,
                  }}>
                    {item.checklistItemName}
                  </span>
                </div>
              ))}
            </div>

            {/* AI 기능 추천 버튼 */}
            <button
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: COLORS.accent,
                color: COLORS.white,
                border: 'none',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
              onClick={() => {
                console.log('AI 기능 추천 실행');
                closeModal();
                navigate('/ai-card');
              }}
            >
              AI 카드 추천 받기
            </button>
          </div>
        </div>
      )}
      
      {/* 일정추가 버튼 - 컨테이너 내부 고정 */}
      <button 
        className="calendar-add-btn" 
        onClick={() => {
          console.log("selectedDate에 일정추가", selectedDate);
          navigate('/schedule-register', { 
            state: { selectedDate: selectedDate }
          });
        }} 
        aria-label="일정 등록"
        style={{ 
          position: 'absolute', 
          right: 20, 
          bottom: 150,
          width: 72, 
          height: 72, 
          borderRadius: '50%', 
          background: COLORS.sub, 
          color: COLORS.white, 
          fontSize: 50, 
          border: 'none', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          cursor: 'pointer',
          zIndex: 100
        }}
      >
        +
      </button>
    </div>
  );
};

export default CalendarPage;
