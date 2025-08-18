// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("access_token");
  const role = localStorage.getItem("role"); // احفظه بعد تسجيل الدخول: "user" | "hr" | "admin"

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const changeLanguage = (lang) => i18n.changeLanguage(lang);
  const isRTL = i18n.language === "ar";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container" style={{ direction: isRTL ? "rtl" : "ltr" }}>
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

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className={`navbar-nav ${isRTL ? "me-auto" : "ms-auto"}`}>
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
                {/* وظائف عامة */}
                <li className="nav-item">
                  <Link className="nav-link" to="/jobs">
                    {t("jobs")}
                  </Link>
                </li>

                {/* إدارة الوظائف للـHR/Admin */}
                {(role === "hr" || role === "admin") && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/hr/jobs">
                      {t("jobsAdmin")}
                    </Link>
                  </li>
                )}

                {/* طلبات الإجازة للموظف */}
                <li className="nav-item">
                  <Link className="nav-link" to="/leaves">
                    {t("leaves")}
                  </Link>
                </li>

                {/* لوحة الإجازات للـHR/Admin */}
                {(role === "hr" || role === "admin") && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/hr/leaves">
                      {t("hrLeaves")}
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
            <li className={`nav-item ${isRTL ? "me-3" : "ms-3"} d-flex align-items-center`}>
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
