import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { COLORS } from '../styles/colors';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 추천 응답 인터페이스
interface UserCardRecommend {
  cardId: number;
  recommendContent: string;
}

interface NewCardRecommend {
  cardId: number;
  recommendContent: string;
}

interface RecommendResponse {
  userCardRecommend: UserCardRecommend[];
  newCardRecommend: NewCardRecommend[];
}

const AiCardRecommendPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [recommendData, setRecommendData] = useState<RecommendResponse | null>(null);

  // 카드 데이터 가공 함수
  const getProcessedCards = () => {
    if (recommendData?.newCardRecommend && recommendData.newCardRecommend.length > 0) {
      return recommendData.newCardRecommend.map(card => {
        const content = card.recommendContent;
        // "발급 후 이용 시" 앞까지를 name으로 추출
        const nameMatch = content.match(/^(.+?)\s발급 후 이용 시/);
        const name = nameMatch ? nameMatch[1] : `카드 ID ${card.cardId}`;
        
        // "발급 후 이용 시" 다음부터 "을 받을 수 있어요!" 앞까지를 tags로 추출
        const tagsMatch = content.match(/발급 후 이용 시\s(.+?)\s혜택을 받을 수 있어요!/);
        const tags = tagsMatch ? tagsMatch[1] : "";
        
        return {
          img: `/src/assets/cards/${card.cardId}.png`,
          name: name,
          tags: tags
        };
      });
    }
    
    // 기본 카드 데이터 (API 데이터가 없을 때)
    return [
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
  };

  // 가공된 카드 데이터
  const cards = getProcessedCards();

  const handleIndicatorClick = (index: number) => {
    setCurrentCardIndex(index);
  };

  // 추천 데이터 가져오기
  const fetchRecommendations = async (scheduleId: number) => {
    try {
      console.log(`카드 추천 요청: scheduleId=${scheduleId}`);
      const response = await axios.post(`${API_BASE_URL}/schedules/${scheduleId}/recommend`);
      console.log('카드 추천 응답:', response.data);
      setRecommendData(response.data);
    } catch (error) {
      console.error('카드 추천 요청 실패:', error);
    }
  };

  // 페이지 로딩 및 데이터 요청
  useEffect(() => {
    const scheduleId = location.state?.scheduleId;
    
    if (scheduleId) {
      console.log('전달받은 scheduleId:', scheduleId);
      fetchRecommendations(scheduleId);
    } else {
      console.log('scheduleId가 전달되지 않음');
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [location.state]);

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
              src={
                recommendData?.userCardRecommend?.[0]?.cardId 
                  ? `/src/assets/cards/${recommendData.userCardRecommend[0].cardId}.png`
                  : "/public/card-img.png"
              }
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
                fontSize: 16, 
                color: COLORS.black,
                width: 220
              }}>
                {recommendData?.userCardRecommend?.[0]?.recommendContent || 
                 "여행에 필요한 비행기 할인 / 마일리지 30% 혜택이 있는 좋은 카드입니다!"}
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
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  fontSize: 14, 
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