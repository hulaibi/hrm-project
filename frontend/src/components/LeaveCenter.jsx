// src/components/LeaveCenter.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import LeaveRequestForm from "./LeaveRequestForm";
import LeaveRequests from "./LeaveRequests";

const API_BASE = import.meta?.env?.VITE_API_URL || "http://localhost:8000/api";

export default function LeaveCenter({ isHR: routeHR = false }) {
  const { t } = useTranslation();

  const [me, setMe] = useState({ username: "guest", is_staff: false });
  const [loading, setLoading] = useState(true);

  const rawToken =
    localStorage.getItem("access_token") || localStorage.getItem("access");
  const token =
    rawToken && rawToken !== "null" && rawToken !== "undefined" ? rawToken : null;
  const useJWT = !!token;

  const baseCfg = useJWT
    ? { headers: { Authorization: `Bearer ${token}` } }
    : { withCredentials: true };

  const fetchMe = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_BASE}/auth/me/`, baseCfg);
      setMe(data || { username: "guest", is_staff: false });
    } catch {
      const role = localStorage.getItem("role");
      setMe({ username: "guest", is_staff: role === "hr" || role === "admin" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isHR = routeHR || me.is_staff;

  if (loading) return <div>{t("loading")}</div>;

  return (
    <div className="space-y-3">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <div>
          <h3 className="m-0">{t("leaveCenterTitle")}</h3>
          <div className="text-muted">{t("leaveRequestsTitle")}</div>
        </div>
        <span className={`badge ${isHR ? "bg-secondary" : "bg-info text-dark"}`}>
          {isHR ? t("hrMode") : t("employeeMode")}
        </span>
      </div>

      {!isHR && <LeaveRequestForm onCreated={() => window.location.reload()} />}

      {/* لا نُظهر شارة/هيدر/معلومة التوثيق مرة ثانية؛ تُعرض مرة واحدة هنا */}
      <LeaveRequests
        isHR={isHR}
        showHeader={false}
        showBadge={false}
        showAuthHint={false}
      />
    </div>
  );
}
