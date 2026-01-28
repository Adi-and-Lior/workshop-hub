export const BASE_URL = import.meta.env.VITE_API_URL;
export const API_URL = `${BASE_URL}/api/workshops`;

const getAuthHeaders = () => {
  let token = localStorage.getItem('app_token');
  
  if (token && token.startsWith('"') && token.endsWith('"')) {
    token = token.slice(1, -1);
  }

  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

export const getAllWorkshops = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'שגיאה בטעינת הסדנאות מהשרת');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching workshops:", error);
    throw error;
  }
};

export const getMyWorkshops = async () => {
  try {
    const response = await fetch(`${API_URL}/my`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'שגיאה בשליפת הסדנאות שלך');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching my workshops:", error);
    throw error;
  }
};

export const getWorkshopById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error('הסדנה המבוקשת לא נמצאה בשרת');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching workshop:", error);
    throw error;
  }
};

export const createWorkshop = async (workshopData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: getAuthHeaders(), 
      body: JSON.stringify(workshopData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'שגיאה ביצירת הסדנה בשרת');
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating workshop:", error);
    throw error;
  }
};

export const updateWorkshop = async (id, workshopData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(), 
      body: JSON.stringify(workshopData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'שגיאה בעדכון פרטי הסדנה');
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating workshop:", error);
    throw error;
  }
};

export const deleteWorkshop = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'שגיאה במחיקת הסדנה מהשרת');
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting workshop:", error);
    throw error;
  }
};