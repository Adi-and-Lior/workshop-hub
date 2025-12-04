import React from 'react';

export default function WorkshopCard(props) {
  const { title, image, price, category, difficulty, city } = props;

  // --- מילון תרגום לקטגוריות ---
  const getCategoryHebrew = (catEn) => {
    const dictionary = {
      'arts': 'אומנות', 'tech': 'טכנולוגיה', 'cooking': 'בישול',
      'sports': 'ספורט', 'pets': 'חיות מחמד', 'music': 'מוזיקה',
      'gardening': 'גינון', 'finance': 'פיננסים'
    };
    return dictionary[catEn] || catEn;
  };

  // --- לוגיקה לרמת קושי (רמזור: ירוק/צהוב/אדום) ---
  const getDifficultyColor = (level) => {
    if (level === 'advanced') return 'is-danger';       // 🔴 אדום
    if (level === 'intermediate') return 'is-warning';  // 🟡 צהוב
    return 'is-success';                                // 🟢 ירוק
  };

  const getDifficultyText = (level) => {
    if (level === 'advanced') return 'למתקדמים';
    if (level === 'intermediate') return 'בינוני';
    return 'למתחילים';
  };

  return (
    <div className="card h-100" style={{ display: 'flex', flexDirection: 'column' }}>
      
      {/* תמונה */}
      <div className="card-image">
        <figure className="image is-4by3">
          <img 
            src={image} 
            alt={title} 
            style={{ objectFit: 'cover' }} 
          />
        </figure>
      </div>

      {/* תוכן הכרטיס */}
      <div className="card-content" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        
        <div>
          {/* כותרת */}
          <p className="title is-5 mb-3" style={{ fontWeight: 700, color: '#2d3436' }}>
            {title}
          </p>

          {/* תגיות עליונות */}
          <div className="tags mb-4">
             {/* --- התיקון כאן: צבע לילך (סגלגל) מפורש --- */}
             <span 
                className="tag" 
                style={{ 
                    color: '#8e4dd3ff',           // טקסט סגול עמוק
                }}
             >
              {getCategoryHebrew(category)}
             </span>
             
             {/* עיר - נקי עם מסגרת */}
             {city && (
               <span className="tag is-white" style={{ border: '1px solid #eee', color: '#636e72' }}>
                 📍 {city}
               </span>
             )}
          </div>
        </div>

        {/* חלק תחתון (מחיר ורמה) */}
        <div className="level is-mobile mt-2" style={{ borderTop: '1px solid #f5f6fa', paddingTop: '15px' }}>
          
          {/* מחיר - סגול מודגש */}
          <div className="level-right">
            <span className="title is-4" style={{ color: '#6c5ce7' }}>
              ₪{price}
            </span>
          </div>

          {/* רמת קושי - צבעונית (רמזור) */}
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