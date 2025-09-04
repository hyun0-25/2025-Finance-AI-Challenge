import React from 'react';
import { COLORS } from '../../styles/colors';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const [hoverIdx, setHoverIdx] = React.useState<number | null>(null);
  return (
    <div style={{ marginTop: '32px' }}>
      <div style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '8px' }}>알림센터</div>
      {notifications.map((n, idx) => (
        <div
          key={n.id}
          style={{
            background: hoverIdx === idx ? COLORS.accent : COLORS.main,
            borderRadius: '12px',
            padding: '16px',
            marginBottom: idx !== notifications.length - 1 ? '8px' : 0,
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
          onClick={() => navigate('/alarm')}
          onMouseEnter={() => setHoverIdx(idx)}
          onMouseLeave={() => setHoverIdx(null)}
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
