export const fetchWeather = async (country?: string, city?: string): Promise<any> => {
  const responseTxt = await fetch(`/api/weather?city=${city}&country=${country}&key=123`);
  const response = await responseTxt.json();

  if (!response.success) {
    throw new Error('Incorrect response'); }

  if (Array.isArray(response.data)) {
    return response.data[0];
  }

  throw new Error('Incorrect response');
}