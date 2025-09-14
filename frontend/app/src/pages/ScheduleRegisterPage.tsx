import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { COLORS } from '../styles/colors';

import XIcon from '../assets/icons/schedule/X.png';
import CheckIcon from '../assets/icons/schedule/check.png';
import ClockIcon from '../assets/icons/schedule/clock.png';
import RepeatIcon from '../assets/icons/schedule/repeat.png';
import LocationIcon from '../assets/icons/schedule/location.png';
import CheckbosIcon from '../assets/icons/schedule/checkbox.png'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
  const navigate = useNavigate();
  const colorInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
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
      setForm(prev => ({ ...prev, scheduleStartDate: prev.scheduleStartDate.split('T')[0] + 'T00:00:00', scheduleEndDate: prev.scheduleEndDate.split('T')[0] + 'T23:59:59' }));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = {
        ...form,
        scheduleRepeatEndDate: form.scheduleFrequencyType === 'NONE' ? null : form.scheduleRepeatEndDate || null,
      };
      console.log('전송 데이터:', data);
      await axios.post(`${API_BASE_URL}/schedules`, data);
      navigate('/calendar');
    } catch (err) {
      alert('등록 실패');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 412, maxHeight: '100vh'}}>
      {/* 상단 바: 닫기, 타이틀, 저장(체크) */}
      <div style={{ display: 'flex', alignItems: 'center', marginTop: 60, padding: '0 16px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={XIcon} alt="닫기" style={{ width: 16, height: 16 }} />
        </button>
        <div style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: 24 }}>일정 등록</div>
        <button onClick={handleSubmit} style={{ background: 'none', border: 'none', width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={CheckIcon} alt="저장" style={{ width: 32, height: 16 }} />
        </button>  
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
          style={{ flex: 1, fontSize: 15, border: 'none'}}
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
        <div style={{ display: 'flex', alignItems: 'center'}}>
          <img src={ClockIcon} alt="시계" style={{ width: 22, height: 22, marginRight: 24  }} />
          <span style={{fontSize: 15 }}>일자 및 시간</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: 36, marginTop: 8 }}>
          <input type={allDay ? 'date' : 'datetime-local'} name="scheduleStartDate" value={form.scheduleStartDate} onChange={handleChange} style={{ fontSize: 15, border: 'none', borderBottom: '1px solid #eee', flex: 1 }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: 36,  marginTop: 8}}>
          <input type={allDay ? 'date' : 'datetime-local'} name="scheduleEndDate" value={form.scheduleEndDate} onChange={handleChange} style={{ fontSize: 15, border: 'none', borderBottom: '1px solid #eee', flex: 1}} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: 36,  marginTop: 8 }}>
          <span style={{ fontSize: 15, color: COLORS.black, flex: 1 }}>하루 종일</span>
          <input type="checkbox" checked={allDay} onChange={handleAllDay} style={{ width: 18, height: 18, accentColor: COLORS.accent }} />
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #ccc', margin: '24px'}} />

      {/* 반복 세션 */}
      <div style={{ display: 'flex', padding: '0 24px'}}>
        <div style={{ display: 'flex', alignItems: 'center', marginRight: 24 }}>
          <img src={RepeatIcon} alt="반복" style={{ width: 22, height: 22 }} />
        </div>
        <select name="scheduleFrequencyType" value={form.scheduleFrequencyType} onChange={handleChange} style={{ fontSize: 15, border: 'none', borderBottom: '1px solid #eee'}}>
          {frequencyOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
        {form.scheduleFrequencyType !== 'NONE' && (
          <input type="date" name="scheduleRepeatEndDate" value={form.scheduleRepeatEndDate} onChange={handleChange} style={{ fontSize: 15, border: 'none', borderBottom: '1px solid #eee'}} />
        )}
      </div>

      {/* -------- */}
      <hr style={{ border: 'none', borderTop: '1px solid #ccc', margin: '24px'}} />

      {/* 장소 세션 */}
      <div style={{ display: 'flex', padding: '0 24px'}}>
        <div style={{marginRight: 24 }}>
          <img src={LocationIcon} alt="장소" style={{ width: 22, height: 22 }} />
        </div>
        {/* value={form.scheduleLocation} 제외 */}
        <input name="scheduleLocation" onChange={handleChange} placeholder="장소를 입력해 주세요." style={{fontSize: 15, border: 'none', borderBottom: '0px solid #eee' }} />
      </div>

      {/* -------- */}
      <hr style={{ border: 'none', borderTop: '1px solid #ccc', margin: '24px'}} />

      {/* AI 체크리스트 세션 */}
      <div style={{ display: 'flex',padding: '0 24px'}}>
        <div style={{marginRight: 24 }}>
          <img src={CheckbosIcon} alt="AI 체크리스트" style={{ width: 22, height: 22 }} />
        </div>
          <span style={{ alignItems: 'center', fontSize: 15, flex: 1 }}>AI 체크리스트</span>
          <input type="checkbox" name="scheduleIsChecklist" checked={form.scheduleIsChecklist} onChange={handleChange} style={{ width: 18, height: 18, accentColor: COLORS.accent, marginLeft: 8 }} />
      </div>
      <div style={{ marginTop: 8, fontSize: 12, color: '#ccc', marginLeft: 48 }}>* 일정을 자세하게 입력할수록 정확한 체크리스트를 제공합니다.</div>
    </div>
  );
};

export default ScheduleRegisterPage;