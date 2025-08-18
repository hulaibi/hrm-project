// src/components/LeaveRequests.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const API_BASE = import.meta?.env?.VITE_API_URL || "http://localhost:8000/api";

export default function LeaveRequests({
  isHR = false,
  showHeader = false,
  showBadge = false,
  showAuthHint = false,
}) {
  const { t } = useTranslation();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  const rawToken =
    localStorage.getItem("access_token") || localStorage.getItem("access");
  const token =
    rawToken && rawToken !== "null" && rawToken !== "undefined" ? rawToken : null;
  const useJWT = !!token;

  const baseCfg = useJWT
    ? { headers: { Authorization: `Bearer ${token}` } }
    : { withCredentials: true };

  const fetchRequests = async () => {
    setLoading(true);
    setErrMsg("");
    try {
      const { data } = await axios.get(`${API_BASE}/leaves/`, baseCfg);
      const rows = Array.isArray(data) ? data : data?.results ?? [];
      setRequests(rows);
    } catch (e) {
      console.error(e);
      if (e.response) {
        setErrMsg(`${t("fetchError")} (${e.response.status})`);
      } else if (e.message?.includes("Network Error")) {
        setErrMsg(
          useJWT
            ? t("leaveForm.netErrJwt")
            : t("leaveForm.netErrSession")
        );
      } else {
        setErrMsg(t("fetchError"));
      }
    } finally {
      setLoading(false);
    }
  };

  const act = async (id, type) => {
    setErrMsg("");
    try {
      await axios.post(`${API_BASE}/leaves/${id}/${type}/`, {}, baseCfg);
      fetchRequests();
    } catch (e) {
      console.error(e);
      setErrMsg(t("updateError"));
    }
  };

  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <div>{t("loading")}</div>;

  const statusBadgeClass = (s) =>
    s === "approved"
      ? "badge bg-success"
      : s === "rejected"
      ? "badge bg-danger"
      : "badge bg-warning text-dark";

  const statusLabel = (s) => t(`leaveState.${s}`, { defaultValue: s });

  return (
    <div>
      {(showHeader || showBadge) && (
        <div className="d-flex align-items-center justify-content-between mb-3">
          {showHeader ? <h4 className="m-0">{t("leaveRequestsTitle")}</h4> : <div />}
          {showBadge && (
            <span className={`badge ${isHR ? "bg-secondary" : "bg-info text-dark"}`}>
              {isHR ? t("hrMode") : t("employeeMode")}
            </span>
          )}
        </div>
      )}

      {errMsg && <div className="alert alert-warning py-2">{errMsg}</div>}

      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>{t("table.idx")}</th>
              <th>{t("table.employee")}</th>
              <th>{t("table.from")}</th>
              <th>{t("table.to")}</th>
              <th>{t("table.reason")}</th>
              <th>{t("table.state")}</th>
              {isHR && <th style={{ minWidth: 160 }}>{t("table.actions")}</th>}
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 && (
              <tr>
                <td colSpan={isHR ? 7 : 6} className="text-center">
                  {t("table.noData")}
                </td>
              </tr>
            )}
            {requests.map((r, i) => (
              <tr key={r.id}>
                <td>{i + 1}</td>
                <td>{r.user_username || r.user || "-"}</td>
                <td>{r.start_date}</td>
                <td>{r.end_date}</td>
                <td className="text-break">{r.reason}</td>
                <td>
                  <span className={statusBadgeClass(r.status)}>
                    {statusLabel(r.status)}
                  </span>
                </td>
                {isHR && (
                  <td className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => act(r.id, "approve")}
                    >
                      {t("table.approve")}
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => act(r.id, "reject")}
                    >
                      {t("table.reject")}
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAuthHint && (
        <div className="form-text mt-2">
          {t("authHint")}: {useJWT ? "JWT (Authorization header)" : "Session (withCredentials)"}
        </div>
      )}
    </div>
  );
}
