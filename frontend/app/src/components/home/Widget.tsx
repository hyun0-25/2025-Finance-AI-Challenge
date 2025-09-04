import React from 'react';

// Placeholder weather icon
const WeatherIcon = () => (
  <span role="img" aria-label="weather" style={{ fontSize: '2rem' }}>☀️</span>
);

const Widget: React.FC = () => {
  // Dummy data for demonstration
  const weather = {
    icon: <WeatherIcon />,
    temp: 22,
    high: 25,
    low: 16,
    city: '서울',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {weather.icon}
        <span style={{ fontSize: '2rem', fontWeight: 500 }}>{weather.temp}°</span>
      </div>
      <div style={{ fontSize: '1rem', color: '#888', marginTop: '0.2rem' }}>
        {weather.city} 최고 {weather.high}° / 최저 {weather.low}°
      </div>
    </div>
  );
};

export default Widget;
