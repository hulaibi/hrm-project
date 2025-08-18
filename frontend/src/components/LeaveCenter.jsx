import React from "react";
import LeaveRequestForm from "./LeaveRequestForm";
import LeaveRequests from "./LeaveRequests";

export default function LeaveCenter({ isHR = false }) {
  return (
    <div>
      {!isHR && <LeaveRequestForm onCreated={() => window.location.reload()} />}
      <LeaveRequests isHR={isHR} />
    </div>
  );
}
