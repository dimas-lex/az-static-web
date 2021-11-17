import { ISubmitRate } from "./ratesSlice";

export const fetchRates = async (quantity: number): Promise<any> => {
  const responseTxt = await fetch(`/api/rates?quantity=${quantity}&key=123`);
  const response = await responseTxt.json();

  if (!response.success) {
    throw new Error('Incorrect response'); }

  if (Array.isArray(response.data)) {
    return response.data;
  }

  throw new Error('Incorrect response');
}

export const submitRateApi = async (rate: ISubmitRate): Promise<any> => {
  const promise = new Promise((resolve) => {
    setTimeout(() => resolve({success: true}), 4000)
  });

  return promise;
}