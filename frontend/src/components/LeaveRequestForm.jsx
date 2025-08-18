// src/components/LeaveRequestForm.jsx
import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const API_BASE = import.meta?.env?.VITE_API_URL || "http://localhost:8000/api";

// استخرج CSRF من الكوكيز (عند استخدام جلسات Django)
function getCSRFToken() {
  const name = "csrftoken=";
  const parts = document.cookie.split(";").map((c) => c.trim());
  for (const c of parts) {
    if (c.startsWith(name)) return c.substring(name.length);
  }
  return "";
}

export default function LeaveRequestForm({ onCreated }) {
  const { t } = useTranslation();

  const [form, setForm] = useState({ start_date: "", end_date: "", reason: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // اكتشف طريقة التوثيق
  const rawToken = localStorage.getItem("access_token") || localStorage.getItem("access");
  const token = rawToken && rawToken !== "null" && rawToken !== "undefined" ? rawToken : null;
  const useJWT = !!token;

  // تكوين الإعدادات حسب الطريقة
  const requestCfg = useJWT
    ? {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    : {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCSRFToken(), // مهم للجلسات
          "X-Requested-With": "XMLHttpRequest",
        },
      };

  const submit = async (e) => {
    e.preventDefault();
    setErr("");

    // تحقق بسيط من التواريخ
    if (form.start_date && form.end_date && form.end_date < form.start_date) {
      setErr(t("leaveForm.dateInvalid"));
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_BASE}/leaves/`, form, requestCfg);
      setForm({ start_date: "", end_date: "", reason: "" });
      onCreated && onCreated();
      alert(t("leaveForm.success"));
    } catch (error) {
      console.error(error);
      if (error.response) {
        setErr(`${t("leaveForm.error")} (${error.response.status})`);
      } else if (error.message?.includes("Network Error")) {
        setErr(
          useJWT
            ? t("leaveForm.netErrJwt")
            : t("leaveForm.netErrSession")
        );
      } else {
        setErr(t("leaveForm.error"));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="border rounded p-3 mb-4">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h5 className="m-0">{t("leaveForm.title")}</h5>
        <small className="text-muted">
          {t("authHint")}: {useJWT ? "JWT" : "Session (withCredentials)"}
        </small>
      </div>

      {err && <div className="alert alert-warning py-2">{err}</div>}

      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">{t("table.from")}</label>
          <input
            type="date"
            className="form-control"
            value={form.start_date}
            onChange={(e) => setForm({ ...form, start_date: e.target.value })}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">{t("table.to")}</label>
          <input
            type="date"
            className="form-control"
            value={form.end_date}
            onChange={(e) => setForm({ ...form, end_date: e.target.value })}
            required
            min={form.start_date || undefined}
          />
        </div>
        <div className="col-12">
          <label className="form-label">{t("table.reason")}</label>
          <textarea
            rows="3"
            className="form-control"
            value={form.reason}
            onChange={(e) => setForm({ ...form, reason: e.target.value })}
            required
          />
        </div>
      </div>

      <button className="btn btn-primary mt-3" disabled={loading}>
        {loading ? t("leaveForm.submitting") : t("leaveForm.submit")}
      </button>
    </form>
  );
}
