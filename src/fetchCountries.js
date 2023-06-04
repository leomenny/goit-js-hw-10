export async function fetchCountries(url) {
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
  
      return data;
    } catch (error) {
      throw new Error(`Error fetching countries: ${error.message}`);
    }
  }