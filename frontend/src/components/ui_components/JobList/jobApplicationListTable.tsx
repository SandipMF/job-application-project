import React, { useEffect, useState } from "react";
import { subscribe } from "../../../state";
import type { JobApplication } from "../../../models"; 
import "./jobApplicationListTable.css";

interface Props {
  applicationListData: JobApplication[];
  onEdit: (application: JobApplication) => void;
  onDelete: (application: JobApplication) => void;
}
export const JobApplicationListTable: React.FC<Props> = ({
  applicationListData,
  onEdit,
  onDelete,
}) => {
  const [applicationsData, setApplicationsData] = useState<JobApplication[]>(
    []
  );

  useEffect(() => {
    setApplicationsData(applicationListData);

    const unsubscribe = subscribe((app) => {
      setApplicationsData(app);
    });

    return unsubscribe;
  }, []);

  return (
    <div className="application-list-section">
      <h3>Job Application Table</h3>
      <div>
        <table className="application-list-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(applicationsData) &&
              applicationsData.map((application) => {
                return (
                  <tr>
                    <td>{application.company}</td>
                    <td>{application.role}</td>
                    <td>{application.jobType}</td>
                    <td>{application.status}</td>
                    <td>
                      <button
                        className="editBtn"
                        onClick={() => {
                          onEdit(application);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="deleteBtn"
                        onClick={() => {
                          onDelete(application);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
