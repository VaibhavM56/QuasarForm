function validateField(value, rule) {
  switch (rule) {
    case "name":
      return validateName(value);
    case "hours":
      return validateHours(value);
    case "csulbid":
      return validateCSULBID(value);
    default:
      return true;
  }
}

function validateName(value) {
  return (value && value.trim().length > 0) || "Field is required";
}

function validateHours(value) {
  const hours = parseFloat(value);
  return (!isNaN(hours) && hours > 0) || "Please enter a valid number of hours";
}

function validateCSULBID(value) {
  return /^[0-9]{8}$/.test(value) || "CSULB ID must be exactly 8 digits";
}

export function useValidateField() {
  return {
    validateField,
  };
}
