import React, { useState } from 'react';
import './ScheduleForm.css';

/**
 * ScheduleForm 컴포넌트
 * 
 * 선택된 날짜에 일정을 등록할 수 있는 폼을 제공합니다.
 * 일정명(필수), 시간, 장소, 반복주기, 설명(선택)을 입력받습니다.
 * 
 * @param {string} selectedDate - 선택된 날짜 (YYYY-MM-DD 형식)
 * @param {Function} onSubmit - 일정 등록 시 호출되는 콜백 함수
 * @param {Function} onCancel - 취소 시 호출되는 콜백 함수
 * @returns {JSX.Element} 일정 등록 폼 컴포넌트
 */
const ScheduleForm = ({ selectedDate, onSubmit, onCancel }) => {
  // 폼 상태 관리
  const [formData, setFormData] = useState({
    title: '',
    time: '',
    location: '',
    repeatCycle: 'none',
    description: ''
  });

  /**
   * 폼 입력값이 변경되었을 때 호출되는 핸들러입니다.
   * 해당 필드의 값을 업데이트합니다.
   * 
   * @param {Event} e - 입력 이벤트 객체
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * 폼 제출 시 호출되는 핸들러입니다.
   * 일정명이 비어있으면 제출을 막고, 유효한 경우 onSubmit을 호출합니다.
   * 
   * @param {Event} e - 폼 제출 이벤트 객체
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('일정명을 입력해주세요.');
      return;
    }

    const schedule = {
      id: Date.now(), // 임시 ID 생성
      date: selectedDate,
      ...formData
    };

    onSubmit(schedule);
  };

  return (
    <div className="schedule-form">
      {/* 폼 제목 */}
      <h3>{selectedDate} 일정 등록</h3>
      
      <form onSubmit={handleSubmit}>
        {/* 일정명 입력 필드 (필수) */}
        <div className="form-group">
          <label htmlFor="title">일정(이름) *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="일정명을 입력하세요"
            required
          />
        </div>

        {/* 시간 입력 필드 (선택) */}
        <div className="form-group">
          <label htmlFor="time">시간</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
          />
        </div>

        {/* 장소 입력 필드 (선택) */}
        <div className="form-group">
          <label htmlFor="location">장소</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="장소를 입력하세요"
          />
        </div>

        {/* 반복 주기 선택 필드 (선택) */}
        <div className="form-group">
          <label htmlFor="repeatCycle">반복 주기</label>
          <select
            id="repeatCycle"
            name="repeatCycle"
            value={formData.repeatCycle}
            onChange={handleInputChange}
          >
            <option value="none">반복 안함</option>
            <option value="daily">매일</option>
            <option value="weekly">매주</option>
            <option value="monthly">매월</option>
            <option value="yearly">매년</option>
          </select>
        </div>

        {/* 설명 입력 필드 (선택) */}
        <div className="form-group">
          <label htmlFor="description">설명</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="일정에 대한 설명을 입력하세요"
            rows="3"
          />
        </div>

        {/* 폼 액션 버튼들 */}
        <div className="form-actions">
          <button type="button" onClick={onCancel} className="cancel-btn">
            취소
          </button>
          <button type="submit" className="submit-btn">
            등록
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleForm;
