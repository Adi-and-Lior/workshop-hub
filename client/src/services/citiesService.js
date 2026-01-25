const CITIES_API_URL = 'https://data.gov.il/api/3/action/datastore_search?resource_id=5c78e9fa-c2e2-4771-93ff-7f400a12f7ba&limit=3000';

export const getCities = async () => {
  try {
    const response = await fetch(CITIES_API_URL); 
    if (!response.ok) {
      throw new Error('Failed to fetch cities');
    }
    const data = await response.json();
    const cities = data.result.records.map(record => record['שם_ישוב'].trim()).filter(city => city !== 'לא רשום');
    
    return cities;
  } catch (error) {
    console.error("Error loading cities:", error);
    throw error;
  }
};