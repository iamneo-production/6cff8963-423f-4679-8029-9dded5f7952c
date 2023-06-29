export function validateEmployeeId(value) {
    if (value && !Number.isInteger(Number(value))) {
      return "Employee ID must be an integer";
    }
    return "";
  }
  
  export function validateEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailRegex.test(value)) {
      return "Invalid email format";
    }
    return "";
  }
  
  export function validateName(name) {
    if (!name) {
      return "This field is required.";
    }
    const regex = /^[a-zA-Z\s]+$/;
    if (!regex.test(name)) {
      return "Name should only contain letters and spaces.";
    }
  
    return "";
  }
  
  export function validatePassword(value) {
    if (value.length < 6) {
      return "Password should be at least 6 characters";
    }
  } 
  