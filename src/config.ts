
const config =  {
  API: isLocalEnv() ? 'http://localhost:7071/api' : 'https://dimas-api-fn.azurewebsites.net/api',
  isProdEnv: !isLocalEnv(),
};

export default config;

export function isLocalEnv() {
  return process.env.REACT_APP_ENV === 'LOCAL';
}