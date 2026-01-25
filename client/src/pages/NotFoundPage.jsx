// src/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="section has-text-centered py-6">
      <h1 className="title is-1" style={{ fontSize: '6rem' }}>404</h1>
      <p className="subtitle is-3">אופס! הדף לא נמצא.</p>
      <Link to="/" className="button is-primary is-medium mt-4">
        חזרה לדף הבית
      </Link>
    </div>
  );
}