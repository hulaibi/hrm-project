import React, { useState } from "react";
import axios from "axios";

export default function LeaveRequestForm({ onCreated }) {
  const [form, setForm] = useState({ start_date: "", end_date: "", reason: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://127.0.0.1:8000/api/leaves/", form, {
        withCredentials: true, // لو تستخدم session auth
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`, // لو تستخدم JWT
        },
      });
      setForm({ start_date: "", end_date: "", reason: "" });
      onCreated && onCreated();
      alert("تم إرسال الطلب بنجاح");
    } catch (err) {
      console.error(err);
      alert("خطأ أثناء الإرسال");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="border rounded p-3 mb-4">
      <h5 className="mb-3">إرسال طلب إجازة</h5>
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">من</label>
          <input
            type="date"
            className="form-control"
            value={form.start_date}
            onChange={(e) => setForm({ ...form, start_date: e.target.value })}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">إلى</label>
          <input
            type="date"
            className="form-control"
            value={form.end_date}
            onChange={(e) => setForm({ ...form, end_date: e.target.value })}
            required
          />
        </div>
        <div className="col-12">
          <label className="form-label">السبب</label>
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
        {loading ? "جار الإرسال..." : "إرسال"}
      </button>
    </form>
  );
}
