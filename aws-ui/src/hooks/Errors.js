import { useState } from "react";

export const useErrors = () => {
  const [errors, setErrors] = useState({});

  function hasError(field) {
    return errors[field] !== undefined && errors[field]
  }

  function addError(field) {
    setErrors((prev) => ({
      ...prev,
      [field]: true,
    }));
  }

  function clearErrors() {
    setErrors({})
  }

  return { hasError, addError, clearErrors }
};