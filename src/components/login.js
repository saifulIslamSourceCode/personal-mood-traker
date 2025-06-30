import React from "react";
import { Navigate } from "react-router-dom";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: "",
      password: "",
      message: "",
      redirect: false,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { phoneNumber, password } = this.state;

    if (!phoneNumber || !password) {
      return this.setState({ message: "Please enter both phone number and password." });
    }

    if (phoneNumber === "01700000000" && password === "password") {
      this.setState({
        message: "Login successful!",
        phoneNumber: "",
        password: "",
        redirect: true,
      });
    } else {
      this.setState({ message: "Invalid phone number or password. Please try again." });
    }
  };

  render() {
    const { phoneNumber, password, message, redirect } = this.state;

    if (redirect) return <Navigate to="/dashboard" replace />;

    return (
      <div className="login-container">
        <style>
          {`
          .login-container {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background-color: #f7f7f7;
            padding: 1rem;
            box-sizing: border-box;
            font-family: Arial, sans-serif;
          }

          .login-card {
            background-color: #ffffff;
            padding: 2.5rem;
            border-radius: 0.75rem;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 400px;
            color: #000000;
          }

          .login-title {
            font-size: 2rem;
            font-weight: bold;
            text-align: center;
            margin-bottom: 2rem;
          }

          .message-box {
            padding: 0.75rem;
            margin-bottom: 1.5rem;
            border-radius: 0.5rem;
            text-align: center;
            font-size: 0.95rem;
          }

          .message-success {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
          }

          .message-danger {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
          }

          .form-group {
            margin-bottom: 1.25rem;
          }

          .form-label {
            display: block;
            font-size: 0.9rem;
            font-weight: bold;
            margin-bottom: 0.4rem;
            color: #333333;
          }

          .form-input {
            display: block;
            width: 100%;
            padding: 0.75rem 1rem;
            border: 1px solid #ced4da;
            border-radius: 0.5rem;
            box-sizing: border-box;
            font-size: 1rem;
            line-height: 1.5;
          }

          .form-input:focus {
            border-color: #80bdff;
            outline: 0;
            box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
          }

          .submit-button {
            width: 100%;
            padding: 0.75rem 1.25rem;
            border: none;
            border-radius: 0.5rem;
            background-color: #007bff;
            color: white;
            font-size: 1.15rem;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
            box-shadow: 0 2px 4px rgba(0, 123, 255, 0.2);
          }

          .submit-button:hover {
            background-color: #0056b3;
            box-shadow: 0 4px 8px rgba(0, 123, 255, 0.3);
          }

          .footer-text {
            margin-top: 1.5rem;
            text-align: center;
            font-size: 0.875rem;
            color: #555555;
          }

          .footer-link {
            color: #007bff;
            text-decoration: none;
            font-weight: bold;
          }

          .footer-link:hover {
            text-decoration: underline;
          }
        `}
        </style>

        <div className="login-card">
          <h2 className="login-title">Login</h2>

          {message && (
            <div
              className={`message-box ${
                message.includes("successful") ? "message-success" : "message-danger"
              }`}
              role="alert"
            >
              {message}
            </div>
          )}

          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={phoneNumber}
                onChange={this.handleChange}
                className="form-input"
                placeholder="e.g., 555-123-4567"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={this.handleChange}
                className="form-input"
                placeholder="**********"
                required
              />
            </div>

            <button type="submit" className="submit-button">
              Log In
            </button>
          </form>

          <div className="footer-text">
            Don't have an account?{" "}
            <a href="#" className="footer-link">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
