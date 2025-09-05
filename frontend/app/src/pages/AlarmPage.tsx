import { useLocation, useNavigate } from 'react-router-dom';
import { type NotificationItem } from '../components/home/Notification';
import { useState } from 'react';
import { COLORS } from '../styles/colors';

export default function AlarmPage() {
  const location = useLocation();
  const navigate = useNavigate();
  // 알림 목록을 location.state로 전달받음
  const notifications: NotificationItem[] = (location.state?.notifications || []);

  // 최근 도착한 알림 최대 3개
  const recentNotifications = notifications.slice(0, 3);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  return (
    <div style={{ background: '#fff', maxHeight: '100vh', padding: 0 }}>
      {/* 상단 바 */}
      <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #eee', marginTop:60}}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', fontSize: 28, marginLeft: 12, cursor: 'pointer' }}>←</button>
        <div style={{ flex: 1, textAlign: 'center', fontWeight: 500, fontSize: 20, marginRight: 40 }}>알림</div>
      </div>
      {/* 최근 도착한 알림 */}
      <div style={{ padding: '24px 20px 0 20px' }}>
        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 20}}>최근 도착한 알림</div>
        {recentNotifications.length === 0 ? (
          <div style={{ color: '#aaa', textAlign: 'center', margin: '32px 0' }}>새로운 알림이 없습니다.</div>
        ) : (
          recentNotifications.map((n, idx) => (
            <div 
              key={n.id} 
              onClick={() => {
                // 첫 번째 알림(idx === 0)을 클릭하면 /reports 페이지로 이동합니다.
                if (idx === 0) {
                  navigate('/reports');
                }
              }}
              onMouseEnter={() => setHoverIdx(idx)}
              onMouseLeave={() => setHoverIdx(null)}
              style={{ 
                background: hoverIdx === idx ? COLORS.accent : COLORS.light,
                borderRadius: 12, 
                padding: 16, 
                marginBottom: 12, 
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                cursor: idx === 0 ? 'pointer' : 'default'
              }}
            >
              <div style={{ fontWeight: 600, fontSize: 16 }}>{n.app}</div>
              <div style={{ color: '#222', fontSize: 15, margin: '6px 0' }}>{n.message}</div>
              <div style={{ color: '#888', fontSize: 13 }}>{n.time}</div>
            </div>
          ))
        )}
      </div>
      {/* 광고 섹션 */}
      <div style={{ padding: '32px 20px 0 20px' }}>
        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 16 }}>광고</div>
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: 20, marginBottom: 24, position: 'relative' }}>
          <span style={{ position: 'absolute', left: 16, top: 16, fontSize: 22, color: '#339DFF' }}>📢</span>
          <div style={{ fontWeight: 700, fontSize: 16, marginLeft: 32 }}>(광고) T 모여 <span style={{ position: 'absolute', right: 20, top: 16, fontSize: 20, color: '#bbb', cursor: 'pointer' }}>×</span></div>
          <div style={{ color: '#222', fontSize: 15, margin: '8px 0 0 32px' }}>
            500명 추첨! OOO 받을 마지막 기회! 놓치지 마세요! ※ 수신거부 : 더보기 &gt; 설정
          </div>
          <div style={{ color: '#888', fontSize: 13, marginLeft: 32, marginTop: 8 }}>9월 5일</div>
        </div>
      </div>
    </div>
  );
}
