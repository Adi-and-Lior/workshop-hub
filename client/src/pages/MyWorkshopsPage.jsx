import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import WorkshopCard from '../components/WorkshopCard';
import { getMyWorkshops } from '../services/workshopService';

export default function MyWorkshopsPage() {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // שליפת הסדנאות האישיות של המשתמש המחובר
    getMyWorkshops()
      .then((data) => {
        setWorkshops(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("לא הצלחנו לטעון את הסדנאות שלך.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="section">
      <div className="container">
        {/* כותרת העמוד */}
        <h1 className="title is-2 has-text-centered mb-6" style={{ fontWeight: 800 }}>
          הסדנאות שלי 🛠️
        </h1>

        {/* מצב טעינה */}
        {loading && (
          <div className="has-text-centered py-6">
            <div className="button is-loading is-white is-large"></div>
          </div>
        )}

        {/* הודעת שגיאה */}
        {error && (
          <div className="notification is-danger is-light has-text-centered">
            {error}
          </div>
        )}

        {/* הצגת הנתונים לאחר טעינה */}
        {!loading && !error && (
          <>
            {workshops.length > 0 ? (
              <div className="columns is-multiline">
                {workshops.map((item) => (
                  <div className="column is-4-desktop is-6-tablet" key={item._id}> 
                    {/* עטיפת הכרטיס בקישור לדף הפרטים, בדיוק כמו בדף הבית */}
                    <Link to={`/workshop/${item._id}`}>
                      <WorkshopCard 
                        {...item} 
                        id={item._id} 
                        image={item.image || 'https://picsum.photos/400/300'} 
                      />
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              /* במידה ואין סדנאות */
              <div className="box has-text-centered py-6 mt-5">
                <p className="subtitle is-4 has-text-grey">עדיין לא פרסמת אף סדנה 🛠️</p>
                <Link to="/add-workshop" className="button is-primary is-rounded">
                  צרו את הסדנה הראשונה שלכם
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}