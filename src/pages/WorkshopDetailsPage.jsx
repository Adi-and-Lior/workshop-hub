import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getWorkshopById } from '../services/workshopService'; 

export default function WorkshopDetailsPage() {
  const { id } = useParams();
  const [workshop, setWorkshop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mentors, setMentors] = useState([]);
  const getCategoryHebrew = (catEn) => {
    const dictionary = {
      'arts': 'אומנות', 'tech': 'טכנולוגיה', 'cooking': 'בישול',
      'sports': 'ספורט', 'pets': 'חיות מחמד', 'music': 'מוזיקה',
      'gardening': 'גינון', 'finance': 'פיננסים'
    };
    return dictionary[catEn] || catEn;
  };

  const getDifficultyText = (level) => {
    if (level === 'advanced') return 'למתקדמים';
    if (level === 'intermediate') return 'בינוני';
    return 'למתחילים';
  };

  const getDifficultyColor = (level) => {
    if (level === 'advanced') return 'is-primary'; 
    if (level === 'intermediate') return 'is-link is-light'; 
    return 'is-white';
  };

  useEffect(() => {
    getWorkshopById(id)
      .then(data => {
        setWorkshop(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });

    fetch(`https://randomuser.me/api/?results=3&seed=workshop-${id}`)
      .then(res => res.json())
      .then(data => setMentors(data.results));
      
  }, [id]);

  if (loading) return <div className="section has-text-centered title is-4">טוען פרטים... ⏳</div>;
  if (!workshop) return <div className="section has-text-centered title is-4">סדנה לא נמצאה! 😕</div>;

  return (
    <div>
      <div 
        className="hero-background" 
        style={{
          backgroundImage: `url(${workshop.image || 'https://picsum.photos/400/300'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '400px',
          position: 'relative',
          borderRadius: '0 0 50px 50px',
          marginBottom: '-100px'
        }}
      >
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(45, 52, 54, 0.6)',
          borderRadius: '0 0 50px 50px',
          backdropFilter: 'blur(4px)'
        }}></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '3rem' }}>
            <Link to="/" className="button is-white is-outlined is-rounded mb-4" style={{borderWidth: '2px', fontWeight: 'bold'}}>
                → חזרה לקטלוג
            </Link>
        </div>
      </div>
      <div className="section">
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div className="box purple-form-box" style={{ padding: '0', overflow: 'hidden' }}>
            <div className="columns is-gapless">
              <div className="column is-5">
                 <figure className="image h-100" style={{ height: '100%', minHeight: '400px' }}>
                    <img 
                      src={workshop.image || 'https://picsum.photos/400/300'} 
                      alt={workshop.title} 
                      style={{ objectFit: 'cover', height: '100%' }}
                    />
                 </figure>
              </div>
              <div className="column is-7">
                <div className="p-6">
                    <h1 className="title is-2 mb-3" style={{ fontWeight: 800, color: '#2d3436' }}>{workshop.title}</h1>
                    
                    <div className="tags are-medium mb-5">
                        <span className="tag is-lilac" >
                             {getCategoryHebrew(workshop.category)}
                        </span>
                        
                        {workshop.city && (
                            <span className="tag is-white" style={{border: '1px solid #e6e6fa'}}>
                                📍 {workshop.city}
                            </span>
                        )}
                        
                        <span className={`tag ${getDifficultyColor(workshop.difficulty)}`} style={{border: '1px solid #eee'}}>
                            📊 {getDifficultyText(workshop.difficulty)}
                        </span>
                    </div>
                    <p className="subtitle is-5 has-text-grey" style={{ lineHeight: '1.8' }}>
                        {workshop.description || 'אין תיאור לסדנה זו.'}
                    </p>
                    <hr style={{backgroundColor: '#f0f0f0'}} />
                    <div className="level is-mobile mt-5">
                        <div className="level-right">
                            <div>
                                <p className="heading has-text-grey">מחיר למשתתף</p>
                                <p className="title is-3" style={{color: '#6c5ce7'}}>₪{workshop.price}</p>
                            </div>
                        </div>
                        <div className="level-left">
                            <button className="button gradient-button is-large px-6 shadow-lg">
                                הירשם עכשיו ✨
                            </button>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h2 className="title is-4 has-text-centered mb-5" style={{color: '#6c5ce7'}}>המדריכים שלנו 🎓</h2>
            <div className="columns is-centered">
                {mentors.map(mentor => (
                  <div className="column is-3" key={mentor.login.uuid}>
                    <div className="card has-text-centered p-5" style={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 30px rgba(108, 92, 231, 0.1)' }}>
                        <figure className="image is-96x96 is-inline-block mb-3">
                          <img 
                            src={mentor.picture.large} 
                            alt="Mentor" 
                            className="is-rounded" 
                            style={{ border: '4px solid #f4f1ff' }}
                          />
                        </figure>
                        <p className="title is-5 mb-1">{mentor.name.first} {mentor.name.last}</p>
                        <p className="subtitle is-7 has-text-grey">{mentor.email}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}