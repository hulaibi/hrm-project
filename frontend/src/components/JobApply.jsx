import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

const MAX_FILE_MB = 5;
const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export default function JobApply() {
  const { t, i18n } = useTranslation();
  const { id: jobId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    cover_letter: "",
    cv: null,
  });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [serverMsg, setServerMsg] = useState({ type: "", text: "" });

  const dirStyle = { direction: i18n.language === "ar" ? "rtl" : "ltr" };

  const validate = () => {
    const e = {};
    if (!form.full_name.trim()) e.full_name = t("fullName") || "Full name is required";
    if (!form.email.trim()) {
      e.email = t("email") || "Email is required";
    } else {
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
      if (!ok) e.email = t("applyError") || "Invalid email format";
    }
    if (!form.cv) {
      e.cv = t("cvLabel") || "Upload CV (PDF/DOC)";
    } else {
      if (form.cv.size > MAX_FILE_MB * 1024 * 1024) {
        e.cv = `${t("applyError") || "File too large"} (<= ${MAX_FILE_MB}MB)`;
      }
      if (!ALLOWED_TYPES.includes(form.cv.type)) {
        e.cv = t("applyError") || "Unsupported file type (PDF/DOC/DOCX)";
      }
    }
    return e;
  };

  const onChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "cv") {
      setForm((p) => ({ ...p, cv: files?.[0] || null }));
      setErrors((prev) => ({ ...prev, cv: "" }));
    } else {
      setForm((p) => ({ ...p, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setServerMsg({ type: "", text: "" });

    // client-side validation
    const ve = validate();
    if (Object.keys(ve).length) {
      setErrors(ve);
      return;
    }

    try {
      setSending(true);
      const data = new FormData();
      data.append("job", jobId);
      data.append("full_name", form.full_name);
      data.append("email", form.email);
      data.append("phone", form.phone);
      data.append("cover_letter", form.cover_letter);
      data.append("cv", form.cv);

      const token = localStorage.getItem("access_token");
      const headers = token
        ? { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
        : { "Content-Type": "multipart/form-data" };

      const res = await axios.post("http://localhost:8000/api/jobs/apply/", data, { headers });

      setServerMsg({
        type: "success",
        text: res?.data?.message || t("applySuccess") || "Application submitted successfully.",
      });

      // اختياري: تنظيف الحقول
      setForm({ full_name: "", email: "", phone: "", cover_letter: "", cv: null });

      // ارجاع للمسار السابق/الوظائف
      setTimeout(() => navigate("/jobs"), 1200);
    } catch (err) {
      // صياغة رسالة خطأ واضحة
      const apiErr = err?.response?.data;
      let friendly = "";
      if (apiErr && typeof apiErr === "object") {
        friendly = Object.entries(apiErr)
          .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : String(v)}`)
          .join(" • ");
      }
      setServerMsg({
        type: "danger",
        text: friendly || t("applyError") || "Failed to submit. Please check your inputs.",
      });
    } finally {
      setSending(false);
    }
  };

  if (!jobId) {
    return (
      <div className="container py-5" style={dirStyle}>
        <div className="alert alert-warning">
          Job ID is missing. <Link to="/jobs">{t("jobs") || "Jobs"}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4" style={{ ...dirStyle, maxWidth: 820 }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="m-0">
          {t("applyJobTitle") || "Apply for Job"} #{jobId}
        </h3>
        <Link to="/jobs" className="btn btn-outline-secondary btn-sm">
          ← {t("jobs") || "Jobs"}
        </Link>
      </div>

      {serverMsg.text && (
        <div className={`alert alert-${serverMsg.type}`} role="alert">
          {serverMsg.text}
        </div>
      )}

      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={submit} noValidate>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">{t("fullName") || "Full name"}</label>
                <input
                  className={`form-control ${errors.full_name ? "is-invalid" : ""}`}
                  name="full_name"
                  value={form.full_name}
                  onChange={onChange}
                  required
                />
                {errors.full_name && <div className="invalid-feedback">{errors.full_name}</div>}
              </div>

              <div className="col-md-6">
                <label className="form-label">{t("email") || "Email"}</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  required
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              <div className="col-md-6">
                <label className="form-label">{t("phone") || "Phone"}</label>
                <input
                  className="form-control"
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                />
              </div>

              <div className="col-12">
                <label className="form-label">{t("coverLetter") || "Cover letter"}</label>
                <textarea
                  className="form-control"
                  name="cover_letter"
                  rows={5}
                  value={form.cover_letter}
                  onChange={onChange}
                  placeholder={i18n.language === "ar" ? "اكتب رسالة التغطية (اختياري)" : "Write a short cover letter (optional)"}
                />
              </div>

              <div className="col-12">
                <label className="form-label">{t("cvLabel") || "Upload CV (PDF/DOC)"}</label>
                <input
                  type="file"
                  className={`form-control ${errors.cv ? "is-invalid" : ""}`}
                  name="cv"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={onChange}
                  required
                />
                <div className="form-text">
                  {i18n.language === "ar"
                    ? `الحد الأقصى ${MAX_FILE_MB}MB - الصيغ المسموحة: PDF/DOC/DOCX`
                    : `Max ${MAX_FILE_MB}MB • Allowed: PDF/DOC/DOCX`}
                </div>
                {errors.cv && <div className="invalid-feedback">{errors.cv}</div>}
                {form.cv && (
                  <div className="mt-2 small text-muted">
                    {i18n.language === "ar" ? "الملف المختار:" : "Selected:"} {form.cv.name} (
                    {Math.round(form.cv.size / 1024)} KB)
                  </div>
                )}
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <button type="button" className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
                {t("cancel") || "Cancel"}
              </button>
              <button type="submit" className="btn btn-primary" disabled={sending}>
                {sending ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    {t("sending") || "Sending..."}
                  </>
                ) : (
                  t("submitApplication") || "Submit Application"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <p className="text-muted mt-3" style={{ fontSize: 13 }}>
        {i18n.language === "ar"
          ? "ملاحظة: إذا كنت مسجّل دخول، سيتم ربط طلبك بحسابك تلقائيًا."
          : "Note: If you're logged in, your application will be linked to your account automatically."}
      </p>
    </div>
  );
}
