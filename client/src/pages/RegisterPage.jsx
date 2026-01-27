import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    

    if (formData.username.length < 3) return setError("שם המשתמש חייב להכיל 3 תווים לפחות");
    if (formData.password.length < 6) return setError("הסיסמה חייבת להכיל 6 תווים לפחות");

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.message || 'הרשמה נכשלה');
      
      alert('נרשמת בהצלחה! כעת ניתן להתחבר');
      navigate('/login');
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
          <h1 className="title has-text-centered mb-5">הרשמה ל-Workshop Hub</h1>
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
            צור חשבון חדש 🚀
          </button>
          <p className="mt-4 has-text-centered is-size-7">
            כבר יש לכם חשבון? <Link to="/login" className="has-text-link">התחברו כאן</Link>
          </p>
        </form>
      </div>
    </div>
  );
}