export const authenticated = () => {
  return localStorage.getItem('token') !== null;
};
