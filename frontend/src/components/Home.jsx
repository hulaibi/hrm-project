import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const role = localStorage.getItem("role"); // "hr", "user", or null
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        direction: i18n.language === "ar" ? "rtl" : "ltr",
      }}
    >
      {/* خلفية */}
      <div
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(6px)",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -2,
        }}
      ></div>

      {/* طبقة شفافة فوق الخلفية */}
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.5)",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      ></div>

      {/* المحتوى */}
      <div className="text-center text-white p-4">
        <h1 className="mb-4 fw-bold">{t("welcomeMessage")}</h1>

        {!isLoggedIn && (
          <>
            <p className="lead">{t("chooseAction")}</p>
            <div className="d-flex justify-content-center gap-3">
              <button
                className="btn btn-primary btn-lg"
                onClick={() => navigate("/login")}
              >
                {t("login")}
              </button>
              <button
                className="btn btn-success btn-lg"
                onClick={() => navigate("/register")}
              >
                {t("register")}
              </button>
            </div>
          </>
        )}

        {isLoggedIn && role === "user" && (
          <div className="mt-4">
            <h2>{t("userDashboardTitle")}</h2>
            <button className="btn btn-info m-2">{t("viewProfile")}</button>
            <button className="btn btn-warning m-2">{t("viewTasks")}</button>
          </div>
        )}

        {isLoggedIn && role === "hr" && (
          <div className="mt-4">
            <h2>{t("hrDashboardTitle")}</h2>
            <button className="btn btn-success m-2">{t("addEmployee")}</button>
            <button className="btn btn-primary m-2">{t("viewReports")}</button>
            <button className="btn btn-warning m-2">{t("manageUsers")}</button>
          </div>
        )}
      </div>
    </div>
  );
}
