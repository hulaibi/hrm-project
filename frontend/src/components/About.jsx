// src/components/About.jsx
import React from "react";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t, i18n } = useTranslation();

  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        
        {/* النص */}
        <div className="col-md-6 mb-4">
          <h2 className="fw-bold text-primary mb-3">{t("aboutTitle")}</h2>
          <p className="lead">{t("aboutDescription")}</p>
        </div>

        {/* الصورة */}
        <div className="col-md-6 text-center">
          <img
            src="https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&w=800&q=80"
            alt="HR Management"
            className="img-fluid rounded shadow"
          />
        </div>

      </div>
    </div>
  );
}
