export const fetchWeather = async (country?: string, city?: string): Promise<any> => {
  const responseTxt = await fetch(`https://api.weatherbit.io/v2.0/current?city=${city}&country=${country}&key=6730704688bd4e2f8f3d280f2732353a`);
  const response = await responseTxt.json();

  if (Array.isArray(response.data)) {
    return response.data[0];
  }

  throw new Error('Incorrect response');
}