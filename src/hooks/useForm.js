import { useState } from "react";
import { REG_EX_EMAIL } from "../utils/constants";

export default function useForm() {
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({});
  const [isCorrect, setIsCorrect] = useState(false);

  const emailCheck = REG_EX_EMAIL;

  function isValidEmail(email) {
    return emailCheck.test(email);
  }

  function handleChange(evt) {
    const name = evt.target.name;
    const value = evt.target.value;

    setFormValue({
      ...formValue,
      [name]: value,
    });
    if (name === "email") {
      if (!isValidEmail(evt.target.value)) {
        setError({ ...error, [name]: "Укажите корректный email" });
      } else setError({ ...error, [name]: evt.target.validationMessage });
    } else {
      setError({ ...error, [name]: evt.target.validationMessage });
    }
    setIsCorrect(evt.target.closest("form").checkValidity());
  }

  function setInfo(name, email) {
    setFormValue({ name: name, email: email });
  }

  function resetValidation(error = {}) {
    setError(error);
  }

  return {
    formValue,
    error,
    handleChange,
    isCorrect,
    setInfo,
    resetValidation,
  };
}
