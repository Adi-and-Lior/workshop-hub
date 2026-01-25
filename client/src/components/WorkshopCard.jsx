import React from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { toggleFavorite } from '../store/favoritesSlice';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; 
import { translateCategory, getDifficultyText, getDifficultyColor } from '../utils/translations';

export default function WorkshopCard(props) {
  const { id, title, image, price, category, difficulty, city } = props;
  const dispatch = useDispatch();
  
  const favorites = useSelector((state) => state.favorites.items);
  const isFav = favorites.includes(id);

  const handleFavoriteClick = (e) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    dispatch(toggleFavorite(id)); 
  };

  return (
    <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <button 
        onClick={handleFavoriteClick}
        className="button is-white is-rounded shadow-sm"
        style={{
          position: 'absolute', top: '15px', right: '15px', zIndex: 5,
          color: isFav ? '#ff4757' : '#ced4da', border: 'none'
        }}
        title={isFav ? "הסר מהמועדפים" : "הוסף למועדפים"}
      >
        {isFav ? <FaHeart size={22} /> : <FaRegHeart size={22} />}
      </button>

      <div className="card-image">
        <figure className="image is-4by3">
          <img 
            src={image || 'https://picsum.photos/400/300'} 
            alt={title} 
            style={{ objectFit: 'cover' }} 
          />
        </figure>
      </div>
      
      <div className="card-content" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <p className="title is-5 mb-3" style={{ fontWeight: 700, color: '#2d3436' }}>{title}</p>
          <div className="tags mb-4">
             <span className="tag" style={{ color: '#8e4dd3', backgroundColor: '#f3e8ff', fontWeight: 'bold' }}>
              {translateCategory(category)}
             </span>             
             {city && (
               <span className="tag is-white" style={{ border: '1px solid #eee', color: '#636e72' }}>📍 {city}</span>
             )}
          </div>
        </div>

        <div className="level is-mobile mt-2" style={{ borderTop: '1px solid #f5f6fa', paddingTop: '15px' }}>
          <div className="level-right">
            <span className="title is-4" style={{ color: '#6c5ce7' }}>₪{price}</span>
          </div>
          <div className="level-left">
            <span className={`tag ${getDifficultyColor(difficulty)} is-light`} style={{ fontWeight: 'bold' }}>
               {getDifficultyText(difficulty)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}