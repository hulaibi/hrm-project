// src/components/HrJobs.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const emptyForm = {
  id: null,
  title: "",
  description: "",
  location: "",
  employment_type: "full_time",
  is_active: true,
};

export default function HrJobs() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    // حماية الصفحة
    if (!token || !["hr","admin"].includes(role)) {
      navigate("/"); // ارجاع للصفحة الرئيسية
      return;
    }
    loadJobs();
    // eslint-disable-next-line
  }, []);

  const api = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  const loadJobs = async (q = "") => {
    setLoading(true);
    setError("");
    try {
      const url = q ? `/hr/jobs/?search=${encodeURIComponent(q)}` : "/hr/jobs/";
      const res = await api.get(url);
      setJobs(res.data.results || res.data); // لو ما فعّلت pagination
    } catch (e) {
      setError(t("fetchError") || "Failed to load.");
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true); setError(""); setOk("");
    try {
      if (form.id) {
        await api.patch(`/hr/jobs/${form.id}/`, form);
        setOk(t("updated") || "Updated");
      } else {
        await api.post(`/hr/jobs/`, form);
        setOk(t("created") || "Created");
      }
      setForm(emptyForm);
      loadJobs(search);
    } catch (e2) {
      setError(t("updateError") || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const editRow = (j) => {
    setForm({
      id: j.id,
      title: j.title,
      description: j.description,
      location: j.location,
      employment_type: j.employment_type,
      is_active: j.is_active,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteRow = async (id) => {
    if (!window.confirm(t("confirmDelete") || "Delete this job?")) return;
    try {
      await api.delete(`/hr/jobs/${id}/`);
      loadJobs(search);
    } catch {
      setError(t("updateError") || "Failed to delete");
    }
  };

  return (
    <div
      className="container py-4"
      style={{ direction: i18n.language === "ar" ? "rtl" : "ltr", maxWidth: 1000 }}
    >
      <h2 className="mb-3">{t("jobsAdmin") || "Manage Jobs"}</h2>

      {/* رسائل */}
      {ok && <div className="alert alert-success">{ok}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* فورم إضافة/تعديل */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title mb-3">
            {form.id ? (t("editJob") || "Edit Job") : (t("addJob") || "Add Job")}
          </h5>
          <form onSubmit={onSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">{t("jobTitle") || "Title"}</label>
                <input
                  className="form-control"
                  name="title"
                  value={form.title}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">{t("location") || "Location"}</label>
                <input
                  className="form-control"
                  name="location"
                  value={form.location}
                  onChange={onChange}
                />
              </div>
              <div className="col-12">
                <label className="form-label">{t("description") || "Description"}</label>
                <textarea
                  className="form-control"
                  name="description"
                  rows={4}
                  value={form.description}
                  onChange={onChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">{t("employmentType") || "Employment Type"}</label>
                <select
                  className="form-select"
                  name="employment_type"
                  value={form.employment_type}
                  onChange={onChange}
                >
                  <option value="full_time">{t("fullTime") || "Full Time"}</option>
                  <option value="part_time">{t("partTime") || "Part Time"}</option>
                  <option value="contract">{t("contract") || "Contract"}</option>
                  <option value="intern">{t("intern") || "Intern"}</option>
                </select>
              </div>
              <div className="col-md-6 d-flex align-items-center">
                <div className="form-check mt-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="is_active"
                    name="is_active"
                    checked={form.is_active}
                    onChange={onChange}
                  />
                  <label className="form-check-label" htmlFor="is_active">
                    {t("active") || "Active"}
                  </label>
                </div>
              </div>
            </div>

            <div className="d-flex gap-2 justify-content-end mt-3">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setForm(emptyForm)}
              >
                {t("cancel") || "Cancel"}
              </button>
              <button className="btn btn-primary" disabled={saving}>
                {saving ? (t("saving") || "Saving...") : (form.id ? (t("saveChanges") || "Save changes") : (t("create") || "Create"))}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* شريط بحث */}
      <div className="input-group mb-3">
        <input
          className="form-control"
          placeholder={t("searchPlaceholder") || "Search title/location..."}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-outline-primary" onClick={() => loadJobs(search)}>
          {t("search") || "Search"}
        </button>
        <button className="btn btn-outline-secondary" onClick={() => { setSearch(""); loadJobs(""); }}>
          {t("reset") || "Reset"}
        </button>
      </div>

      {/* جدول الوظائف */}
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>#</th>
              <th>{t("jobTitle") || "Title"}</th>
              <th>{t("location") || "Location"}</th>
              <th>{t("employmentType") || "Type"}</th>
              <th>{t("status") || "Status"}</th>
              <th style={{ width: 190 }}>{t("actions") || "Actions"}</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6}>{t("loading") || "Loading..."}</td></tr>
            ) : jobs.length === 0 ? (
              <tr><td colSpan={6} className="text-muted">{t("noJobs") || "No jobs right now."}</td></tr>
            ) : (
              jobs.map((j, idx) => (
                <tr key={j.id}>
                  <td>{idx + 1}</td>
                  <td>{j.title}</td>
                  <td>{j.location || "-"}</td>
                  <td>{j.employment_type}</td>
                  <td>
                    {j.is_active ? <span className="badge bg-success">{t("active") || "Active"}</span>
                                  : <span className="badge bg-secondary">{t("inactive") || "Inactive"}</span>}
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => editRow(j)}>
                      {t("edit") || "Edit"}
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => deleteRow(j.id)}>
                      {t("delete") || "Delete"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
