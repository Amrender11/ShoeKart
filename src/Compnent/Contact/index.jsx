
import { useState } from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
} from "react-icons/fa";
import "./index.css";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

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

    setSuccess(false);
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Please enter your name.";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Name must contain at least 2 characters.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!form.subject.trim()) {
      newErrors.subject = "Please enter a subject.";
    }

    if (!form.message.trim()) {
      newErrors.message = "Please enter your message.";
    } else if (form.message.trim().length < 10) {
      newErrors.message = "Message must contain at least 10 characters.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSuccess(true);

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }
  };

  return (
    <div className="contact-page">
      {/* Hero */}
      <section className="contact-hero">
        <span>WE ARE HERE TO HELP</span>
        <h1>Contact <span>Us.</span></h1>
        <p>
          Have a question about your favourite shoes?
          We'd love to hear from you.
        </p>
      </section>

      {/* Main Content */}
      <section className="contact-container">
        {/* Contact Details */}
        <div className="contact-info">
          <span className="contact-tag">GET IN TOUCH</span>
          <h2>Let's Talk About It.</h2>

          <p className="contact-description">
            Whether you need help with a product, an order,
            or have a suggestion, send us a message.
          </p>

          <div className="contact-info-item">
            <div className="contact-info-icon">
              <FaEnvelope />
            </div>
            <div>
              <h3>Email Us</h3>
              <p>support@shoekart.com</p>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-info-icon">
              <FaPhoneAlt />
            </div>
            <div>
              <h3>Call Us</h3>
              <p>Contact details coming soon</p>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-info-icon">
              <FaMapMarkerAlt />
            </div>
            <div>
              <h3>Our Location</h3>
              <p>India</p>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-info-icon">
              <FaClock />
            </div>
            <div>
              <h3>Support Hours</h3>
              <p>Business hours to be announced</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form-card">
          <h2>Send Us a Message</h2>
          <p className="contact-form-subtitle">
            Fill in the details below.
          </p>

          {success && (
            <div className="contact-success" role="status">
              Thank you, {form.name || "your message"}! Your form
              passed validation. Connect a backend to send it to
              the ShoeKart team.
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="contact-form-group">
              <label htmlFor="contact-name">Full Name</label>
              <input
                id="contact-name"
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
              />
              {errors.name && (
                <span className="contact-error">{errors.name}</span>
              )}
            </div>

            <div className="contact-form-group">
              <label htmlFor="contact-email">Email Address</label>
              <input
                id="contact-email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email && (
                <span className="contact-error">{errors.email}</span>
              )}
            </div>

            <div className="contact-form-group">
              <label htmlFor="contact-subject">Subject</label>
              <input
                id="contact-subject"
                type="text"
                name="subject"
                placeholder="What is your enquiry about?"
                value={form.subject}
                onChange={handleChange}
                aria-invalid={Boolean(errors.subject)}
              />
              {errors.subject && (
                <span className="contact-error">{errors.subject}</span>
              )}
            </div>

            <div className="contact-form-group">
              <label htmlFor="contact-message">Your Message</label>
              <textarea
                id="contact-message"
                name="message"
                rows="5"
                placeholder="Write your message here..."
                value={form.message}
                onChange={handleChange}
                aria-invalid={Boolean(errors.message)}
              />
              {errors.message && (
                <span className="contact-error">{errors.message}</span>
              )}
            </div>

            <button type="submit" className="contact-submit">
              Send Message <FaPaperPlane />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;