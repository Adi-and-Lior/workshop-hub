import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createWorkshop, updateWorkshop, getWorkshopById } from '../services/workshopService';
import { useFetch } from '../hooks/useFetch'; 

const CITIES_API_URL = 'https://data.gov.il/api/3/action/datastore_search?resource_id=5c78e9fa-c2e2-4771-93ff-7f400a12f7ba&limit=3000';

export default function FormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('arts');
  const [customCategory, setCustomCategory] = useState('');
  const [errors, setErrors] = useState({});

  const { data: citiesData, loading: loadingCities } = useFetch(CITIES_API_URL);
  const cities = citiesData?.result?.records?.map(r => r['שם_ישוב'].trim()) || [];

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    image: '', 
    city: '',
    difficulty: 'beginner' 
  });

  useEffect(() => {
    if (isEditMode) {
      const fetchWorkshopData = async () => {
        try {
          const data = await getWorkshopById(id);
          setFormData({
            title: data.title,
            price: data.price,
            description: data.description,
            image: data.image || '',
            city: data.city,
            difficulty: data.difficulty || 'beginner'
          });
          
          const categories = ['arts', 'tech', 'cooking', 'sports', 'pets', 'music', 'gardening', 'finance'];
          if (categories.includes(data.category)) {
            setSelectedCategory(data.category);
          } else {
            setSelectedCategory('other');
            setCustomCategory(data.category);
          }
        } catch (err) {
          setErrors({ server: "שגיאה בטעינת נתוני הסדנה לעריכה" });
        }
      };
      fetchWorkshopData();
    }
  }, [id, isEditMode]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors({ ...errors, image: "הקובץ גדול מדי (מקסימום 2MB)" });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (formData.title.length < 3) newErrors.title = "שם הסדנה חייב להכיל לפחות 3 תווים";
    if (!formData.price || formData.price <= 0) newErrors.price = "יש להזין מחיר תקין הגבוה מ-0";
    if (!formData.city) newErrors.city = "חובה לבחור עיר מהרשימה";
    if (formData.description.length < 10) newErrors.description = "התיאור קצר מדי (מינימום 10 תווים)";
    if (selectedCategory === 'other' && !customCategory) newErrors.category = "יש להזין שם לקטגוריה החדשה";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return; 

    setIsSubmitting(true);
    const finalCategory = selectedCategory === 'other' ? customCategory : selectedCategory;
    const finalData = { ...formData, category: finalCategory };

    try {
      if (isEditMode) {
        await updateWorkshop(id, finalData);
      } else {
        await createWorkshop(finalData);
      }
      navigate(isEditMode ? `/workshop/${id}` : '/'); 
    } catch (error) {
      setErrors({ server: error.message || "אופס! חלה שגיאה בשרת. נסה שנית מאוחר יותר." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="hero-section">
        <div className="container has-text-centered">
          <h1 className="title is-2 has-text-white mb-2">
            {isEditMode ? 'עריכת סדנה' : 'יצירת סדנה חדשה'}
          </h1>
        </div>
      </div>

      <div className="section" style={{ marginTop: '-5rem' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <form onSubmit={handleSubmit} className="box purple-form-box p-6">
            
            <div className="field mb-4">
              <label className="label">שם הסדנה</label>
              <div className="control">
                <input 
                  className={`input ${errors.title ? 'is-danger' : ''}`}
                  type="text" name="title" value={formData.title} onChange={handleChange} 
                />
              </div>
              {errors.title && <p className="help is-danger">{errors.title}</p>}
            </div>

            <div className="field mb-4">
              <label className="label">תמונת הסדנה</label>
              {formData.image && (
                <div className="mb-3">
                  <figure className="image is-4by3" style={{ maxWidth: '200px', margin: '0 auto' }}>
                    <img src={formData.image} alt="Preview" style={{ borderRadius: '10px', objectFit: 'cover' }} />
                  </figure>
                </div>
              )}
              <div className="file has-name is-fullwidth is-lilac">
                <label className="file-label">
                  <input className="file-input" type="file" accept="image/*" onChange={handleFileChange} />
                  <span className="file-cta">
                    <span className="file-label">בחר קובץ תמונה...</span>
                  </span>
                  <span className="file-name">
                    {formData.image ? 'תמונה נבחרה ✅' : 'לא נבחר קובץ'}
                  </span>
                </label>
              </div>
              {errors.image && <p className="help is-danger">{errors.image}</p>}
            </div>

            <div className="columns">
              <div className="column is-4">
                <div className="field">
                  <label className="label">מחיר (₪)</label>
                  <input 
                    className={`input ${errors.price ? 'is-danger' : ''}`}
                    type="number" name="price" value={formData.price} onChange={handleChange} 
                  />
                  {errors.price && <p className="help is-danger">{errors.price}</p>}
                </div>
              </div>

              <div className="column">
                <div className="field">
                  <label className="label">עיר</label>
                  <div className={`control ${loadingCities ? 'is-loading' : ''}`}>
                    <input 
                      className={`input ${errors.city ? 'is-danger' : ''}`}
                      list="cities-list" name="city" value={formData.city} onChange={handleChange}
                      placeholder="הקלד שם עיר..."
                    />
                    <datalist id="cities-list">
                      {cities.map((city, i) => <option key={i} value={city} />)}
                    </datalist>
                  </div>
                  {errors.city && <p className="help is-danger">{errors.city}</p>}
                </div>
              </div>
            </div>

            <div className="columns">
              <div className="column">
                <div className="field">
                  <label className="label">קטגוריה</label>
                  <div className="control">
                    <div className="select is-fullwidth">
                      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="arts">אומנות</option>
                        <option value="tech">טכנולוגיה</option>
                        <option value="cooking">בישול</option>
                        <option value="sports">ספורט</option>
                        <option value="pets">חיות מחמד</option>
                        <option value="music">מוזיקה</option>
                        <option value="gardening">גינון</option>
                        <option value="finance">פיננסים</option>
                        <option value="other">אחר...</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="column">
                <div className="field">
                  <label className="label">רמת קושי</label>
                  <div className="control">
                    <div className="select is-fullwidth">
                      <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
                        <option value="beginner">למתחילים</option>
                        <option value="intermediate">בינוני</option>
                        <option value="advanced">למתקדמים</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {selectedCategory === 'other' && (
              <div className="field mb-4">
                <label className="label">שם הקטגוריה החדשה</label>
                <input 
                  className={`input ${errors.category ? 'is-danger' : ''}`}
                  type="text" value={customCategory} onChange={(e) => setCustomCategory(e.target.value)}
                />
                {errors.category && <p className="help is-danger">{errors.category}</p>}
              </div>
            )}

            {/* תיאור */}
            <div className="field mb-4">
              <label className="label">תיאור הסדנה</label>
              <textarea 
                className={`textarea ${errors.description ? 'is-danger' : ''}`}
                name="description" value={formData.description} onChange={handleChange}
              />
              {errors.description && <p className="help is-danger">{errors.description}</p>}
            </div>

            {errors.server && <div className="notification is-danger is-light">{errors.server}</div>}

            <div className="buttons is-right mt-5">
              <button type="button" className="button is-light" onClick={() => navigate(-1)}>ביטול</button>
              <button type="submit" className={`button gradient-button ${isSubmitting ? 'is-loading' : ''}`}>
                {isEditMode ? 'שמור שינויים ✨' : 'פרסם סדנה 🚀'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}