// src/services/workshopService.js
// כתובת API זמנית עד שיהיה שרת ודאטה בייס
const API_URL = "https://692b3c227615a15ff24f1800.mockapi.io/workshops";

// פונקציה לקבלת כל הסדנאות (עבור HomePage)
export const getAllWorkshops = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch workshops');
    return await response.json();
  } catch (error) {
    console.error("Error fetching workshops:", error);
    throw error;
  }
};

// פונקציה לקבלת סדנה בודדת (עבור DetailsPage)
export const getWorkshopById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch workshop');
    return await response.json();
  } catch (error) {
    console.error("Error fetching workshop:", error);
    throw error;
  }
};

// פונקציה ליצירת סדנה חדשה (עבור FormPage)
export const createWorkshop = async (workshopData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workshopData),
    });
    if (!response.ok) throw new Error('Failed to create workshop');
    return await response.json();
  } catch (error) {
    console.error("Error creating workshop:", error);
    throw error;
  }
};