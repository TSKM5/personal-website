import { Dimensions } from "./types/GeneralTypes";

export function getDimensionsByClassName(className: string): Dimensions {
    const element = document.querySelector(`.${className}`);
    if (element) {
      return {
        width: element.clientWidth,
        height: element.clientHeight
      };
    }
    return {
        width: 0, 
        height: 0,
    };
}
  
export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
} 

export function isValidPassword(password: string): boolean {
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);
  const hasMinimumLength = password.length >= 8;

  return hasUppercase && hasLowercase && hasDigit && hasSpecialCharacter && hasMinimumLength;
}


export function isValidName(name: string): boolean {
  const regex = /^[a-zA-Z ]{2,30}$/;
  const isValid = regex.test(name);
  console.log(isValid);
  return isValid;
}