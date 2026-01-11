import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import WorkshopCard from '../components/WorkshopCard';
import { useFetch } from '../hooks/useFetch'; 
import { getCities } from '../services/citiesService';
import { API_URL } from '../services/workshopService';

export default function HomePage() {
  const [cities, setCities] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');

  const { data: workshops, loading, error, refetch } = useFetch(API_URL);

  useEffect(() => {
    getCities().then(setCities).catch(console.error);
  }, []);

  const translateCat = (cat) => {
    const dictionary = {
      'arts': 'אומנות', 'tech': 'טכנולוגיה', 'cooking': 'בישול',
      'sports': 'ספורט', 'pets': 'חיות מחמד', 'music': 'מוזיקה',
      'gardening': 'גינון', 'finance': 'פיננסים'
    };
    return dictionary[cat] || cat; 
  };

  const getFilteredWorkshops = () => {
    if (!workshops) return [];
    return workshops.filter(workshop => {
      const hebCat = translateCat(workshop.category);
      const textMatch = categoryFilter === '' || 
                         hebCat.includes(categoryFilter) || 
                         workshop.title.toLowerCase().includes(categoryFilter.toLowerCase());
      const cityMatch = cityFilter === '' || (workshop.city && workshop.city.includes(cityFilter));
      return textMatch && cityMatch;
    });
  };

  return (
    <div>
      <div className="hero-section">
        <div className="container has-text-centered">
          <h1 className="title is-1 has-text-white mb-4">מצאו את ההשראה הבאה שלכם</h1>
          <p className="subtitle is-4 has-text-light">אלפי סדנאות מחכות לכם</p>
        </div>
      </div>
      <div className="section" style={{ marginTop: '-80px' }}>
        <div className="container">
          <div className="search-container box">
            <div className="columns is-vcentered">
               <div className="column">
                  <input className="input is-rounded" type="text" placeholder="מה מחפשים?" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} />
               </div>
               <div className="column">
                  <input className="input is-rounded" type="text" placeholder="איפה?" value={cityFilter} onChange={(e) => setCityFilter(e.target.value)} />
               </div>
            </div>
          </div>

          <div className="mt-6"> 
            {loading && <div className="has-text-centered py-6"><div className="button is-loading is-white"></div></div>}
            {error && <div className="notification is-danger">{error} <button onClick={refetch}>נסה שנית</button></div>}
            {!loading && !error && (
              <div className="columns is-multiline">
                {getFilteredWorkshops().map((item) => (
                  <div className="column is-4-desktop is-6-tablet" key={item.id}>
                    <Link to={`/workshop/${item.id}`}>
                      <WorkshopCard {...item} image={item.image || 'https://picsum.photos/400/300'} />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}