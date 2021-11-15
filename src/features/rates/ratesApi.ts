import config from '../../config';

export const fetchRates = async (quantity: number): Promise<any> => {
  const responseTxt = await fetch(`${config.API}/api?quantity=${quantity}&key=123`);
  const response = await responseTxt.json();

  if (!response.success) {
    throw new Error('Incorrect response'); }

  if (Array.isArray(response.data)) {
    return response.data;
  }

  throw new Error('Incorrect response');
}