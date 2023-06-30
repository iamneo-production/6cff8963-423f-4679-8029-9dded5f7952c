import React, { useState } from 'react';
import HeaderListUser from './HeaderCreateUser';
import { validateEmail, validateName, validatePassword } from './ValidationUtils';
import '../components_styles/create_user.css';
//CreateUser
export default function CreateUser() {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    emprole: '',
    emailid: '',
    passw: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    surname: '',
    emprole: '',
    emailid: '',
    passw: '',
  });

  function restartForm() {
    setFormData({
      name: '',
      surname: '',
      emprole: '',
      emailid: '',
      passw: '',
    });

    setErrors({
      name: '',
      surname: '',
      emprole: '',
      emailid: '',
      passw: '',
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    const trimmedValue = value.trim();

    let errorMessage = '';
    switch (name) {
      case 'emprole':
        if (!['admin', 'employee'].includes(trimmedValue)) {
          errorMessage = "Invalid employee role. Please choose either 'admin' or 'employee'.";
        }
        break;
      case 'emailid':
        errorMessage = validateEmail(trimmedValue);
        break;
      case 'name':
      case 'surname':
        errorMessage = validateName(trimmedValue);
        break;
      case 'passw':
        errorMessage = validatePassword(trimmedValue);
        break;
      default:
        break;
    }

    // Check for empty values and update the error message
    if (trimmedValue === '') {
      errorMessage = 'This field is required.';
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: trimmedValue,
    }));
  }

  async function addUser(e) {
    e.preventDefault();

    // Check for validation errors
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
        name: !formData.name ? 'This field is required.' : prevErrors.name,
        surname: !formData.surname ? 'This field is required.' : prevErrors.surname,
        emprole: !formData.emprole ? 'This field is required.' : prevErrors.emprole,
        emailid: !formData.emailid ? 'This field is required.' : prevErrors.emailid,
        passw: !formData.passw ? 'This field is required.' : prevErrors.passw,
      }));
      return;
    }

    // Proceed with user creation
    const request = new Request('http://localhost:8080/api/users', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    fetch(request)
      .then((res) => {
        if (res.ok) {
          sendEmail(formData.emailid); // Send email to the created user
          return res.json(); // Return the parsed JSON data
        } else {
          throw new Error('Failed to create user'); // Throw an error if the response is not successful
        }
      })
      .then(() => {
        restartForm();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function sendEmail(email) {
    const request = new Request('http://localhost:8080/api/send-email', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    fetch(request)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to send email');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <HeaderListUser />
      <div className="create-user">
        <div className="form">
          <h1 className="form-title">Create a New User</h1>
          <label>Name</label>
          <input
            type="text"
            onChange={handleChange}
            name="name"
            value={formData.name}
            required
            className={errors.name ? 'error-input' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}

          <label>Surname</label>
          <input
            type="text"
            onChange={handleChange}
            name="surname"
            value={formData.surname}
            required
            className={errors.surname ? 'error-input' : ''}
          />
          {errors.surname && <span className="error-message">{errors.surname}</span>}
          <label>Employee Role</label>
          <select
            onChange={handleChange}
            name="emprole"
            value={formData.emprole}
            required
            className={errors.emprole ? 'error-input' : ''}
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
          </select>
          {errors.emprole && <span className="error-message">{errors.emprole}</span>}

          <label>Email ID</label>
          <input
            type="email"
            onChange={handleChange}
            name="emailid"
            value={formData.emailid}
            required
            className={errors.emailid ? 'error-input' : ''}
          />
          {errors.emailid && <span className="error-message">{errors.emailid}</span>}

          <label>Password</label>
          <input
            type="password"
            onChange={handleChange}
            name="passw"
            value={formData.passw}
            required
            className={errors.passw ? 'error-input' : ''}
          />
          {errors.passw && <span className="error-message">{errors.passw}</span>}

          <button onClick={addUser} className="createBtn">
            Add User
          </button>
        </div>
      </div>
    </>
  );
}