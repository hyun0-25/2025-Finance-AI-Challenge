import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { COLORS } from '../styles/colors';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface NotificationItem {
  notificationId: number;
  userId: string;
  scheduleId: number;
  title: string;
  body: string;
}

export default function AlarmPage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  // 알림 데이터 가져오기
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/notifications`);
        console.log('알림API 응답:', response.data);
        setNotifications(response.data || []);
      } catch (error) {
        console.error('알림API 실패:', error);
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div style={{ background: '#fff', maxHeight: '100vh', padding: 0 }}>
      {/* 상단 바 */}
      <div style={{ display: 'flex', alignItems: 'center', borderTop: '1px solid #eee', marginTop: 60 }}>
        <button 
          onClick={() => navigate('/mypage')} 
          style={{ 
            background: 'none', 
            border: 'none',
            marginTop: 12,
            marginLeft: 12,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <img 
            src="/src/assets/icons/back.png" 
            alt="뒤로가기" 
            style={{ 
              width: '16px', 
              height: '24px' 
            }} 
          />
        </button>
      </div>
      
      {/* 알림 목록 */}
      <div style={{ padding: '24px 20px 0 20px' }}>
        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 20}}>
          지난 알림
        </div>
        
        {loading ? (
          <div style={{ 
            color: COLORS.gray, 
            textAlign: 'center', 
            margin: '32px 0',
            padding: '40px 0'
          }}>
            알림을 불러오는 중...
          </div>
        ) : notifications.length === 0 ? (
          <div style={{ 
            color: '#aaa', 
            textAlign: 'center', 
            margin: '32px 0',
            padding: '40px 0'
          }}>
            새로운 알림이 없습니다.
          </div>
        ) : (
          notifications.map((notification, idx) => (
            <div 
              key={notification.notificationId} 
              onClick={() => {
                // 첫 번째 알림을 클릭하면 /reports 페이지로 이동
                if (idx === 0) {
                  navigate('/reports');
                }
              }}
              onMouseEnter={() => setHoverIdx(idx)}
              onMouseLeave={() => setHoverIdx(null)}
              style={{ 
                background: hoverIdx === idx ? COLORS.light : COLORS.white,
                borderRadius: 12, 
                padding: 16, 
                marginBottom: 12, 
                boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
                cursor: idx === 0 ? 'pointer' : 'default',
                transition: 'background 0.2s ease'
              }}
            >
              <div style={{ fontWeight: 600, fontSize: 16 }}>{notification.title} </div>
              <div style={{ color: '#222', fontSize: 15, margin: '6px 0' }}>{notification.body}</div>
              <div style={{ color: '#888', fontSize: 13 }}>
              </div>
            </div>
          ))
        )}
      </div>
      {/* 광고 섹션 */}
      <div style={{ padding: '32px 20px 0 20px' }}>
        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 16 }}>광고</div>
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: 20, marginBottom: 24, position: 'relative' }}>
          <span style={{ position: 'absolute', left: 16, top: 16, fontSize: 22, color: '#339DFF' }}>📢</span>
          <div style={{ fontWeight: 700, fontSize: 16, marginLeft: 32 }}>(광고) T끌모아 <span style={{ position: 'absolute', right: 20, top: 16, fontSize: 20, color: '#bbb', cursor: 'pointer' }}>×</span></div>
          <div style={{ color: '#222', fontSize: 15, margin: '8px 0 0 32px' }}>
            6팀 선정! 공모전 상금 1,500만원 받을 마지막 기회! 놓치지 마세요! ※ 수신거부 : 더보기 &gt; 설정
          </div>
          <div style={{ color: '#888', fontSize: 13, marginLeft: 32, marginTop: 8 }}>9월 5일</div>
        </div>
      </div>
    </div>
  );
}
