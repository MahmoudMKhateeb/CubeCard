export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateMobileNumber = (number: string): boolean => {
  const mobileRegex = /^[0-9]{10}$/;
  return mobileRegex.test(number);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};