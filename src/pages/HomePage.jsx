import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import WorkshopCard from '../components/WorkshopCard';
import { getAllWorkshops } from '../services/workshopService';
import { getCities } from '../services/citiesService';

export default function HomePage() {
  const [workshops, setWorkshops] = useState([]);
  const [cities, setCities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');

  const fetchData = () => {
    Promise.all([getAllWorkshops(), getCities()])
      .then(([workshopsData, citiesData]) => {
        setWorkshops(workshopsData);
        setCities(citiesData);
        setLoading(false); // מכבה טעינה בסוף
      })
      .catch(err => {
        console.error("Connection error:", err);
        setError("נראה שיש בעיה בחיבור לאינטרנט או שהשרת לא זמין.");
        setLoading(false); // מכבה טעינה גם בשגיאה כדי להציג את ההודעה
      });
  };

  useEffect(() => {
    fetchData(); 
  }, []);

  const handleRetry = () => {
    setLoading(true);
    setError(null);  
    fetchData();   
  };

  const getAvailableCategories = () => {
    const allCats = workshops.map(w => w.category);
    return [...new Set(allCats)];
  };

  const translateCat = (cat) => {
    const dictionary = {
      'arts': 'אומנות', 'tech': 'טכנולוגיה', 'cooking': 'בישול',
      'sports': 'ספורט', 'pets': 'חיות מחמד', 'music': 'מוזיקה',
      'gardening': 'גינון', 'finance': 'פיננסים'
    };
    return dictionary[cat] || cat; 
  };

  const getFilteredWorkshops = () => {
    return workshops.filter(workshop => {
      const hebCat = translateCat(workshop.category);
      const categoryMatch = 
          categoryFilter === '' || 
          hebCat.includes(categoryFilter) || 
          workshop.category.includes(categoryFilter);

      const cityMatch = 
          cityFilter === '' || 
          (workshop.city && workshop.city.includes(cityFilter));

      return categoryMatch && cityMatch;
    });
  };

  return (
    <div>
      <div className="hero-section">
        <div className="container has-text-centered">
          <h1 className="title is-1 has-text-white mb-4">
            מצאו את ההשראה הבאה שלכם
          </h1>
          <p className="subtitle is-4 has-text-light">
            אלפי סדנאות אומנות, טכנולוגיה ובישול מחכות לכם
          </p>
        </div>
      </div>
      <div className="section" style={{ marginTop: '-80px' }}>
        <div className="container">
                    <div className="search-container box">
            <div className="columns is-vcentered">
              <div className="column">
                <div className="field">
                  <label className="label is-small has-text-grey">מה מחפשים?</label>
                  <div className="control has-icons-right">
                    <input 
                      className="input is-medium is-rounded search-input" 
                      type="text" list="category-list" 
                      placeholder="למשל: בישול, אומנות..."
                      value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}
                    />
                    <span className="icon is-right" style={{pointerEvents: 'none', top: '5px'}}>🎨</span>
                    <datalist id="category-list">
                      {getAvailableCategories().map((cat, idx) => (
                        <option key={idx} value={translateCat(cat)} />
                      ))}
                    </datalist>
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="field">
                  <label className="label is-small has-text-grey">איפה?</label>
                  <div className="control has-icons-right">
                    <input 
                      className="input is-medium is-rounded search-input" 
                      type="text" list="cities-list" 
                      placeholder="עיר בארץ..."
                      value={cityFilter} onChange={(e) => setCityFilter(e.target.value)}
                    />
                    <span className="icon is-right" style={{pointerEvents: 'none', top: '5px'}}>📍</span>
                    <datalist id="cities-list">
                      {cities.map((city, idx) => <option key={idx} value={city} />)}
                    </datalist>
                  </div>
                </div>
              </div>

              {(categoryFilter || cityFilter) && (
                <div className="column is-narrow">
                  <button 
                    className="button is-danger is-light is-rounded is-fullwidth mt-4" 
                    onClick={() => { setCategoryFilter(''); setCityFilter(''); }}
                  >
                     נקה ✕
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="mt-6"> 
            {loading && (
               <div className="has-text-centered py-6">
                  <div className="button is-loading is-white is-large" style={{border: 'none', background: 'transparent'}}></div>
                  <p className="has-text-grey mt-2">טוען סדנאות...</p>
               </div>
            )}
            {!loading && error && (
               <div className="notification is-danger is-light has-text-centered p-5" style={{ borderRadius: '12px' }}>
                  <div className="is-size-1 mb-2">📡</div>
                  <h3 className="title is-5 has-text-danger-dark">אופס! {error}</h3>
                  <p className="mb-4">נא לבדוק את החיבור ולנסות שוב.</p>                  
                  <button className="button is-danger is-outlined" onClick={handleRetry}>
                    🔄 נסה שנית
                  </button>
               </div>
            )}
            {!loading && !error && (
              <div className="columns is-multiline">
                {getFilteredWorkshops().length > 0 ? (
                  getFilteredWorkshops().map((item) => (
                    <div className="column is-4-desktop is-6-tablet" key={item.id}>
                      <Link to={`/workshop/${item.id}`}>
                        <WorkshopCard 
                          {...item}
                          image={item.image || 'https://picsum.photos/400/300'}
                        />
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="column is-12 has-text-centered py-6">
                    <div className="is-size-1 mb-2">🔍</div>
                    <p className="title is-4 has-text-grey-light">לא מצאנו סדנאות מתאימות</p>
                    <p>נסו לשנות את מילות החיפוש או לנקות את הסינון</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}