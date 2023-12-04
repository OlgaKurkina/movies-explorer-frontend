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
    setIsCorrect(evt.target.closest("form").checkValidity());
  }

  function setInfo(nameData, emailData) {
    setFormValue({ name: nameData, email: emailData });
    console.log(nameData, emailData);
  }

  return {
    formValue,
    error,
    handleChange,
    isCorrect,
    setInfo,
  };
}
