import React, { useEffect, useState } from 'react';

const days = ['일', '월', '화', '수', '목', '금', '토'];

function formatTime(date: Date) {
  return date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

function formatDate(date: Date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = days[date.getDay()];
  return `${month}월 ${day}일 ${dayOfWeek}요일`;
}

const Clock: React.FC = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: 54, marginBottom: '1rem' }}>
      <div style={{ fontSize: 24 }}>{formatDate(now)}</div>
      <div style={{ fontSize: 80, fontWeight: 'bold', letterSpacing: '2px' }}>{formatTime(now)}</div>
    </div>
  );
};

export default Clock;
