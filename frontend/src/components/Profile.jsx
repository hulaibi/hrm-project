// src/components/Profile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [data, setData] = useState(null);          // بيانات البروفايل من السيرفر
  const [form, setForm] = useState(null);          // نسخة قابلة للتعديل
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [okMsg, setOkMsg] = useState("");

  const token = localStorage.getItem("access_token");

  // جلب البروفايل
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get("http://localhost:8000/api/auth/profile/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data);
        setForm(res.data);
        // خزّن الدور حتى تستخدمه في الواجهة (الصفحة الرئيسية/النافبار)
        if (res.data?.role) localStorage.setItem("role", res.data.role);
      } catch (err) {
        setError(t("fetchError"));
        // في حال غير مصرح، رجّع لصفحة الدخول
        if (err?.response?.status === 401) navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token, navigate, t]);

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // حفظ التعديلات
  const saveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setOkMsg("");
    try {
      const res = await axios.put("http://localhost:8000/api/auth/profile/", form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setData(res.data);
      setForm(res.data);
      if (res.data?.role) localStorage.setItem("role", res.data.role);
      setOkMsg(t("updateSuccess"));
    } catch (err) {
      // إظهار رسائل السيريالايزر القادمة من الباكند إن وجدت
      if (err.response?.data && typeof err.response.data === "object") {
        const msgs = Object.entries(err.response.data)
          .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : String(v)}`)
          .join(" • ");
        setError(msgs || t("updateError"));
      } else {
        setError(t("updateError"));
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh", direction: i18n.language === "ar" ? "rtl" : "ltr" }}
      >
        <div className="spinner-border" role="status" aria-label="loading" />
        <span className="ms-2">{t("loading")}</span>
      </div>
    );
  }

  if (!data) {
    return (
      <div
        className="container"
        style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}
      >
        <div className="alert alert-warning mt-4">{t("notLoggedIn")}</div>
      </div>
    );
  }

  // دلالة لطيفة للـ role
  const roleBadgeClass = (r) => {
    switch (r) {
      case "admin": return "bg-danger";
      case "hr": return "bg-primary";
      case "manager": return "bg-info text-dark";
      case "employee": return "bg-success";
      default: return "bg-secondary";
    }
  };

  return (
    <div
      className="container"
      style={{ direction: i18n.language === "ar" ? "rtl" : "ltr", maxWidth: 760 }}
    >
      <div className="card shadow mt-4">
        <div className="card-body p-4">
          <div className="d-flex align-items-center mb-4">
            {/* أفاتار بسيط */}
            <div
              className="rounded-circle d-flex justify-content-center align-items-center me-3"
              style={{
                width: 64,
                height: 64,
                background:
                  "linear-gradient(135deg, rgba(13,110,253,0.15), rgba(32,201,151,0.15))",
                border: "1px solid rgba(0,0,0,0.08)",
              }}
            >
              <span className="fw-bold fs-4 text-muted">
                {data.username?.slice(0, 1)?.toUpperCase() || "U"}
              </span>
            </div>

            <div className="flex-grow-1">
              <h4 className="mb-1">{t("profileTitle")}</h4>
              <span className={`badge ${roleBadgeClass(data.role)}`}>
                {t(`roleLabel.${data.role || "applicant"}`)}
              </span>
            </div>
          </div>

          {/* رسائل */}
          {okMsg && <div className="alert alert-success">{okMsg}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          {/* النموذج */}
          <form onSubmit={saveProfile}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">{t("username")}</label>
                <input
                  className="form-control"
                  name="username"
                  value={form?.username || ""}
                  onChange={onChange}
                  placeholder={t("usernamePlaceholder")}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">{t("email")}</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={form?.email || ""}
                  onChange={onChange}
                  placeholder={t("emailPlaceholder")}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">{t("phone")}</label>
                <input
                  className="form-control"
                  name="phone"
                  value={form?.phone || ""}
                  onChange={onChange}
                  placeholder={t("phonePlaceholder")}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">{t("role")}</label>
                <select
                  className="form-select"
                  name="role"
                  value={form?.role || "applicant"}
                  onChange={onChange}
                >
                  <option value="applicant">{t("roleLabel.applicant")}</option>
                  <option value="employee">{t("roleLabel.employee")}</option>
                  <option value="manager">{t("roleLabel.manager")}</option>
                  <option value="hr">{t("roleLabel.hr")}</option>
                  <option value="admin">{t("roleLabel.admin")}</option>
                </select>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setForm(data)}  // إلغاء التغييرات
              >
                {t("cancel")}
              </button>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? t("saving") : t("saveChanges")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
