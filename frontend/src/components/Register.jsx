// src/components/Register.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Register() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    role: "applicant", // افتراضي متقدم
    phone: "",
  });

  const [error, setError] = useState(null); // نخزّن أخطاء السيرفر ككائن

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // تحقق محلي بسيط قبل الإرسال
    if (formData.password !== formData.password2) {
      setError({ password: [t("passwordMismatch")] });
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/auth/register/", formData, {
        headers: { "Content-Type": "application/json" },
      });
      alert(t("registerSuccess"));
      navigate("/login");
    } catch (err) {
      // أظهر رسائل السيريالايزر كما هي (مثلاً {"password":["weak"], "username":["taken"]})
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError({ detail: [t("registerError")] });
      }
    }
  };

  // مساعد لطباعة الأخطاء بشكل جميل
  const renderErrors = () => {
    if (!error) return null;
    const items = [];
    Object.entries(error).forEach(([field, messages]) => {
      const list = Array.isArray(messages) ? messages : [String(messages)];
      list.forEach((msg, idx) => {
        items.push(
          <li key={`${field}-${idx}`}>
            <strong>{field}</strong>: {msg}
          </li>
        );
      });
    });
    return (
      <div className="alert alert-danger mt-3" role="alert">
        <ul className="mb-0">{items}</ul>
      </div>
    );
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", direction: i18n.language === "ar" ? "rtl" : "ltr" }}
    >
      <div className="card p-4 shadow" style={{ maxWidth: 480, width: "100%" }}>
        <h2 className="text-center mb-4">{t("registerTitle")}</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">{t("username")}</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder={t("usernamePlaceholder")}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">{t("email")}</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t("emailPlaceholder")}
              required
            />
          </div>

          <div className="row">
            <div className="mb-3 col-12 col-md-6">
              <label className="form-label">{t("password")}</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={t("passwordPlaceholder")}
                required
              />
            </div>
            <div className="mb-3 col-12 col-md-6">
              <label className="form-label">{t("confirmPassword")}</label>
              <input
                type="password"
                className="form-control"
                name="password2"    // مهم: الحقل الذي يتوقعه الباكند
                value={formData.password2}
                onChange={handleChange}
                placeholder={t("confirmPasswordPlaceholder")}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">{t("phone")}</label>
            <input
              type="text"
              className="form-control"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t("phonePlaceholder")}
            />
          </div>

          <div className="mb-4">
            <label className="form-label">{t("role")}</label>
            <select
              className="form-select"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="applicant">{t("roleApplicant")}</option>
              <option value="hr">{t("roleHR")}</option>
            </select>
          </div>

          <button type="submit" className="btn btn-success w-100">
            {t("registerButton")}
          </button>

          {renderErrors()}
        </form>
      </div>
    </div>
  );
}
