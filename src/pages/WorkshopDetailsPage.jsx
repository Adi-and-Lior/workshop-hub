import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 
import { toggleFavorite } from '../store/favoritesSlice';
import { useFetch } from '../hooks/useFetch'; 
import { FaHeart, FaRegHeart } from 'react-icons/fa';

export default function WorkshopDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const favorites = useSelector((state) => state.favorites.items);
  const isFav = favorites.includes(id);

  const { 
    data: workshop, 
    loading: workshopLoading, 
    error: workshopError 
  } = useFetch(`https://692b3c227615a15ff24f1800.mockapi.io/workshops/${id}`);

  const { 
    data: mentorsData, 
    loading: mentorsLoading 
  } = useFetch(`https://randomuser.me/api/?results=3&seed=workshop-${id}`);

  const mentors = mentorsData?.results || [];

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

  if (workshopLoading) return <div className="section has-text-centered title is-4">טוען פרטים... ⏳</div>;
  if (workshopError || !workshop) return <div className="section has-text-centered title is-4">סדנה לא נמצאה! 😕</div>;

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
                    <div className="is-flex is-justify-content-space-between is-align-items-center mb-3">
                        <h1 className="title is-2 mb-0" style={{ fontWeight: 800 }}>{workshop.title}</h1>
                        <button 
                            className="button is-white is-rounded shadow-sm"
                            onClick={() => dispatch(toggleFavorite(id))}
                            style={{ color: isFav ? '#ff4757' : '#ced4da', border: 'none', fontSize: '1.5rem' }}
                        >
                            {isFav ? <FaHeart /> : <FaRegHeart />}
                        </button>
                    </div>
                    
                    <div className="tags are-medium mb-5">
                        <span className="tag is-lilac">{getCategoryHebrew(workshop.category)}</span>
                        {workshop.city && <span className="tag is-white" style={{border: '1px solid #e6e6fa'}}>📍 {workshop.city}</span>}
                        <span className="tag is-light">📊 {getDifficultyText(workshop.difficulty)}</span>
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
                            <button className="button gradient-button is-large px-6">
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
            {mentorsLoading ? (
                <div className="has-text-centered">טוען מדריכים...</div>
            ) : (
                <div className="columns is-centered">
                    {mentors.map(mentor => (
                    <div className="column is-3" key={mentor.login.uuid}>
                        <div className="card has-text-centered p-5" style={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 30px rgba(108, 92, 231, 0.1)' }}>
                            <figure className="image is-96x96 is-inline-block mb-3">
                            <img src={mentor.picture.large} alt="Mentor" className="is-rounded" style={{ border: '4px solid #f4f1ff' }} />
                            </figure>
                            <p className="title is-5 mb-1">{mentor.name.first} {mentor.name.last}</p>
                            <p className="subtitle is-7 has-text-grey">{mentor.email}</p>
                        </div>
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