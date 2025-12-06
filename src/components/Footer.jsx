import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleEmptyLink = (e) => {
    e.preventDefault(); // עוצר את התנהגות ברירת המחדל של הדפדפן
  };
  
  return (
    <footer className="footer-custom">
      <div className="container">
        <div className="columns is-vcentered">
          
          {/* צד ימין - לוגו וזכויות יוצרים */}
          <div className="column has-text-centered-mobile">
            <h3 className="title is-5 has-text-white mb-2">Workshop Hub</h3>
            <p className="subtitle is-7 has-text-grey-light">
              כל הזכויות שמורות © {currentYear}
            </p>
          </div>

          {/* מרכז - קישורים מהירים (אופציונלי) */}
          <div className="column has-text-centered">
            <div className="footer-links">
                <a href="#" onClick={handleEmptyLink}>אודות</a>
                <a href="#" onClick={handleEmptyLink}>תנאי שימוש</a>
                <a href="#" onClick={handleEmptyLink}>צור קשר</a>
            </div>
          </div>

          {/* צד שמאל - רשתות חברתיות */}
          <div className="column has-text-centered-mobile is-flex is-justify-content-flex-end is-justify-content-center-mobile">
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="icon-link">
                <FaFacebook size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="icon-link">
                <FaInstagram size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="icon-link">
                <FaTwitter size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="icon-link">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}