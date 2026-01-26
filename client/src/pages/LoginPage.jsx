import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function LoginPage() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [, setToken] = useLocalStorage('app_token', null); 
  const [, setUser] = useLocalStorage('app_user', null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'פרטי התחברות שגויים');

      setToken(data.token);
      setUser(data.user);
      
      navigate('/');
      window.location.reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: '400px' }}>
        <form onSubmit={handleSubmit} className="box purple-form-box p-5 shadow">
          <h1 className="title has-text-centered mb-5">התחברות</h1>
          <div className="field">
            <label className="label">שם משתמש</label>
            <input 
              className="input" type="text" required 
              onChange={(e) => setFormData({...formData, username: e.target.value})} 
            />
          </div>
          <div className="field">
            <label className="label">סיסמה</label>
            <input 
              className="input" type="password" required 
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
            />
          </div>
          {error && <p className="help is-danger mb-3">{error}</p>}
          <button className={`button is-fullwidth gradient-button ${loading ? 'is-loading' : ''}`}>
            כניסה למערכת ✨
          </button>
        </form>
      </div>
    </div>
  );
}