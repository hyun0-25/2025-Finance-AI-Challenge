import { useLocation, useNavigate } from 'react-router-dom';
import { COLORS } from '../styles/colors';

export default function CardDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  // cardImg, cardName은 CardRecommendContent1에서 state로 전달
  const { cardImg, cardName } = (location.state || {}) as { cardImg?: string; cardName?: string };

  if (!cardImg || !cardName) {
    return <div style={{ padding: 32 }}>카드 정보가 없습니다.</div>;
  }

  return (
    <div style={{ paddingBottom: 24, minHeight: '100vh', overflow: 'auto', background: '#fff' }}>
      {/* 상단 바 */}
      <div style={{ display: 'flex', alignItems: 'center', marginTop: 60, marginLeft: 20 }}>
        <button 
          onClick={() => navigate('/card-recommend')} 
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
        <div style={{ fontWeight: 700, fontSize: 28 }}>{cardName}</div>
        <img src={cardImg} alt={cardName} style={{ width: 100, borderRadius: 8, margin: 12 }} />
        <div style={{ color: COLORS.black, fontSize: 18, marginTop: 8 }}>OO만원(국내전용) / OO만원(해외겸용)</div>
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
            <div style={{ marginBottom: 12 }}>
              <div style={{ color: COLORS.accent, fontWeight: 600, fontSize: 16, marginBottom: 4 }}>카페/디저트 할인 30%</div>
              <div style={{ color: '#666', fontSize: 14, lineHeight: 1.4 }}>스타벅스, 투썸플레이스, 카페베네, 어쩌고저쩌고 살라살라</div>
            </div>

            <div style={{ marginBottom: 12 }}>
              <div style={{ color: COLORS.accent, fontWeight: 600, fontSize: 16, marginBottom: 4 }}>카페/디저트 할인 30%</div>
              <div style={{ color: '#666', fontSize: 14, lineHeight: 1.4 }}>스타벅스, 투썸플레이스, 카페베네, 어쩌고저쩌고 살라살라</div>
            </div>

            <div>
              <div style={{ color: COLORS.accent, fontWeight: 600, fontSize: 16, marginBottom: 4 }}>카페/디저트 할인 30%</div>
              <div style={{ color: '#666', fontSize: 14, lineHeight: 1.4 }}>스타벅스, 투썸플레이스, 카페베네, 어쩌고저쩌고 살라살라</div>
            </div>
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
          <div style={{ flex: 1,
            padding: 10, 
          }}>
            <div style={{ marginBottom: 16 }}>
              <div style={{ color: COLORS.accent, fontWeight: 600, fontSize: 16, marginBottom: 4 }}>카페/디저트 할인 30%</div>
              <div style={{ color: '#666', fontSize: 14, lineHeight: 1.4 }}>스타벅스, 투썸플레이스, 카페베네, 어쩌고저쩌고 살라살라</div>
            </div>
            
            <div style={{ marginBottom: 16 }}>
              <div style={{ color: COLORS.accent, fontWeight: 600, fontSize: 16, marginBottom: 4 }}>카페/디저트 할인 30%</div>
              <div style={{ color: '#666', fontSize: 14, lineHeight: 1.4 }}>스타벅스, 투썸플레이스, 카페베네, 어쩌고저쩌고 살라살라</div>
            </div>
            
            <div>
              <div style={{ color: COLORS.accent, fontWeight: 600, fontSize: 16, marginBottom: 4 }}>카페/디저트 할인 30%</div>
              <div style={{ color: '#666', fontSize: 14, lineHeight: 1.4 }}>스타벅스, 투썸플레이스, 카페베네, 어쩌고저쩌고 살라살라</div>
            </div>
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
