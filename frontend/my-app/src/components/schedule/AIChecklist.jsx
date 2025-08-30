import React, { useState, useEffect } from 'react';
import './AIChecklist.css';

/**
 * AIChecklist 컴포넌트
 * 
 * 일정 등록 후 AI가 생성한 체크리스트를 표시합니다.
 * 로딩 상태와 체크리스트 아이템들을 관리합니다.
 * 
 * @param {Object} schedule - 등록된 일정 객체
 * @param {Function} onClose - 체크리스트 닫기 시 호출되는 콜백 함수
 * @returns {JSX.Element} AI 체크리스트 컴포넌트
 */
const AIChecklist = ({ schedule, onClose }) => {
  const [checklistItems, setChecklistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * 컴포넌트 마운트 시 AI 체크리스트를 가져옵니다.
   * 실제로는 백엔드 API를 호출하여 체크리스트를 생성합니다.
   */
  useEffect(() => {
    fetchAIChecklist();
  }, []);

  /**
   * AI 체크리스트를 가져오는 함수입니다.
   * 현재는 임시 데이터를 사용하며, 실제로는 백엔드 API를 호출합니다.
   */
  const fetchAIChecklist = async () => {
    // TODO: 실제 백엔드 API 호출로 대체
    // const response = await fetch('/api/ai-checklist', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ schedule })
    // });
    // const data = await response.json();
    
    // 임시 데이터 (로딩 시뮬레이션)
    setTimeout(() => {
      const mockChecklist = [
        '필요한 준비물 확인하기',
        '장소까지의 경로 미리 확인하기',
        '예상 소요 시간 체크하기',
        '필요한 서류나 준비물 준비하기',
        '날씨 확인하기',
        '교통수단 미리 확인하기',
        '예약이 필요한 경우 미리 예약하기',
        '비상연락처 준비하기',
        '예산 범위 내에서 계획 세우기',
        '일정 완료 후 후속 조치 계획하기'
      ];
      
      setChecklistItems(mockChecklist);
      setIsLoading(false);
    }, 2000); // 2초 로딩 시뮬레이션
  };

  /**
   * 체크리스트 아이템의 체크 상태를 토글합니다.
   * 
   * @param {number} index - 토글할 아이템의 인덱스
   */
  const toggleItem = (index) => {
    setChecklistItems(prev => 
      prev.map((item, i) => 
        i === index ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // 로딩 중일 때 표시할 내용
  if (isLoading) {
    return (
      <div className="ai-checklist">
        <div className="checklist-header">
          <h3>🤖 AI 체크리스트</h3>
        </div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>AI가 체크리스트를 생성하고 있습니다...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ai-checklist">
      {/* 체크리스트 헤더 */}
      <div className="checklist-header">
        <h3>🤖 AI 체크리스트</h3>
        <button onClick={onClose} className="close-btn">×</button>
      </div>

      {/* 일정 정보 요약 */}
      <div className="schedule-info">
        <strong>{schedule.title}</strong>
        {schedule.time && <span> • {schedule.time}</span>}
        {schedule.location && <span> • {schedule.location}</span>}
      </div>

      {/* 체크리스트 아이템들 */}
      <div className="checklist-items">
        {checklistItems.map((item, index) => (
          <div key={index} className="checklist-item">
            <input
              type="checkbox"
              id={`item-${index}`}
              checked={item.checked || false}
              onChange={() => toggleItem(index)}
            />
            <label htmlFor={`item-${index}`}>{item}</label>
          </div>
        ))}
      </div>

      {/* 체크리스트 푸터 */}
      <div className="checklist-footer">
        <p>AI가 생성한 체크리스트입니다. 필요에 따라 수정하여 사용하세요.</p>
      </div>
    </div>
  );
};

export default AIChecklist;
