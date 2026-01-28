import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 
import { toggleFavorite } from '../store/favoritesSlice';
import { useFetch } from '../hooks/useFetch'; 
import { API_URL, deleteWorkshop } from '../services/workshopService'; 
import { useLocalStorage } from '../hooks/useLocalStorage';
import { FaHeart, FaRegHeart, FaTrash, FaEdit } from 'react-icons/fa';
import { translateCategory, getDifficultyText, getDifficultyColor } from '../utils/translations';

export default function WorkshopDetailsPage() {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [user] = useLocalStorage('app_user', null);
  const [theme] = useLocalStorage('app_theme', 'light'); 
  const favorites = useSelector((state) => state.favorites.items);
  const isFav = favorites.includes(id);

  const { data: workshop, loading: workshopLoading, error: workshopError } = useFetch(`${API_URL}/${id}`);
  const { data: mentorsData, loading: mentorsLoading } = useFetch(`https://randomuser.me/api/?results=3&seed=workshop-${id}`);

  const mentors = mentorsData?.results || [];

  const isOwner = workshop && user && (
    workshop.createdBy?._id === user.id || 
    workshop.createdBy === user.id || 
    user.role === 'admin'
  );

  const handleDelete = async () => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק את הסדנה הזו?')) {
      try {
        await deleteWorkshop(id);
        navigate('/');
      } catch (err) {
        alert(err.message);
      }
    }
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
                        <span className="tag is-lilac">{translateCategory(workshop.category)}</span>
                        {workshop.city && <span className="tag is-white" style={{border: '1px solid #e6e6fa'}}>📍 {workshop.city}</span>}
                        
                        <span className={`tag ${getDifficultyColor(workshop.difficulty)} is-light has-text-weight-bold`}>
                           📊 {getDifficultyText(workshop.difficulty)}
                        </span>

                        {workshop.createdBy?.username && (
                          <span className="tag is-info is-light">👤 נוצר ע"י: {workshop.createdBy.username}</span>
                        )}
                        {user?.role === 'admin' && <span className="tag is-danger is-light">🛡️ Admin Mode</span>}
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
                            <div className="buttons">
                                {isOwner ? (
                                  <>
                                    <Link to={`/edit-workshop/${id}`} className="button is-warning is-outlined px-6">
                                      <FaEdit className="ml-2" /> ערוך סדנה
                                    </Link>
                                    <button onClick={handleDelete} className="button is-danger is-outlined px-6">
                                      <FaTrash className="ml-2" /> מחק סדנה
                                    </button>
                                  </>
                                ) : (
                                  <button className="button gradient-button is-large px-6">
                                      הירשם עכשיו ✨
                                  </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h2 className="title is-3 mb-5">הכירו את המדריכים 🎓</h2>
            {mentorsLoading ? (
              <p>טוען מדריכים...</p>
            ) : (
              <div className="columns is-multiline">
                {mentors.map((mentor, index) => (
                  <div key={index} className="column is-4">
                    <div className="box is-flex is-align-items-center" style={{ borderRadius: '15px' }}>
                      <figure className="image is-64x64 ml-4">
                        <img className="is-rounded" src={mentor.picture.medium} alt={mentor.name.first} />
                      </figure>
                      <div>
                        <p className="title is-5 mb-1">{mentor.name.first} {mentor.name.last}</p>
                        <p className="subtitle is-6 has-text-grey">מדריך סדנת {translateCategory(workshop.category)}</p>
                      </div>
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