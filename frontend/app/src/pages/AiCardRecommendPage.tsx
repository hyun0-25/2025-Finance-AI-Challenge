import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { COLORS } from '../styles/colors';

const AiCardRecommendPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // 카드 데이터
  const cards = [
    {
      img: "/public/card-img.png",
      name: "A카드입니다",
      tags: "#국내숙소 #국내교통 #할인"
    },
    {
      img: "/public/card-img.png",
      name: "B카드입니다", 
      tags: "#해외여행 #항공 #호텔"
    },
    {
      img: "/public/card-img.png",
      name: "C카드입니다",
      tags: "#쇼핑 #온라인 #적립"
    }
  ];

  const handleIndicatorClick = (index: number) => {
    setCurrentCardIndex(index);
  };

  // 페이지 로딩 효과
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // 로딩 화면
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#fff'
      }}>
        {/* 스피너 */}
        <div style={{
          width: '40px',
          height: '40px',
          border: `4px solid #f3f3f3`,
          borderTop: `4px solid ${COLORS.main}`,
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        
        <div style={{
          marginTop: 16,
          fontSize: 16,
          color: COLORS.black,
          fontWeight: 500
        }}>
          AI가 카드를 추천중입니다...
        </div>

        {/* CSS 애니메이션 */}
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ 
      maxHeight: '100vh', 
    }}>
      {/* 상단 바 */}
      <div style={{ display: 'flex', alignItems: 'center', marginTop: 60 }}>
        <button 
          onClick={() => navigate('/calendar')} 
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

      {/* 페이지 제목 */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        marginBottom: 16,
        marginTop: 32
      }}>
        <div style={{ 
          fontWeight: 700, 
          fontSize: 24, 
          marginBottom: 8,
          textAlign: 'center'
        }}>
          <span style={{ color: COLORS.accent }}>내가 가진 카드로</span>{' '}
          <span style={{ color: COLORS.black }}>혜택 받기</span>
        </div>
      </div>

      {/* 카드 추천 박스 */}
      <div style={{ 
        width: 379, 
        margin: '0 auto', 
        padding: '0 16px',
        marginBottom: 34
      }}>
        <div style={{
          backgroundColor: COLORS.light,
          borderRadius: 24,
          padding: 20,
          display: 'flex',
          alignItems: 'center',
          position: 'relative'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <img 
              src="/public/card-img.png" 
              alt="카드" 
              style={{ 
                width: '83px', 
                height: '131px',
                marginRight: 16,
                borderRadius: 4
              }} 
            />
            <div>
              <div style={{ 
                fontSize: 20, 
                fontWeight: 700, 
                color: COLORS.black,
                marginBottom: 4
              }}>
                내 카드
              </div>
              <div style={{ 
                fontSize: 18, 
                color: COLORS.black,
                // 글자사이에 높이 줄이기
                lineHeight: 1.2,
                marginBottom: 12
              }}>
                여행에 필요한 교통 할인이<br/>
                좋은 카드입니다!
              </div>
              <div style={{ 
                fontSize: 16, 
                // 연한 그레이색
                color: "#888",
                // 한줄에 끝나게
                whiteSpace: 'nowrap', 
                overflow: 'hidden', 
                textOverflow: 'ellipsis'
              }}>
                비행기 할인 / 마일리지 30% 어쩌고
              </div>
            </div>
          </div>
          
          {/* 화살표 아이콘 - 독립적으로 고정 */}
          <button
            onClick={() => navigate('/mypage')}
            style={{
              position: 'absolute',
              right: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              alignItems: 'center',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0
            }}
          >
            <img 
              src="/src/assets/icons/right.png" 
              alt="오른쪽 화살표" 
              style={{ 
                width: '16px', 
                height: '28px' 
              }} 
            />
          </button>
        </div>
      </div>

      {/* 구분선 */}
      <div style={{
        width: '100%',
        height: '4px',
        backgroundColor: '#E0E0E0',
        marginBottom: 32
      }}></div>

      {/* 새로운 카드로 혜택 들리기 섹션 */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        marginBottom: 32
      }}>
        <div style={{ 
          fontWeight: 700, 
          fontSize: 28, 
          marginBottom: 24,
          textAlign: 'center'
        }}>
          <span style={{ color: COLORS.accent }}>새로운 카드로</span><br/>
          <span style={{ color: COLORS.black }}>혜택 늘리기</span>
        </div>
        
        {/* 카드 슬라이더 */}
        <div style={{
          marginBottom: 16,
          position: 'relative',
          width: '170px',
          height: '200px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          margin: '0 auto'
        }}>
          {/* 원형 배경 */}
          <div style={{
            position: 'absolute',
            width: '170px',
            height: '170px',
            borderRadius: '50%',
            backgroundColor: COLORS.main,
            zIndex: 0
          }}></div>
          
          {/* 카드 컨테이너 */}
          <div style={{
            display: 'flex',
            transition: 'transform 0.4s ease-in-out',
            transform: `translateX(${-currentCardIndex * 170}px)`,
            position: 'relative',
            zIndex: 1,
            width: `${cards.length * 170}px`,
            left: 0
          }}>
            {cards.map((card, index) => (
              <div 
                key={index} 
                style={{
                  width: '170px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <img 
                  src={card.img}
                  alt={`추천 카드 ${index + 1}`} 
                  style={{ 
                    width: '108px', 
                    height: '172px',
                    borderRadius: 4
                  }} 
                />
              </div>
            ))}
          </div>
        </div>

        {/* 카드 정보 슬라이더 */}
        <div style={{
          width: '300px',
          overflow: 'hidden',
          marginBottom: 16,
          margin: '0 auto 16px auto'
        }}>
          <div style={{
            display: 'flex',
            transition: 'transform 0.4s ease-in-out',
            transform: `translateX(-${currentCardIndex * 300}px)`
          }}>
            {cards.map((card, index) => (
              <div 
                key={index}
                style={{
                  width: '300px',
                  textAlign: 'center',
                  flexShrink: 0
                }}
              >
                <div style={{ 
                  fontSize: 20, 
                  fontWeight: 700, 
                  color: COLORS.black,
                  marginBottom: 8
                }}>
                  {card.name}
                </div>
                <div style={{ 
                  fontSize: 16, 
                  color: COLORS.black
                }}>
                  {card.tags}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 페이지 인디케이터 */}
        <div style={{
          display: 'flex',
          gap: 16,
        }}>
          {cards.map((_, index) => (
            <div 
              key={index}
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: index === currentCardIndex ? COLORS.black : '#E0E0E0',
                cursor: 'pointer'
              }}
              onClick={() => handleIndicatorClick(index)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AiCardRecommendPage;