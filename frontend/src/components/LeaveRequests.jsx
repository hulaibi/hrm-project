import React, { useEffect, useState } from "react";
import axios from "axios";

export default function LeaveRequests({ isHR = false }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const { data } = await axios.get("http://127.0.0.1:8000/api/leaves/", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      setRequests(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const act = async (id, type) => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/leaves/${id}/${type}/`, {}, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      fetchRequests();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h4 className="mb-3">طلبات الإجازة</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>الموظف</th>
            <th>من</th>
            <th>إلى</th>
            <th>السبب</th>
            <th>الحالة</th>
            {isHR && <th>إجراءات</th>}
          </tr>
        </thead>
        <tbody>
          {requests.map((r, i) => (
            <tr key={r.id}>
              <td>{i + 1}</td>
              <td>{r.user_username}</td>
              <td>{r.start_date}</td>
              <td>{r.end_date}</td>
              <td>{r.reason}</td>
              <td>{r.status}</td>
              {isHR && (
                <td>
                  <button
                    className="btn btn-sm btn-success me-2"
                    onClick={() => act(r.id, "approve")}
                  >
                    قبول
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => act(r.id, "reject")}
                  >
                    رفض
                  </button>
                </td>
              )}
            </tr>
          ))}
          {requests.length === 0 && (
            <tr>
              <td colSpan={isHR ? 7 : 6} className="text-center">
                لا توجد طلبات
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
