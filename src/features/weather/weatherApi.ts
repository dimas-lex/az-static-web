export const fetchWeather = async (country?: string, city?: string): Promise<any> => {
  const responseTxt = await fetch(`https://dimas-api-fn.azurewebsites.net/api/weather?city=${city}&country=${country}&key=123`);
  const response = await responseTxt.json();

  if (Array.isArray(response.data)) {
    return response.data[0];
  }

  throw new Error('Incorrect response');
}