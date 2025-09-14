import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { COLORS } from '../styles/colors';
import NavigationBar from '../layouts/NavigationBar';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 보유 카드 인터페이스
interface UserCard {
  userCardId: number;
  userId: string;
  cardId: number;
  userCardNumber: string;
  userCardIsInternational: boolean;
  userCardSettlementDate: string;
}

// 카드 상세 정보 인터페이스
interface CardDetail {
  cardId: number;
  cardName: string;
  cardCategory: string;
  cardAnnualFeeDomestic: number;
  cardAnnualFeeInternational: number;
  benefitListResponseDtoList: CardBenefit[];
}

// 카드 혜택 인터페이스
interface CardBenefit {
  benefitCategoryAndBenefitInfo: string;
  benefitContent: string;
}

const MyPage: React.FC = () => {
  const [userCards, setUserCards] = useState<UserCard[]>([]);
  const [cardDetails, setCardDetails] = useState<{[key: number]: CardDetail}>({});
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('마이페이지 접속');
    fetchUserCards();
  }, []);

  // 보유 카드 목록 조회
  const fetchUserCards = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/cards`);
      console.log('보유 카드 목록 조회', response.data);
      setUserCards(response.data);
      setLoading(false);
      
      // 각 카드의 상세 정보도 미리 로드
      response.data.forEach((card: UserCard) => {
        fetchCardDetail(card.cardId);
      });
    } catch (error) {
      console.error('보유 카드 목록 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  // 카드 상세 정보 조회
  const fetchCardDetail = async (cardId: number) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/cards/${cardId}`);
      console.log(`카드 상세 정보 조회 - cardId: ${cardId}:`, response.data);
      setCardDetails(prev => ({
        ...prev,
        [cardId]: response.data
      }));
    } catch (error) {
      console.error(`카드 상세 정보 조회 실패 - cardId: ${cardId}:`, error);
    }
  };

  // 카드 확장/축소 토글
  const toggleCardExpansion = (cardId: number) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  // 카드 번호 마스킹 처리
  const maskCardNumber = (cardNumber: string) => {
    const parts = cardNumber.split('-');
    if (parts.length === 4) {
      return `${parts[0]}-****-****-${parts[3]}`;
    }
    return cardNumber;
  };

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  // 알림 페이지로 이동
  const goToAlarmPage = () => {
    console.log('알림 페이지로 이동');
    navigate('/alarm');
  };

  return (
    <div style={{ 
      height: '100vh',
      position: 'relative',
    }}>
      {/* 헤더 */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '60px 20px 20px 20px',
        backgroundColor: COLORS.white,
        borderBottom: '1px solid #f0f0f0'
      }}>
        <h1 style={{
          fontSize: '20px',
          fontWeight: '600',
          color: COLORS.black,
          margin: 0,
          marginLeft: '30px',
          flex: 1,
          textAlign: 'center'
        }}>
          마이페이지
        </h1>
        
        {/* 알림 버튼 */}
        <button
          onClick={goToAlarmPage}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            color: COLORS.gray,
            padding: '8px',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-label="알림"
        >
          🔔
        </button>
      </div>

      {/* 메인 컨텐츠 영역 */}
      <div style={{ 
        padding: '0 20px',
        overflowY: 'auto',
      }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: '600',
          color: COLORS.black,
          marginBottom: '16px'
        }}>
          내 카드 ({userCards.length}개)
        </h2>

        {loading ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '60px 40px',
            color: COLORS.gray
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: `3px solid ${COLORS.light}`,
              borderTop: `3px solid ${COLORS.main}`,
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              marginBottom: '16px'
            }} />
            <div style={{ fontSize: '16px' }}>
              카드 목록을 불러오는 중...
            </div>
            <style>
              {`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}
            </style>
          </div>
        ) : userCards.length === 0 ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px 40px',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '20px'
            }}>
              💳
            </div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: COLORS.black,
              marginBottom: '8px'
            }}>
              등록된 카드가 없습니다
            </h3>
            <p style={{
              fontSize: '14px',
              color: COLORS.gray,
              lineHeight: '1.5'
            }}>
              카드를 등록하시면<br />
              맞춤형 혜택 정보를 받아보실 수 있습니다
            </p>
          </div>
        ) : (
          userCards.map((card) => {
            const detail = cardDetails[card.cardId];
            const isExpanded = expandedCard === card.cardId;
            
            return (
              <div
                key={card.userCardId}
                style={{
                  backgroundColor: COLORS.white,
                  borderRadius: '16px',
                  marginBottom: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              >
                {/* 카드 기본 정보 */}
                <div
                  style={{
                    padding: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backgroundColor: hoveredCard === detail?.cardId ? COLORS.light : 'white'
                  }}
                  onMouseEnter={() => detail && setHoveredCard(detail.cardId)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => toggleCardExpansion(card.cardId)}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '12px'
                  }}>
                    {/* 카드 이미지 */}
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      marginRight: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: COLORS.light

                    }}>
                      <img
                        src="/card-img.png"
                        alt="카드 이미지"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain'
                        }}
                        onError={(e) => {
                          console.log('카드 이미지 로딩 실패');
                          e.currentTarget.style.display = 'none';
                        }}
                        onLoad={() => console.log('카드 이미지 로딩 성공')}
                      />
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: COLORS.black,
                        margin: '0 0 4px 0'
                      }}>
                        {detail?.cardName || (
                          <span style={{ color: COLORS.gray }}>카드 정보 로딩 중...</span>
                        )}
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

                      <p style={{
                        fontSize: '14px',
                        color: COLORS.gray,
                        margin: 0
                      }}>
                        {detail?.cardCategory || ''}
                      </p>
                      {card.userCardIsInternational && (
                        <span style={{
                          fontSize: '12px',
                          backgroundColor: COLORS.accent,
                          color: COLORS.white,
                          padding: '4px',
                          borderRadius: '4px',
                          fontWeight: '500'
                        }}>
                          해외겸용
                        </span>
                      )}
                      </div>
                    </div>

                    {/* 혜택보기 버튼 */}
                    <div style={{
                      fontSize: '14px',
                      color: COLORS.accent,
                      fontWeight: '500',
                      cursor: 'pointer',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      border: `1px solid ${COLORS.accent}`,
                      transition: 'all 0.2s ease'
                    }}>
                      {isExpanded ? '접기' : '혜택확인'}
                    </div>
                  </div>

                  {/* 카드 번호 및 기본 정보 */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      color: COLORS.black,
                      fontFamily: 'monospace',
                      marginLeft: '60px'
                    }}>
                      {maskCardNumber(card.userCardNumber)}
                    </span>
                    
                    <div style={{
                      display: 'flex',
                      gap: '8px',
                      alignItems: 'center'
                    }}>
                      <span style={{
                        fontSize: '12px',
                        color: COLORS.gray
                      }}>
                        ~ {formatDate(card.userCardSettlementDate)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 카드 상세 정보 (확장 시 표시) */}
                {isExpanded && detail && (
                  <div style={{
                    padding: '0 20px 20px 20px',
                    borderTop: `1px solid ${COLORS.light}`,
                    maxHeight: '400px',
                    overflowY: 'auto'
                  }}>
                    {/* 연회비 정보 */}
                    {/* <div style={{
                      backgroundColor: COLORS.light,
                      padding: '16px',
                      borderRadius: '12px',
                      marginBottom: '16px'
                    }}>
                      <h4 style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: COLORS.black,
                        margin: '0 0 8px 0'
                      }}>
                        연회비
                      </h4>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}>
                        <span style={{ fontSize: '14px', color: COLORS.gray }}>
                          국내전용: {detail.cardAnnualFeeDomestic.toLocaleString()}원
                        </span>
                        <span style={{ fontSize: '14px', color: COLORS.gray }}>
                          해외겸용: {detail.cardAnnualFeeInternational.toLocaleString()}원
                        </span>
                      </div>
                    </div> */}

                    {/* 혜택 정보 */}
                    <div>
                      <div style={{
                        overflowY: 'auto',
                        paddingRight: '4px'
                      }}>
                        {detail.benefitListResponseDtoList.map((benefit, index) => (
                          <div
                            key={index}
                            style={{
                              padding: '12px',
                              backgroundColor: index % 2 === 0 ? COLORS.white : COLORS.light,
                              borderRadius: '8px',
                            }}
                          >
                            <div style={{
                              fontSize: '12px',
                              fontWeight: '600',
                              color: COLORS.accent,
                              marginBottom: '4px'
                            }}>
                              {benefit.benefitCategoryAndBenefitInfo}
                            </div>
                            <div style={{
                              fontSize: '10px',
                              color: COLORS.gray,
                              lineHeight: '1.4'
                            }}>
                              {benefit.benefitContent}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
      
      {/* NavigationBar는 이제 fixed로 독립적으로 하단에 고정됨 */}
      <NavigationBar />
    </div>
  );
};

export default MyPage;
