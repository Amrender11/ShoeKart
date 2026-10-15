
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
} from "react-icons/fa";
import "./index.css";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [success, setSuccess] = useState("");

  const validate = () => {
    const newErrors = {};

    // Full name validation
    if (!form.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    } else if (
      !/^[\p{L}][\p{L}\s.'-]{1,98}$/u.test(form.fullName.trim())
    ) {
      newErrors.fullName =
        "Enter a valid name using at least 2 characters.";
    }

    // Email validation
    if (!form.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    // Indian mobile number validation
    if (!form.mobile.trim()) {
      newErrors.mobile = "Mobile number is required.";
    } else if (!/^[6-9]\d{9}$/.test(form.mobile.trim())) {
      newErrors.mobile =
        "Enter a valid 10-digit Indian mobile number.";
    }

    // Password validation
    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 8) {
      newErrors.password =
        "Password must contain at least 8 characters.";
    } else if (!/[A-Z]/.test(form.password)) {
      newErrors.password =
        "Include at least one uppercase letter.";
    } else if (!/[a-z]/.test(form.password)) {
      newErrors.password =
        "Include at least one lowercase letter.";
    } else if (!/[0-9]/.test(form.password)) {
      newErrors.password = "Include at least one number.";
    } else if (!/[^A-Za-z0-9]/.test(form.password)) {
      newErrors.password =
        "Include at least one special character.";
    }

    // Confirm password validation
    if (!form.confirmPassword) {
      newErrors.confirmPassword =
        "Please confirm your password.";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    return newErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setSuccess("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    // Demo registration: no account is created on a server.
    setSuccess("Registration form validated successfully!");

    // Navigate only if you already have a login route.
    // Uncomment the next line if desired:
    // navigate("/Login");
  };

  return (
    <main className="register-page">
      <section className="register-card">
        <div className="register-brand">
          <span className="register-logo">S</span>
          <span>SHOEKART</span>
        </div>

        <h1>Create Account</h1>
        <p className="register-subtitle">
          Join ShoeKart and discover your next favourite pair.
        </p>

        {success && (
          <div className="register-success" role="status">
            <FaCheckCircle />
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Full name */}
          <div className="register-field">
            <label htmlFor="fullName">Full Name</label>
            <div className={`register-input-wrap ${
              errors.fullName ? "input-error" : ""
            }`}>
              <FaUser />
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                value={form.fullName}
                onChange={handleChange}
                autoComplete="name"
                maxLength={100}
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={
                  errors.fullName ? "name-error" : undefined
                }
              />
            </div>
            {errors.fullName && (
              <small id="name-error" className="register-error">
                {errors.fullName}
              </small>
            )}
          </div>

          {/* Email */}
          <div className="register-field">
            <label htmlFor="email">Email Address</label>
            <div className={`register-input-wrap ${
              errors.email ? "input-error" : ""
            }`}>
              <FaEnvelope />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                maxLength={254}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={
                  errors.email ? "email-error" : undefined
                }
              />
            </div>
            {errors.email && (
              <small id="email-error" className="register-error">
                {errors.email}
              </small>
            )}
          </div>

          {/* Mobile */}
          <div className="register-field">
            <label htmlFor="mobile">Mobile Number</label>
            <div className={`register-input-wrap ${
              errors.mobile ? "input-error" : ""
            }`}>
              <FaPhone />
              <input
                id="mobile"
                name="mobile"
                type="tel"
                placeholder="10-digit mobile number"
                value={form.mobile}
                onChange={handleChange}
                autoComplete="tel"
                inputMode="numeric"
                maxLength={10}
                aria-invalid={Boolean(errors.mobile)}
                aria-describedby={
                  errors.mobile ? "mobile-error" : undefined
                }
              />
            </div>
            {errors.mobile && (
              <small id="mobile-error" className="register-error">
                {errors.mobile}
              </small>
            )}
          </div>

          {/* Password */}
          <div className="register-field">
            <label htmlFor="password">Password</label>
            <div className={`register-input-wrap ${
              errors.password ? "input-error" : ""
            }`}>
              <FaLock />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
              />
              <button
                className="password-toggle"
                type="button"
                onClick={() =>
                  setShowPassword((previous) => !previous)
                }
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <small id="password-error" className="register-error">
                {errors.password}
              </small>
            )}
            <small className="password-hint">
              At least 8 characters, uppercase, lowercase, number
              and special character.
            </small>
          </div>

          {/* Confirm password */}
          <div className="register-field">
            <label htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className={`register-input-wrap ${
              errors.confirmPassword ? "input-error" : ""
            }`}>
              <FaLock />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                value={form.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                aria-invalid={Boolean(errors.confirmPassword)}
                aria-describedby={
                  errors.confirmPassword
                    ? "confirm-password-error"
                    : undefined
                }
              />
              <button
                className="password-toggle"
                type="button"
                onClick={() =>
                  setShowConfirmPassword((previous) => !previous)
                }
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <small
                id="confirm-password-error"
                className="register-error"
              >
                {errors.confirmPassword}
              </small>
            )}
          </div>

          <button className="register-submit" type="submit">
            Create My Account
          </button>
        </form>

        <p className="register-login">
          Already have an account? <Link to="/Login11">Login</Link>
        </p>

        <p className="register-footer">
          Find your fit. Step out in style.
        </p>
      </section>
    </main>
  );
}
