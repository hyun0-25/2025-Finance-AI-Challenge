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
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    axios.get(`${API_BASE_URL}/calendars`, { params: { year, month } })
      .then(res => setSchedules(res.data.scheduleListResponseDtoList || []));
  }, [currentDate]);

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
        days.push(
          <div key={day.toString()} style={{ flex: 1, minHeight: 60, padding: 0, background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', border: 'none', color: isCurrentMonth ? (isSunday ? '#E74C3C' : '#222') : '#bbb', fontWeight: isToday ? 700 : 400, fontSize: 17, position: 'relative' }}>
            <div style={{width: 'auto', height: 76, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              {formattedDate}
            </div>
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
    <div className="calendar-page">
      <div style={{height: 580}}>
        <div className="calendar-header">{renderHeader()}</div>
        <div className="calendar-days">{renderDays()}</div>
        <div className="calendar-grid">{renderCells()}</div>
      </div>
      <button className="calendar-add-btn" onClick={() => navigate('/schedule-register') } aria-label="일정 등록"
        style={{ position: 'absolute', right: 20, bottom: 180, width: 64, height: 64, borderRadius: '50%', background: COLORS.main, color: COLORS.white, fontSize: 38, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        >+</button>
    </div>
  );
};

export default CalendarPage;
