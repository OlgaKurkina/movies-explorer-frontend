import { useState } from "react";

export default function useForm() {
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({});
  const [isCorrect, setIsCorrect] = useState(false);

  function handleChange(evt) {
    const name = evt.target.name;
    const value = evt.target.value;

    setFormValue({
      ...formValue,
      [name]: value,
    });

    setError({ ...error, [name]: evt.target.validationMessage });
    console.log(value);
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
