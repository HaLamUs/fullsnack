// api.ts
export async function fetchData(page: number, limit: number): Promise<any[]> {
  try {
    const response = await fetch(`http://localhost:8000/csv?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

// api.ts

// Define a function that fetches data from the API
export async function searchData(query: string): Promise<any> {
  try {
    const response = await fetch(`http://localhost:8000/csv/search?query=${query}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

