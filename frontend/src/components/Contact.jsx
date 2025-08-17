// src/components/Contact.jsx
import React from "react";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation();

  const bgImage =
    "https://img.freepik.com/premium-photo/hand-holding-wooden-block-cube-symbol-telephone-email-address-website-page-contact-us-e-mail-marketing-concept_20693-274.jpg";

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-900 relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* تظليل فوق الخلفية */}
      <div className="absolute inset-0 bg-black/40" />

      {/* المحتوى */}
      <div className="relative bg-white/90 dark:bg-gray-800/90 shadow-lg rounded-lg w-full max-w-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">
          {t("contact")}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-center mb-6">
          {t("contactDescription")}
        </p>

        <div className="space-y-3 text-center">
          <p className="text-gray-800 dark:text-gray-200">
            📧 Email:{" "}
            <a
              href="mailto:info@hrm.com"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              info@hrm.com
            </a>
          </p>
          <p className="text-gray-800 dark:text-gray-200">
            📞 {t("phone")}:{" "}
            <a
              href="tel:+97312345678"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              +973 1234 5678
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
