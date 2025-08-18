import React, { useEffect, useState } from "react";
import type { JobApplication } from "../../../models"; 
import { appState, subscribe } from "../../../state";
import "./JobApplicationSummary.css";

interface StatusCount {
  total: number;
  applied: number;
  interviewing: number;
  hired: number;
  rejected: number;
}

export const JobApplicationSummary: React.FC = () => {
  const [statusCount, setStatusCount] = useState<StatusCount>({
    total: 0,
    applied: 0,
    interviewing: 0,
    hired: 0,
    rejected: 0,
  });

  useEffect(() => {
    const updateSummary = (applications: JobApplication[]) => {
      const total = applications.length;
      const applied = applications.filter((a) => a.status === "Applied").length;
      const interviewing = applications.filter(
        (a) => a.status === "Interviewing"
      ).length;
      const hired = applications.filter((a) => a.status === "Hired").length;
      const rejected = applications.filter(
        (a) => a.status === "Rejected"
      ).length;

      setStatusCount({ total, applied, interviewing, hired, rejected });
    };

    updateSummary(appState.jobApplications);

    const unsubscribe = subscribe(updateSummary);

    return unsubscribe;
  }, []);

  return (
    <div className="summary-row" id="jobSummary">
      <div className="indevidual-status">
        Job Application: {statusCount.total}
      </div>
      <div className="indevidual-status">Applied: {statusCount.applied}</div>
      <div className="indevidual-status">
        Interviewing: {statusCount.interviewing}
      </div>
      <div className="indevidual-status hired">Hired: {statusCount.hired}</div>
      <div className="rejected">Rejected: {statusCount.rejected}</div>
    </div>
  );
};
