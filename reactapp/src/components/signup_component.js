import React, { useState } from "react";

export default function SignUp() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [unique , setUniqueId]=useState("");
  
  

  const [showSuccessMessage] = useState(false);

 
  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
      {showSuccessMessage && (
          <div className="popup">
            <p>Registration Successful!</p>
          </div>)
          }
        
        <form>
          <h3>REGISTER</h3>
          

          

          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              value="email"
              
            />
          </div>

          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}

            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>

          </div>
          <p className="forgot-password text-right">
            Already registered <a href="/sign-in">Log in?</a>
          </p>
        </form>
      </div>
    </div>
  );
}