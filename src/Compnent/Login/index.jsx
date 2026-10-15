
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaShoePrints,
} from "react-icons/fa";
import "./index.css";

const Login11 = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setMessage("");
  };

  const validate = () => {
    const newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 8) {
      newErrors.password =
        "Password must contain at least 8 characters";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    // Demo only: connect a backend or authentication
    // service here to verify the user's credentials.
    setMessage(
      "Form validated successfully! Connect authentication to log in."
    );
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <FaShoePrints />
        </div>

        <h2>Welcome Back!</h2>
        <p className="login-subtitle">
          Login to your ShoeKart account
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="login-field">
            <label htmlFor="login-email">Email Address</label>

            <div className="login-input-box">
              <FaEnvelope className="login-icon" />
              <input
                id="login-email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
              />
            </div>

            {errors.email && (
              <span className="login-error">{errors.email}</span>
            )}
          </div>

          <div className="login-field">
            <label htmlFor="login-password">Password</label>

            <div className="login-input-box">
              <FaLock className="login-icon" />

              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
                aria-invalid={Boolean(errors.password)}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {errors.password && (
              <span className="login-error">
                {errors.password}
              </span>
            )}
          </div>

          <div className="login-options">
            <Link to="/ForgotPassword">Forgot Password?</Link>
          </div>

          <button type="submit" className="login-submit">
            Login
          </button>

          {message && (
            <p className="login-success" role="status">
              {message}
            </p>
          )}
        </form>

        <p className="register-link">
          Don't have an account?{" "}
          <Link to="/Register">Create Account</Link>
        </p>

        <button
          type="button"
          className="login-home"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Login11;
