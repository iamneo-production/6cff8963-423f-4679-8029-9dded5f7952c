import React, { useState, useEffect } from "react";
import { validateEmployeeId, validateEmail, validateName, validatePassword } from "./ValidationUtils";
import "../components_styles/user.css";

export default function UpdateUser(props) {
  const [formData, setFormData] = useState({
    id: props.id,
    name: props.name,
    surname: props.surname,
    emprole: props.emprole, // Updated field name
    emailid: props.emailid,
    passw: props.passw,
  });
  
  const [errors, setErrors] = useState({
    name: "",
    surname: "",
    emprole: "", // Updated field name
    emailid: "",
    passw: "",
  });
  
  useEffect(() => {
    setFormData({
      id: props.id,
      name: props.name,
      surname: props.surname,
      emprole: props.emprole,
      emailid: props.emailid,
      passw: props.passw,
    });
  }, [props.id, props.name, props.surname, props.emprole, props.emailid, props.passw]);

  function handleChange(e) {
    const { name, value } = e.target;

    let errorMessage = "";
    switch (name) {
      case "emprole":
        if (!["admin", "employee"].includes(value)) {
          errorMessage = "Invalid employee role. Please choose either 'admin' or 'employee'.";
        }
        break;
      case "emailid":
        errorMessage = validateEmail(value);
        break;
      case "name":
      case "surname":
        errorMessage = validateName(value);
        break;
      case "passw":
        errorMessage = validatePassword(value);
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  function updateUser(e) {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.surname ||
      !formData.emprole ||
      !formData.emailid ||
      !formData.passw ||
      errors.name ||
      errors.surname ||
      errors.emprole ||
      errors.emailid ||
      errors.passw
    ) {
      // Handle validation errors
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: !formData.name ? "This field is required." : prevErrors.name,
        surname: !formData.surname ? "This field is required." : prevErrors.surname,
        emprole: !formData.emprole ? "This field is required." : prevErrors.emprole,
        emailid: !formData.emailid ? "This field is required." : prevErrors.emailid,
        passw: !formData.passw ? "This field is required." : prevErrors.passw,
      }));
      return;
    }

    const request = new Request("http://localhost:8080/api/users", {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    fetch(request)
      .then((res) => res.json())
      .then(() => {
        props.update((prev) => !prev);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="updateUser">
      <label>Name</label>
      <input
        required
        type="text"
        onChange={handleChange}
        name="name"
        value={formData.name}
        className={errors.name ? "error-input" : ""}
      />

      <label>Surname</label>
      <input
        required
        type="text"
        onChange={handleChange}
        name="surname"
        value={formData.surname}
        className={errors.surname ? "error-input" : ""}
      />

          <label>Employee Role</label>
          <select
            onChange={handleChange}
            name="emprole"
            value={formData.emprole}
            required
            className={errors.emprole ? "error-input" : ""}
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
          </select>
          {errors.emprole && <span className="error-message">{errors.emprole}</span>}



      <label>Email Id</label>
      <input
        required
        type="email"
        onChange={handleChange}
        name="emailid"
        value={formData.emailid}
        className={errors.emailid ? "error-input" : ""}
      />

      <label>Password</label>
      <input
        required
        type="password"
        onChange={handleChange}
        name="passw"
        value={formData.passw}
        className={errors.passw ? "error-input" : ""}
      />
      {errors.name && <div className="error-message">{errors.name}</div>}
      {errors.surname && <div className="error-message">{errors.surname}</div>}
      {errors.emprole && <div className="error-message">{errors.emprole}</div>}
      {errors.emailid && <div className="error-message">{errors.emailid}</div>}
      {errors.passw && <div className="error-message">{errors.passw}</div>}
      {formData.passw && (
        <div className="password-strength">{formData.passwordStrength}</div>
      )}

      <button onClick={updateUser} className="updateClassBtn">
        Update user
      </button>
    </div>
  );
}
