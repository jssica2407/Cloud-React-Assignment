import React from 'react';
import './App.css';
import WeatherWidget from './components/WeatherWidget.jsx';

export default function App() {
  return (
    <div className="container">
      <div className="card" style={{ marginBottom: 16 }}>
        <h1 className="h1">Jessica's Internship Task</h1>
        <p>React Frontend calls External API.</p>
        <small className="muted">Ready to Build & Deploy to S3 + CloudFront via CI/CD.</small>
      </div>

      <div className="row">
        <div className="card" style={{ flex: 1, minWidth: 300 }}>
          <WeatherWidget defaultCity="Taipei" /> {/* Show WeatherWidget w/ default Taipei */}
        </div>
      </div>
    </div>
  );
}
