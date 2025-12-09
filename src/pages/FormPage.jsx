import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createWorkshop } from '../services/workshopService';
import { getCities } from '../services/citiesService';

export default function FormPage() {
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [loadingCities, setLoadingCities] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('arts');
  const [customCategory, setCustomCategory] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    image: '', 
    city: '',
    difficulty: 'beginner'
  });
  
  useEffect(() => {
    getCities()
      .then(data => {
        setCities(data);
        setLoadingCities(false);
      })
      .catch((err) => {
        console.error("Error loading cities", err);
        setLoadingCities(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 60000) {
      alert("הקובץ גדול מדי (מוגבל ל-60KB). אנא בחר תמונה קטנה יותר.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const finalCategory = selectedCategory === 'other' ? customCategory : selectedCategory;

    const dataToSave = {
      ...formData,
      category: finalCategory,
    };

    try {
      await createWorkshop(dataToSave);
      alert('הסדנה נוספה בהצלחה!');
      navigate('/');
    } catch (error) {
      console.error("Failed to save:", error);
      alert('שגיאה בשמירת הנתונים');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="hero-section" style={{ paddingBottom: '6rem', borderRadius: '0 0 30px 30px' }}>
        <div className="container has-text-centered">
          <h1 className="title is-2 has-text-white mb-2" style={{ fontWeight: 700 }}>
            יצירת סדנה חדשה
          </h1>
          <p className="subtitle is-6 has-text-light" style={{ opacity: 0.9 }}>
            מלאו את הפרטים כדי לפרסם את הסדנה בקטלוג
          </p>
        </div>
      </div>
      <div className="section" style={{ marginTop: '-5rem' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          
          <form 
            onSubmit={handleSubmit} 
            className="box purple-form-box"
            style={{ 
              borderRadius: '12px', 
              padding: '3rem', 
              border: '1px solid #eee',
              boxShadow: '0 15px 35px rgba(0,0,0,0.05)'
            }}
          >  
            <div className="columns is-variable is-5 mb-4">
              <div className="column is-8">
                <div className="field">
                  <label className="label has-text-grey-dark">שם הסדנה</label>
                  <div className="control">
                    <input 
                      className="input is-medium" 
                      type="text" 
                      name="title" 
                      value={formData.title} 
                      onChange={handleChange} 
                      required minLength={3}
                      placeholder="למשל: יסודות הצילום הדיגיטלי"
                    />
                  </div>
                </div>
              </div>

              <div className="column is-4">
                <div className="field">
                  <label className="label has-text-grey-dark">מחיר (₪)</label>
                  <div className="control">
                    <input 
                      className="input is-medium" 
                      type="number" 
                      name="price" 
                      value={formData.price} 
                      onChange={handleChange} 
                      required min={1}
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="columns is-variable is-5 mb-4">
              <div className="column">
                <div className="field">
                  <label className="label has-text-grey-dark">קטגוריה</label>
                  <div className="control">
                    <div className="select is-fullwidth is-medium">
                      <select 
                        value={selectedCategory} 
                        onChange={(e) => setSelectedCategory(e.target.value)}
                      >
                        <option value="arts">אומנות ועיצוב</option>
                        <option value="tech">טכנולוגיה ופיתוח</option>
                        <option value="cooking">בישול ואפייה</option>
                        <option value="sports">ספורט ותנועה</option>
                        <option value="pets">בעלי חיים</option>
                        <option value="music">מוזיקה וסאונד</option>
                        <option value="gardening">גינון וטבע</option>
                        <option value="finance">פיננסים ועסקים</option>
                        <option value="other">אחר...</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                {selectedCategory === 'other' && (
                  <div className="field mt-2">
                     <div className="control">
                       <input 
                          className="input" 
                          type="text" 
                          placeholder="הזן שם קטגוריה חדשה"
                          value={customCategory}
                          onChange={(e) => setCustomCategory(e.target.value)}
                          required
                       />
                     </div>
                  </div>
                )}
              </div>
              <div className="column">
                 <div className="field">
                    <label className="label has-text-grey-dark">רמת קושי</label>
                    <div className="control">
                      <div className="select is-fullwidth is-medium">
                        <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
                          <option value="beginner">רמת מתחילים</option>
                          <option value="intermediate">רמה בינונית</option>
                          <option value="advanced">רמת מתקדמים</option>
                        </select>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
            <div className="field mb-5">
              <label className="label has-text-grey-dark">מיקום הסדנה</label>
              <div className="control">
                <input 
                  className={`input is-medium ${loadingCities ? 'is-loading' : ''}`}
                  type="text" list="cities-list" name="city"
                  value={formData.city} onChange={handleChange}
                  placeholder="הקלד עיר לחיפוש..." disabled={loadingCities}
                />
                <datalist id="cities-list">
                  {cities.map((city, index) => <option key={index} value={city} />)}
                </datalist>
              </div>
            </div>
            <div className="field mb-5">
              <label className="label has-text-grey-dark">תיאור מלא</label>
              <div className="control">
                <textarea 
                  className="textarea" 
                  name="description" 
                  value={formData.description} 
                  onChange={handleChange}
                  rows="5"
                  placeholder="פרט על התכנים, הציוד הנדרש ומה המשתתפים יקבלו..."
                ></textarea>
              </div>
            </div>
            <div className="field mb-6">
              <label className="label has-text-grey-dark">תמונה ראשית</label>
              <div className="file has-name is-fullwidth is-boxed">
                <label className="file-label">
                  <input className="file-input" type="file" accept="image/*" onChange={handleImageUpload} />
                  <span className="file-cta">
                    <span className="file-icon">
                      <i className="fas fa-upload"></i> 
                    </span>
                    <span className="file-label has-text-centered">
                      לחץ כאן להעלאת תמונה
                    </span>
                  </span>
                  <span className="file-name">
                    {formData.image ? 'קובץ תמונה נבחר והוטען' : 'לא נבחר קובץ'}
                  </span>
                </label>
              </div>
              
              {formData.image && (
                  <div className="mt-4 p-2" style={{ border: '1px dashed #ccc', borderRadius: '8px', display: 'inline-block' }}>
                      <figure className="image is-128x128">
                          <img src={formData.image} alt="Preview" style={{ objectFit: 'cover', borderRadius: '4px' }} />
                      </figure>
                  </div>
              )}
            </div>

            <hr className="mb-5" />
            
            <div className="buttons is-right">
                <button 
                  className={`button is-medium px-6 gradient-button ${isSubmitting ? 'is-loading' : ''}`}
                >
                 פרסם סדנה...🚀
                </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}