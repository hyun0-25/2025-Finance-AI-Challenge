import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const initialForm = {
  scheduleName: '',
  scheduleColor: '#FF5733',
  scheduleStartDate: '',
  scheduleEndDate: '',
  scheduleFrequencyType: 'NONE',
  scheduleRepeatEndDate: '',
  scheduleIsChecklist: false,
  scheduleLocation: '',
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAllDay = () => {
    setAllDay(v => !v);
    if (!allDay) {
      setForm(prev => ({ ...prev, scheduleStartDate: prev.scheduleStartDate.split('T')[0] + 'T00:00:00', scheduleEndDate: prev.scheduleEndDate.split('T')[0] + 'T23:59:59' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = {
        ...form,
        scheduleRepeatEndDate: form.scheduleFrequencyType === 'NONE' ? null : form.scheduleRepeatEndDate || null,
      };
      await axios.post(`${API_BASE_URL}/schedules`, data);
      alert('일정이 등록되었습니다!');
      navigate('/calendar');
    } catch (err) {
      alert('등록 실패');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto', padding: 16, background: '#fff', minHeight: '100vh' }}>
      <h2 style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: 24 }}>일정 등록</h2>
      <div style={{ marginBottom: 16 }}>
        <input name="scheduleName" value={form.scheduleName} onChange={handleChange} placeholder="일정을 입력해 주세요" required style={{ width: '100%', fontSize: 18, border: 'none', borderBottom: '1px solid #ccc', padding: 8 }} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label>색상: <input type="color" name="scheduleColor" value={form.scheduleColor} onChange={handleChange} /></label>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label>시작일시: <input type={allDay ? 'date' : 'datetime-local'} name="scheduleStartDate" value={form.scheduleStartDate} onChange={handleChange} required /></label>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label>종료일시: <input type={allDay ? 'date' : 'datetime-local'} name="scheduleEndDate" value={form.scheduleEndDate} onChange={handleChange} required /></label>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label>하루 종일 <input type="checkbox" checked={allDay} onChange={handleAllDay} /></label>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label>반복: <select name="scheduleFrequencyType" value={form.scheduleFrequencyType} onChange={handleChange}>
          {frequencyOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select></label>
      </div>
      {form.scheduleFrequencyType !== 'NONE' && (
        <div style={{ marginBottom: 16 }}>
          <label>반복 종료일: <input type="date" name="scheduleRepeatEndDate" value={form.scheduleRepeatEndDate} onChange={handleChange} /></label>
        </div>
      )}
      <div style={{ marginBottom: 16 }}>
        <input name="scheduleLocation" value={form.scheduleLocation} onChange={handleChange} placeholder="장소를 입력해 주세요." style={{ width: '100%', fontSize: 16, border: 'none', borderBottom: '1px solid #ccc', padding: 8 }} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label>AI 체크리스트 <input type="checkbox" name="scheduleIsChecklist" checked={form.scheduleIsChecklist} onChange={handleChange} /></label>
        <div style={{ fontSize: 12, color: '#888' }}>* 일정을 자세하게 입력할수록 정확한 체크리스트를 제공합니다.</div>
      </div>
      <button type="submit" disabled={loading} style={{ width: '100%', padding: 12, background: '#2196f3', color: '#fff', fontWeight: 'bold', border: 'none', borderRadius: 8, fontSize: 18 }}>등록</button>
    </form>
  );
};

export default ScheduleRegisterPage;
