const SERVER = process.env.REACT_APP_SERVER;

export const sendIssuesRequest = async () => {
  try {
    const response = await fetch(`${SERVER}/issues`);

    if (!response.ok) throw new Error(); 

    return response.json();
  } catch (error) {
    throw new Error();
  }
}