import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// הנה החיבור לקומפוננטה שיצרת!
import WorkshopCard from '../components/WorkshopCard'; 

// שימי לב: מחקתי את השורות של services/workshopService ו-services/citiesService
// כי הקבצים האלו עדיין לא קיימים אצלך.

export default function HomePage() {
  
  // יצרתי פה נתונים "בכאילו" כדי שיהיה מה להציג בכרטיסיות
  const [workshops] = useState([
    { 
      id: 1, 
      title: 'סדנת בישול איטלקי', 
      category: 'בישול', 
      price: 250, 
      city: 'תל אביב',
      image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=600&q=60' 
    },
    { 
      id: 2, 
      title: 'קדרות למתחילים', 
      category: 'אומנות', 
      price: 180, 
      city: 'ירושלים',
      image: 'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=600&q=60' 
    },
    { 
      id: 3, 
      title: 'יוגה בשקיעה', 
      category: 'ספורט', 
      price: 50, 
      city: 'חיפה',
      image: 'https://images.unsplash.com/photo-1599447421405-0e32096d3033?w=600&q=60' 
    },
  ]);

  return (
    <div className="home-page">
      {/* 1. Hero Section - הבאנר העליון */}
      <section className="hero-section">
        <div className="container has-text-centered">
          <h1 className="title is-1 has-text-white mb-4">
            ברוכים הבאים ל-Workshop Hub
          </h1>
          <p className="subtitle is-4 has-text-light">
            המקום שבו אנשים מוכשרים מלמדים אנשים סקרנים.
          </p>
        </div>
      </section>

      {/* 2. אזור הכרטיסיות */}
      <div className="container mt-6 mb-6">
        <h2 className="title is-3 has-text-centered mb-5">סדנאות פופולריות</h2>
        
        <div className="columns is-multiline">
          {workshops.map((workshop) => (
            <div className="column is-4-desktop is-6-tablet" key={workshop.id}>
              {/* כאן אנחנו משתמשים בכרטיסייה החדשה שיצרת ב-components */}
              <WorkshopCard {...workshop} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}