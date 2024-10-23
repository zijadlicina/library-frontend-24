export const isValidTitle = (str: string) => {
    let numberLetters = str.length;
    if (numberLetters < 3) return false;
    if (numberLetters > 15) return false;
    return true;
  }
  
  export const isValidPages = (str: string) => {
    const numericPattern = /^[0-9]+$/;
    return numericPattern.test(str);
  }
  export const isValidPublished = (str: string) => {
    const numericPattern = /^[0-9]+$/;
    if (!numericPattern.test(str)) return false;
    if (parseInt(str) < 0 || parseInt(str) > 2024) return false;
    return true;
  }
  export const isValidFirstName = (str: string) => {
    let numberLetters = str.length;
    if (numberLetters > 15) return false;
    return true;
  }
  
  export const isValidLastName = (str: string) => {
    let numberLetters = str.length;
    if (numberLetters > 15) return false;
    return true;
  }
  export const isValidDate = (dob: Date) => {
    const today = new Date();
    return dob <= today;
  }
  export const convertToValidSqlDate = (str: string) => {
    let date = new Date(str)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }