import React from 'react';
import { COLORS } from '../../styles/colors';

export interface NotificationItem {
  id: number;
  app: string;
  message: string;
  time: string;
}

interface NotificationProps {
  notifications: NotificationItem[];
}

const Notification: React.FC<NotificationProps> = ({ notifications }) => {
  return (
    <div style={{ marginTop: '32px' }}>
      <div style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '8px' }}>알림센터</div>
      {notifications.map((n, idx) => (
        <div
          key={n.id}
          style={{
            background: COLORS.main,
            borderRadius: '12px',
            padding: '16px',
            marginBottom: idx !== notifications.length - 1 ? '8px' : 0,
          }}
        >
          <div style={{ fontWeight: 500 }}>{n.app}</div>
          <div style={{ color: '#000000', fontSize: '15px' }}>{n.message}</div>
          <div style={{ color: '#000000', fontSize: '14px', marginTop: '3px' }}>{n.time}</div>
        </div>
      ))}
    </div>
  );
};

export default Notification;
