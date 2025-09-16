import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

import XIcon from '../assets/icons/schedule/X.png';
import CheckIcon from '../assets/icons/schedule/check.png';
import ClockIcon from '../assets/icons/schedule/clock.png';
import RepeatIcon from '../assets/icons/schedule/repeat.png';
import LocationIcon from '../assets/icons/schedule/location.png';
import CheckbosIcon from '../assets/icons/schedule/checkbox.png'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// iOS 스타일 토글 버튼 컴포넌트
const ToggleButton: React.FC<{ checked: boolean; onChange: () => void; disabled?: boolean }> = ({ 
  checked, 
  onChange, 
  disabled = false 
}) => {
  return (
    <div
      onClick={!disabled ? onChange : undefined}
      style={{
        width: 51,
        height: 31,
        borderRadius: 16,
        backgroundColor: checked ? '#007AFF' : '#E5E5EA',
        position: 'relative',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'background-color 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        padding: '2px',
      }}
    >
      <div
        style={{
          width: 27,
          height: 27,
          borderRadius: '50%',
          backgroundColor: 'white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          transform: checked ? 'translateX(20px)' : 'translateX(0px)',
          transition: 'transform 0.3s ease',
        }}
      />
    </div>
  );
};

// 시간 직접 입력 컴포넌트
const TimeInputManual: React.FC<{
  amPm: string;
  hour: string;
  minute: string;
  onAmPmChange: (value: string) => void;
  onHourChange: (value: string) => void;
  onMinuteChange: (value: string) => void;
}> = ({ amPm, hour, minute, onAmPmChange, onHourChange, onMinuteChange }) => {
  
  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // 숫자만 허용
    if (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 12)) {
      onHourChange(value);
    }
  };
  
  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // 숫자만 허용
    if (value === '' || (parseInt(value) >= 0 && parseInt(value) <= 59)) {
      onMinuteChange(value.padStart(2, '0'));
    }
  };
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <span 
        style={{ 
          fontSize: 15, 
          color: '#666', 
          cursor: 'pointer',
          textDecoration: 'underline'
        }}
        onClick={() => onAmPmChange(amPm === '오전' ? '오후' : '오전')}
      >
        {amPm}
      </span>
      <input
        type="text"
        value={hour}
        onChange={handleHourChange}
        placeholder="12"
        maxLength={2}
        style={{
          width: 24,
          fontSize: 15,
          border: 'none',
          background: 'transparent',
          color: '#666',
          outline: 'none',
          textAlign: 'center'
        }}
      />
      <span style={{ fontSize: 15, color: '#666' }}>:</span>
      <input
        type="text"
        value={minute}
        onChange={handleMinuteChange}
        placeholder="00"
        maxLength={2}
        style={{
          width: 24,
          fontSize: 15,
          border: 'none',
          background: 'transparent',
          color: '#666',
          outline: 'none',
          textAlign: 'center'
        }}
      />
    </div>
  );
};
const CustomDropdown: React.FC<{
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}> = ({ options, value, onChange }) => {
  return (
    <select 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
      style={{ 
        fontSize: 15, 
        border: 'none',
        background: 'transparent',
        color: '#333',
        outline: 'none'
      }}
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
};

const initialForm = {
  scheduleName: '',
  scheduleColor: '#000000',
  scheduleStartDate: '',
  scheduleEndDate: '',
  scheduleFrequencyType: 'NONE',
  scheduleRepeatEndDate: 'null',
  scheduleIsChecklist: false,
  // scheduleLocation: '', //api에 없음
};

const frequencyOptions = [
  { value: 'NONE', label: '반복 안 함' },
  { value: 'DAILY', label: '매일' },
  { value: 'WEEKLY', label: '매주' },
  { value: 'MONTHLY', label: '매월' },
  { value: 'YEARLY', label: '매년' },
];

const ScheduleRegisterPage: React.FC = () => {
  const [form, setForm] = useState(initialForm);
  const [allDay, setAllDay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [originalScheduleId, setOriginalScheduleId] = useState<number | null>(null);
  
  // 시간 입력을 위한 상태
  const [startAmPm, setStartAmPm] = useState('오전');
  const [startHour, setStartHour] = useState('12');
  const [startMinute, setStartMinute] = useState('00');
  const [endAmPm, setEndAmPm] = useState('오전');
  const [endHour, setEndHour] = useState('1');
  const [endMinute, setEndMinute] = useState('00');
  
  const navigate = useNavigate();
  const location = useLocation();
  const colorInputRef = useRef<HTMLInputElement>(null);

  // 시간 파싱 함수 (HH:mm:ss -> 오전/오후 시:분)
  const parseTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const amPm = hours >= 12 ? '오후' : '오전';
    const displayHour = hours === 0 ? 12 : (hours > 12 ? hours - 12 : hours);
    return {
      amPm,
      hour: displayHour.toString(),
      minute: minutes.toString().padStart(2, '0')
    };
  };

  // 캘린더에서 전달받은 선택된 날짜 또는 기존 일정 데이터 처리
  useEffect(() => {
    const selectedDate = location.state?.selectedDate;
    const scheduleDetail = location.state?.scheduleDetail;
    const isEdit = location.state?.isEdit;

    if (isEdit && scheduleDetail) {
      // 수정 모드: 기존 일정 데이터로 폼 초기화
      console.log('수정 모드로 진입:', scheduleDetail);
      setIsEditMode(true);
      setOriginalScheduleId(scheduleDetail.scheduleId);
      
      // 날짜 및 시간 파싱
      const startDateTime = new Date(scheduleDetail.scheduleStartDate);
      const endDateTime = new Date(scheduleDetail.scheduleEndDate);
      
      const startDateStr = `${startDateTime.getFullYear()}-${String(startDateTime.getMonth() + 1).padStart(2, '0')}-${String(startDateTime.getDate()).padStart(2, '0')}`;
      const endDateStr = `${endDateTime.getFullYear()}-${String(endDateTime.getMonth() + 1).padStart(2, '0')}-${String(endDateTime.getDate()).padStart(2, '0')}`;
      
      const startTimeStr = `${String(startDateTime.getHours()).padStart(2, '0')}:${String(startDateTime.getMinutes()).padStart(2, '0')}:${String(startDateTime.getSeconds()).padStart(2, '0')}`;
      const endTimeStr = `${String(endDateTime.getHours()).padStart(2, '0')}:${String(endDateTime.getMinutes()).padStart(2, '0')}:${String(endDateTime.getSeconds()).padStart(2, '0')}`;
      
      // 하루종일 여부 확인
      const isAllDay = startTimeStr === '00:00:00' && endTimeStr === '23:59:59';
      setAllDay(isAllDay);
      
      // 시간 정보 설정
      if (!isAllDay) {
        const startTime = parseTime(startTimeStr);
        const endTime = parseTime(endTimeStr);
        
        setStartAmPm(startTime.amPm);
        setStartHour(startTime.hour);
        setStartMinute(startTime.minute);
        setEndAmPm(endTime.amPm);
        setEndHour(endTime.hour);
        setEndMinute(endTime.minute);
      }
      
      // 폼 데이터 설정
      setForm({
        scheduleName: scheduleDetail.scheduleName,
        scheduleColor: scheduleDetail.scheduleColor,
        scheduleStartDate: `${startDateStr}T${startTimeStr.substring(0, 5)}`,
        scheduleEndDate: `${endDateStr}T${endTimeStr.substring(0, 5)}`,
        scheduleFrequencyType: scheduleDetail.scheduleFrequencyType,
        scheduleRepeatEndDate: scheduleDetail.scheduleRepeatEndDate || 'null',
        scheduleIsChecklist: scheduleDetail.scheduleIsChecklist,
      });
      
    } else if (selectedDate) {
      // 새 일정 등록 모드
      console.log('새 일정 등록 모드');
      setIsEditMode(false);
      
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;
      
      setForm(prev => ({
        ...prev,
        scheduleStartDate: `${dateStr}T00:00`,
        scheduleEndDate: `${dateStr}T00:00`
      }));
    } else {
      // 기본값: 2025년 9월 16일
      const defaultDate = '2025-09-16';
      setForm(prev => ({
        ...prev,
        scheduleStartDate: `${defaultDate}T00:00`,
        scheduleEndDate: `${defaultDate}T00:00`
      }));
    }
  }, [location.state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleColorClick = () => {
    colorInputRef.current?.click();
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, scheduleColor: e.target.value }));
  };

  const handleAllDay = () => {
    setAllDay(v => !v);
    if (!allDay) {
      // 하루종일 토글을 켤 때: 시작은 00:00, 끝은 23:59로 설정
      const startDate = form.scheduleStartDate.split('T')[0];
      const endDate = form.scheduleEndDate.split('T')[0];
      setForm(prev => ({ 
        ...prev, 
        scheduleStartDate: `${startDate}T00:00`,
        scheduleEndDate: `${endDate}T23:59`
      }));
    } else {
      // 하루종일 토글을 끌 때: 기본 시간으로 설정
      const startDate = form.scheduleStartDate.split('T')[0];
      const endDate = form.scheduleEndDate.split('T')[0];
      setForm(prev => ({ 
        ...prev, 
        scheduleStartDate: `${startDate}T00:00`,
        scheduleEndDate: `${endDate}T00:00`
      }));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // 시간 변환 함수
      const convertTime = (amPm: string, hour: string, minute: string) => {
        let hour24 = parseInt(hour) || 0;
        if (amPm === '오후' && hour24 !== 12) {
          hour24 += 12;
        } else if (amPm === '오전' && hour24 === 12) {
          hour24 = 0;
        }
        return `${hour24.toString().padStart(2, '0')}:${minute.padStart(2, '0')}:00`;
      };

      // API 전송용 데이터 준비 (scheduleIsChecklist는 일단 false로 보냄)
      const apiData = {
        ...form,
        scheduleIsChecklist: false, // 일단 false로 보내기
        // 하루종일인 경우 시작시간은 00:00:00, 종료시간은 23:59:59로 설정
        scheduleStartDate: allDay 
          ? `${form.scheduleStartDate.split('T')[0]}T00:00:00`
          : `${form.scheduleStartDate.split('T')[0]}T${convertTime(startAmPm, startHour, startMinute)}`,
        scheduleEndDate: allDay 
          ? `${form.scheduleEndDate.split('T')[0]}T23:59:59`
          : `${form.scheduleEndDate.split('T')[0]}T${convertTime(endAmPm, endHour, endMinute)}`,
        scheduleRepeatEndDate: form.scheduleFrequencyType === 'NONE' ? null : form.scheduleRepeatEndDate || null,
      };
      
      console.log('전송 데이터:', apiData);
      
      if (isEditMode && originalScheduleId) {
        // 수정 모드: PUT 요청
        console.log('일정 수정 요청:', originalScheduleId);
        await axios.put(`${API_BASE_URL}/schedules/${originalScheduleId}`, apiData);
        console.log('일정 수정 성공');
        
        // 체크리스트 상태 업데이트
        if (form.scheduleIsChecklist) {
          console.log('체크리스트 활성화 요청 - scheduleId:', originalScheduleId);
          await axios.put(`${API_BASE_URL}/schedules/${originalScheduleId}/on-off`, {
            enable: true
          });
          console.log('체크리스트 활성화 완료');
        }
      } else {
        // 등록 모드: POST 요청
        const response = await axios.post(`${API_BASE_URL}/schedules`, apiData);
        console.log('일정 등록 성공');
        
        // 체크리스트가 활성화되어 있다면 추가 요청
        if (form.scheduleIsChecklist) {
          const scheduleId = response.data.scheduleId || response.data.id; // API 응답 구조에 따라 조정
          console.log('체크리스트 활성화 요청 - scheduleId:', scheduleId);
          await axios.put(`${API_BASE_URL}/schedules/${scheduleId}/on-off`, {
            enable: true
          });
          console.log('체크리스트 활성화 완료');
        }
      }
      
      navigate('/calendar');
    } catch (err) {
      console.error(isEditMode ? '수정 실패:' : '등록 실패:', err);
      alert(isEditMode ? '수정 실패' : '등록 실패');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={{ maxWidth: 412, maxHeight: '100vh'}}>
      {/* 상단 바: 닫기, 타이틀, 삭제(수정모드시), 저장(체크) */}
      <div style={{ display: 'flex', alignItems: 'center', marginTop: 60, padding: '0 16px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={XIcon} alt="닫기" style={{ width: 16, height: 16 }} />
        </button>
        <div style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: 24 }}>
          {isEditMode ? '일정 수정' : '일정 등록'}
        </div>
        <div style={{ display: 'flex' }}>
          <button 
            onClick={handleSubmit} 
            disabled={loading}
            style={{ 
              background: 'none', 
              border: 'none', 
              width: 32, 
              height: 32, 
              cursor: loading ? 'not-allowed' : 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              opacity: loading ? 0.5 : 1
            }}
          >
            {loading ? (
              <div style={{ 
                width: 16, 
                height: 16, 
                border: '2px solid #ddd', 
                borderTop: '2px solid #007AFF',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
            ) : (
              <img src={CheckIcon} alt="저장" style={{ width: 32, height: 16 }} />
            )}
          </button>
        </div>
      </div>

      {/* 일정명 & 컬러 선택 세션 */}
      {/* ---------------------- */}
      <div style={{ display: 'flex', alignItems: 'center', margin: '24px 0 12px 0 ', padding: '0 24px' }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: form.scheduleColor, marginRight: 24, cursor: 'pointer', position: 'relative' }} onClick={handleColorClick} />
        <input
          name="scheduleName"
          value={form.scheduleName}
          onChange={handleChange}
          placeholder="일정을 입력해 주세요."
          style={{ flex: 1, fontSize: 15, border: 'none', padding: 4}}
        />
        <input
          ref={colorInputRef}
          type="color"
          value={form.scheduleColor}
          onChange={handleColorChange}
          style={{ display: 'none' }}
        />
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #ccc', margin: '24px'}} />


      {/* 시간 세션 */}
      {/* -------- */}
      <div style={{ padding: '0 24px'}}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16}}>
          <img src={ClockIcon} alt="시계" style={{ width: 24, height: 24, marginRight: 24  }} />
          <span style={{fontSize: 15 }}>일자 및 시간</span>
        </div>
        
        {/* 시작일 (고정) */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginLeft: 46, paddingBottom: 8 }}>
          <span style={{ fontSize: 15, color: '#333' }}>
            {form.scheduleStartDate ? (() => {
              const date = new Date(form.scheduleStartDate);
              const year = date.getFullYear();
              const month = date.getMonth() + 1;
              const day = date.getDate();
              const weekday = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
              return `${year}. ${month}.${day} ${weekday}요일`;
            })() : '2025. 9.15 월요일'}
          </span>
          {!allDay && (
            <TimeInputManual
              amPm={startAmPm}
              hour={startHour}
              minute={startMinute}
              onAmPmChange={setStartAmPm}
              onHourChange={setStartHour}
              onMinuteChange={setStartMinute}
            />
          )}
        </div>
        
        {/* 종료일 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginLeft: 46, paddingBottom: 8 }}>
          <span 
            style={{ 
              fontSize: 15, 
              color: '#333',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'date';
              input.value = form.scheduleEndDate ? form.scheduleEndDate.split('T')[0] : '';
              input.onchange = (e) => {
                const target = e.target as HTMLInputElement;
                const newDate = target.value;
                setForm(prev => ({
                  ...prev,
                  scheduleEndDate: `${newDate}T00:00`
                }));
              };
              input.click();
            }}
          >
            {form.scheduleEndDate ? (() => {
              const date = new Date(form.scheduleEndDate);
              const year = date.getFullYear();
              const month = date.getMonth() + 1;
              const day = date.getDate();
              const weekday = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
              return `${year}. ${month}.${day} ${weekday}요일`;
            })() : '2025. 9.15 월요일'}
          </span>
          {!allDay && (
            <TimeInputManual
              amPm={endAmPm}
              hour={endHour}
              minute={endMinute}
              onAmPmChange={setEndAmPm}
              onHourChange={setEndHour}
              onMinuteChange={setEndMinute}
            />
          )}
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: 46 }}>
          <span style={{ fontSize: 16, fontWeight: 'bold', color: '#333', flex: 1 }}>하루 종일</span>
          <ToggleButton checked={allDay} onChange={handleAllDay} />
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #ccc', margin: '24px'}} />

      {/* 반복 세션 */}
      <div style={{ padding: '0 24px'}}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={RepeatIcon} alt="반복" style={{ width: 24, height: 24, marginRight: 24 }} />
            <CustomDropdown
              options={frequencyOptions}
              value={form.scheduleFrequencyType}
              onChange={(value) => setForm(prev => ({ ...prev, scheduleFrequencyType: value }))}
            />
          </div>
          {form.scheduleFrequencyType !== 'NONE' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 15, color: '#666' }}>반복 종료</span>
              <input 
                type="date" 
                name="scheduleRepeatEndDate" 
                value={form.scheduleRepeatEndDate} 
                onChange={handleChange} 
                style={{ 
                  fontSize: 15, 
                  border: 'none',
                  background: 'transparent',
                  color: '#333',
                  outline: 'none'
                }} 
              />
            </div>
          )}
        </div>
      </div>

      {/* -------- */}
      <hr style={{ border: 'none', borderTop: '1px solid #ccc', margin: '24px'}} />

      {/* 장소 세션 */}
      <div style={{ padding: '0 24px'}}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={LocationIcon} alt="장소" style={{ width: 24, height: 28, marginRight: 24 }} />
          <input 
            name="scheduleLocation" 
            onChange={handleChange} 
            placeholder="장소를 입력해 주세요." 
            style={{
              flex: 1,
              fontSize: 15, 
              border: 'none',
              background: 'transparent',
              outline: 'none'
            }} 
          />
        </div>
      </div>

      {/* -------- */}
      <hr style={{ border: 'none', borderTop: '1px solid #ccc', margin: '24px'}} />

      {/* AI 체크리스트 세션 */}
      <div style={{ padding: '0 24px'}}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={CheckbosIcon} alt="AI 체크리스트" style={{ width: 24, height: 24, marginRight: 24 }} />
            <span style={{ fontSize: 15 }}>AI 체크리스트</span>
          </div>
          <ToggleButton 
            checked={form.scheduleIsChecklist} 
            onChange={() => setForm(prev => ({ ...prev, scheduleIsChecklist: !prev.scheduleIsChecklist }))} 
          />
        </div>
        <div style={{ fontSize: 12, color: '#999', marginLeft: 46 }}>
          * 일정을 자세하게 입력할수록 정확한 체크리스트를 제공합니다.
        </div>
      </div>
      </div>
    </>
  );
};

export default ScheduleRegisterPage;