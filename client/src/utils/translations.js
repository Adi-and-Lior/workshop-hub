
export const translateCategory = (category) => {
  const dictionary = {
    'arts': 'אומנות', 'tech': 'טכנולוגיה', 'cooking': 'בישול',
    'sports': 'ספורט', 'pets': 'חיות מחמד', 'music': 'מוזיקה',
    'gardening': 'גינון', 'finance': 'פיננסים'
  };
  return dictionary[category] || category;
};

export const getDifficultyText = (level) => {
  const levels = {
    'advanced': 'למתקדמים',
    'intermediate': 'בינוני',
    'beginner': 'למתחילים'
  };
  return levels[level] || 'למתחילים';
};

export const getDifficultyColor = (level) => {
  const colors = {
    'advanced': 'is-danger',
    'intermediate': 'is-warning',
    'beginner': 'is-success'
  };
  return colors[level] || 'is-success';
};