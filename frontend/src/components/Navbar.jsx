// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("access_token");
  const role = localStorage.getItem("role"); // تأكد تحفظه بعد تسجيل الدخول

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const changeLanguage = (lang) => i18n.changeLanguage(lang);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          HRM
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarNav"
          style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}
        >
          <ul className="navbar-nav ms-auto">
            {/* روابط عامة */}
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                {t("about")}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                {t("contact")}
              </Link>
            </li>

            {isLoggedIn ? (
              <>
                {/* رابط الوظائف العامة */}
                <li className="nav-item">
                  <Link className="nav-link" to="/jobs">
                    {t("jobs")}
                  </Link>
                </li>

                {/* رابط إدارة الوظائف للـ HR/Admin فقط */}
                {(role === "hr" || role === "admin") && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/hr/jobs">
                      {t("jobsAdmin")}
                    </Link>
                  </li>
                )}

                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    {t("profile")}
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-danger ms-2" onClick={handleLogout}>
                    {t("logout")}
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    {t("login")}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    {t("register")}
                  </Link>
                </li>
              </>
            )}

            {/* تبديل اللغة */}
            <li className="nav-item ms-3 d-flex align-items-center">
              <button
                className="btn btn-outline-light btn-sm me-1"
                onClick={() => changeLanguage("ar")}
              >
                AR
              </button>
              <button
                className="btn btn-outline-light btn-sm"
                onClick={() => changeLanguage("en")}
              >
                EN
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
