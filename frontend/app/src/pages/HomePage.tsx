import Clock from '../components/home/Clock';
import Widget from '../components/home/Widget';
import Notification from '../components/home/Notification';

const bgUrl = '/bg.png';

export default function HomePage() {
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
        <Notification />
      </div>
    </div>
  );
}