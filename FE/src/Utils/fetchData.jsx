export async function fetchData(url, setFunc) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    setFunc(data.labelList); 
    return data;
  } catch (error) {
    console.error(`Error fetching: ${error.message}`);
    throw error;
  }
}