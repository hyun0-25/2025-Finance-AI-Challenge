import React, { useState, useEffect } from 'react';
import { COLORS } from '../styles/colors';
import { useNavigate, useLocation } from 'react-router-dom';

const LoadingPage: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const notifications = location.state?.notifications || [];

  useEffect(() => {
    const timer1 = setTimeout(() => setProgress(33), 400);
    const timer2 = setTimeout(() => setProgress(67), 900);
    const timer3 = setTimeout(() => setProgress(100), 1400);
    const timer4 = setTimeout(() => {
      navigate('/alarm', { state: { notifications } });
    }, 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [navigate, notifications]);

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      animation: 'fadeIn 0.3s ease-out'
    }}>
      {/* 로딩 텍스트 */}
      <div style={{
        fontSize: '20px',
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: '40px',
        textAlign: 'center'
      }}>
        <div>앱에 접속하는 중...</div>
        <div style={{
          fontSize: '14px',
          color: COLORS.gray,
          fontWeight: 'normal',
          marginTop: '8px'
        }}>
          잠시만 기다려주세요
        </div>
      </div>

      {/* 프로그레스 바 컨테이너 */}
      <div style={{
        width: '280px',
        height: '12px',
        backgroundColor: '#f0f0f0',
        borderRadius: '6px',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
      }}>
        {/* 프로그레스 바 */}
        <div style={{
          width: `${progress}%`,
          height: '100%',
          background: `linear-gradient(90deg, ${COLORS.accent}, #0056CC)`,
          borderRadius: '6px',
          transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          boxShadow: '0 2px 8px rgba(0, 122, 255, 0.3)'
        }}>
          {/* 반짝이는 효과 */}
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '30px',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
            animation: progress > 0 && progress < 100 ? 'shimmer 2s infinite' : 'none'
          }} />
        </div>
      </div>

      {/* 프로그레스 퍼센티지 */}
      <div style={{
        marginTop: '16px',
        fontSize: '16px',
        color: COLORS.black,
        fontWeight: '500'
      }}>
        {progress}%
      </div>

      {/* 애니메이션 스타일 */}
      <style>
        {`
          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
            100% {
              transform: translateX(150%);
              opacity: 0;
            }
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
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

export default LoadingPage;