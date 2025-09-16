import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { COLORS } from '../styles/colors';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 카드 상세 정보 인터페이스
interface CardDetail {
  cardId: number;
  cardName: string;
  cardCategory: string;
  cardAnnualFeeDomestic: number;
  cardAnnualFeeInternational: number;
  benefitListResponseDtoList: CardBenefit[];
}

interface CardBenefit {
  benefitCategoryAndBenefitInfo: string;
  benefitContent: string;
}

export default function CardDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [cardDetail, setCardDetail] = useState<CardDetail | null>(null);
  const [loading, setLoading] = useState(true);
  
  // cardImg, cardName, cardId는 CardRecommendContent1에서 state로 전달
  const { cardImg, cardName, cardId } = (location.state || {}) as { 
    cardImg?: string; 
    cardName?: string; 
    cardId?: number;
  };

  // 카드 상세 정보 가져오기
  useEffect(() => {
    const fetchCardDetail = async () => {
      if (!cardId) {
        console.log('카드 ID가 없습니다.');
        setLoading(false);
        return;
      }

      try {
        console.log(`카드 상세 정보 요청: cardId=${cardId}`);
        const response = await axios.get(`${API_BASE_URL}/cards/${cardId}`);
        console.log('카드 상세 정보 응답:', response.data);
        setCardDetail(response.data);
      } catch (error) {
        console.error('카드 상세 정보 조회 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCardDetail();
  }, [cardId]);

  if (!cardImg || !cardName) {
    return <div style={{ padding: 32 }}>카드 정보가 없습니다.</div>;
  }

  if (loading) {
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
          카드 정보를 불러오는 중...
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
    <div style={{ paddingBottom: 24, minHeight: '100vh', overflow: 'auto', background: '#fff' }}>
      {/* 상단 바 */}
      <div style={{ display: 'flex', alignItems: 'center', marginTop: 60, marginLeft: 20 }}>
        <button 
        // 뒤로 -1
          onClick={() => navigate(-1)} 
          style={{ 
            background: 'none', 
            border: 'none',
            marginTop: 12,
            marginRight: 16,
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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
        <div style={{ fontWeight: 700, fontSize: 28 }}>
          {cardName || cardDetail?.cardName}
        </div>
        <img src={cardImg} alt={cardName} style={{ width: 100, borderRadius: 8, margin: 12 }} />
        <div style={{ color: COLORS.black, fontSize: 18, marginTop: 8 }}>
          {cardDetail 
            ? `${cardDetail.cardAnnualFeeDomestic?.toLocaleString()}원(국내전용) / ${cardDetail.cardAnnualFeeInternational?.toLocaleString()}원(해외겸용)`
            : "연회비 정보 로딩 중..."
          }
        </div>
      </div>
      <div style={{ maxWidth: 400, margin: '0 12px', padding: 12 }}>
        {/* 맞춤 혜택 */}
        <div style={{ marginBottom: 24, display: 'flex', alignItems: 'flex-start', gap: 16 }}>
          <div style={{ 
            color: COLORS.sub, 
            fontWeight: 700, 
            fontSize: 18, 
            lineHeight: 1.2
          }}>
            맞춤<br/>혜택
          </div>
          <div style={{ 
            border: `1px solid ${COLORS.accent}`, 
            borderRadius: 8,
            padding: 10, 
            backgroundColor: COLORS.light,
            flex: 1
          }}>
            {cardDetail?.benefitListResponseDtoList?.slice(0, 3).map((benefit, index) => (
              <div key={index} style={{ marginBottom: index < 2 ? 12 : 0 }}>
                <div style={{ color: COLORS.accent, fontWeight: 600, fontSize: 16, marginBottom: 4 }}>
                  {benefit.benefitCategoryAndBenefitInfo}
                </div>
                <div style={{ color: '#666', fontSize: 14, lineHeight: 1.4 }}>
                  {benefit.benefitContent}
                </div>
              </div>
            )) || (
              <div style={{ color: '#666', fontSize: 14 }}>
                혜택 정보를 불러오는 중...
              </div>
            )}
          </div>
        </div>

        {/* 주요 혜택 */}
        <div style={{ marginBottom: 24, display: 'flex', alignItems: 'flex-start', gap: 16 }}>
          <div style={{ 
            color: COLORS.gray, 
            fontWeight: 700, 
            fontSize: 18, 
            lineHeight: 1.2,
            marginTop: 12,
          }}>
            주요<br/>혜택
          </div>
          <div style={{ flex: 1, padding: 10 }}>
            {cardDetail?.benefitListResponseDtoList?.slice(3, 6).map((benefit, index) => (
              <div key={index} style={{ marginBottom: index < 2 ? 16 : 0 }}>
                <div style={{ color: COLORS.accent, fontWeight: 600, fontSize: 16, marginBottom: 4 }}>
                  {benefit.benefitCategoryAndBenefitInfo}
                </div>
                <div style={{ color: '#666', fontSize: 13, lineHeight: 1.4 }}>
                  {benefit.benefitContent}
                </div>
              </div>
            )) || (
              <div style={{ color: '#666', fontSize: 14 }}>
                혜택 정보를 불러오는 중...
              </div>
            )}
          </div>
        </div>
        {/* 꼭 알아두세요 */}
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>꼭 알아두세요 !</div>
        <div style={{ color: '#444', fontSize: 14, whiteSpace: 'pre-line', lineHeight: 1.7 }}>
• 연체이자율 : 회원별·이용상품별 정상이자율 +3%p
<br />
(최고 연 20.0%)
<br />
* 연체 발생 시점에 정상이자율이 없는 경우 아래와 같이 적용
<br />
① 일시불 거래 연체 시 : 거래 발생 시점의 최소 기간(2개월) 유이자할부 이자율
<br />
② 무이자할부 거래 연체 시 : 거래 발생 시점의 동일한 할부 계약기간 유이자할부 이자율
<br />
• 필요 이상으로 신용카드를 발급 및 이용하실 경우 개인신용 평점, 이용한도등에 영향을 미칠 수 있습니다
<br />
• 금융상품 이용 전 상품설명서, 홈페이지, 약관을 통해 이용조건을 확인해 주시기 바랍니다.
<br />
• 금융소비자는 해당 상품 또는 서비스에 대하여 설명을 받을 권리가 있습니다.
<br />
• 신용카드 발급이 부적정한 경우 (개인신용평점 낮음 등) 카드 발급이 제한될 수 있습니다.
<br />
• 카드 이용대금과 이에 수반되는 모든 수수료를 지정된 대금 결제일에 상환합니다.
<br />
• 상환 능력에 비해 신용카드 사용액이 과도할 경우 귀하의 개인신용평점이 하락할 수 있습니다.
<br />
• 개인신용평점 하락 시 금융거래 관련된 불이익이 발생할 수 있습니다.
<br />
• 일정 기간 원리금을 연체할 경우, 모든 원리금을 변제할 의무가 발생할 수 있습니다.
        </div>
      </div>
    </div>
  );
}
