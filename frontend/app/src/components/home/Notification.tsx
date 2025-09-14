import React, { useState, useEffect } from 'react';
import { COLORS } from '../../styles/colors';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface NotificationItem {
  notificationId: number;
  userId: string;
  scheduleId: number;
  title: string;
  body: string;
}

const Notification: React.FC = () => {
  const navigate = useNavigate();
  const [hoverIdx, setHoverIdx] = React.useState<number | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [visibleNotifications, setVisibleNotifications] = useState<NotificationItem[]>([]);

  // 알림 데이터 가져오기
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/notifications`);
        console.log('알림 :', response.data);
        setNotifications(response.data || []);
      } catch (error) {
        console.error('알림 데이터 로딩 실패:', error);
        setNotifications([]);
      } finally {
      }
    };

    fetchNotifications();
  }, []);

  // 3초마다 알림 하나씩 추가 (쌓이는 방식)
  useEffect(() => {
    if (notifications.length === 0) return;

    // 첫 번째 알림 즉시 표시
    setVisibleNotifications([notifications[0]]);

    if (notifications.length <= 1) return;

    let currentIndex = 1;
    const interval = setInterval(() => {
      if (currentIndex < notifications.length) {
        setVisibleNotifications(prev => [...prev, notifications[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [notifications]);

  const handleNotificationClick = () => {
    navigate('/loading', { state: { notifications } });
  };

  return (
    <div style={{ marginTop: '32px' }}>
      <div style={{ 
        fontWeight: 'bold', 
        fontSize: '18px', 
        marginBottom: '8px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        알림
        {notifications.length > 0 && (
          <div style={{
            fontSize: '12px',
            color: COLORS.gray,
            fontWeight: 'normal'
          }}>
          </div>
        )}
      </div>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
      }}>
        {visibleNotifications.map((notification, idx) => (
          <div
            key={notification.notificationId}
            style={{
              background: hoverIdx === idx ? COLORS.accent : COLORS.main,
              borderRadius: '12px',
              padding: '12px',
              cursor: 'pointer',
              transition: 'background 0.2s',
              animation: 'slideIn 0.3s ease-out'
            }}
            onClick={handleNotificationClick}
            onMouseEnter={() => setHoverIdx(idx)}
            onMouseLeave={() => setHoverIdx(null)}
          >
            <div style={{ fontWeight: 500 }}>{notification.title}</div>
            <div style={{ color: '#000000', fontSize: '12px' }}>{notification.body}</div>
          </div>
        ))}
      </div>
      
      <style>
        {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Notification;
