import Clock from '../components/home/Clock';
import Widget from '../components/home/Widget';
import Notification, { type NotificationItem } from '../components/home/Notification';
import { useEffect, useState } from 'react';

const bgUrl = '/bg.jpg';

const allNotifications: NotificationItem[] = [
  { id: 1, app: 'T끌모아', message: '새 메시지가 도착했습니다.', time: '1분 전' },
  { id: 2, app: 'T끌모아', message: '새 메시지가 도착했습니다.', time: '10분 전' },
];

export default function HomePage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    allNotifications[1], // id:2만 먼저 보여줌
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotifications([allNotifications[0], allNotifications[1]]);
    }, 10000); // 10초 후 id:1 추가
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{ 
        minHeight: '100%',
        backgroundImage: `url(${bgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div style={{ width: '100%', maxWidth: 400 }}>
        <Clock />
        <Widget />
        <Notification notifications={notifications} />
      </div>
    </div>
  );
}