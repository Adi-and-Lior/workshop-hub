import React from 'react';

export default function WorkshopCard(props) {
  const { title, image, price, category, difficulty, city } = props;
  const getCategoryHebrew = (catEn) => {
    const dictionary = {
      'arts': 'אומנות', 'tech': 'טכנולוגיה', 'cooking': 'בישול',
      'sports': 'ספורט', 'pets': 'חיות מחמד', 'music': 'מוזיקה',
      'gardening': 'גינון', 'finance': 'פיננסים'
    };
    return dictionary[catEn] || catEn;
  };

  const getDifficultyColor = (level) => {
    if (level === 'advanced') return 'is-danger';     
    if (level === 'intermediate') return 'is-warning';
    return 'is-success';                         
  };

  const getDifficultyText = (level) => {
    if (level === 'advanced') return 'למתקדמים';
    if (level === 'intermediate') return 'בינוני';
    return 'למתחילים';
  };

  return (
    <div className="card h-100" style={{ display: 'flex', flexDirection: 'column' }}>      
      <div className="card-image">
        <figure className="image is-4by3">
          <img 
            src={image} 
            alt={title} 
            style={{ objectFit: 'cover' }} 
          />
        </figure>
      </div>
      <div className="card-content" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <p className="title is-5 mb-3" style={{ fontWeight: 700, color: '#2d3436' }}>
            {title}
          </p>
          <div className="tags mb-4">
             <span 
                className="tag" 
                style={{ 
                    color: '#8e4dd3ff', 
                }}
             >
              {getCategoryHebrew(category)}
             </span>             
             {city && (
               <span className="tag is-white" style={{ border: '1px solid #eee', color: '#636e72' }}>
                 📍 {city}
               </span>
             )}
          </div>
        </div>
        <div className="level is-mobile mt-2" style={{ borderTop: '1px solid #f5f6fa', paddingTop: '15px' }}>
          <div className="level-right">
            <span className="title is-4" style={{ color: '#6c5ce7' }}>
              ₪{price}
            </span>
          </div>
          <div className="level-left">
            <span 
              className={`tag ${getDifficultyColor(difficulty)} is-light`} 
              style={{ fontWeight: 'bold' }}
            >
              {getDifficultyText(difficulty)}
            </span>
          </div>          
        </div>
      </div>
    </div>
  );
}