import React, { useState } from "react";
import type { JobApplication } from "../../../models"; 
import "./EditJobApplication.css";
import { appState } from "../../../state";
import { storeDataInLocalStorage } from "../../../storage";
import { editJobApplication } from "../../../services/jobApplicationApis";

type EditJobApplicationProps = {
  application: JobApplication;
  index: number;
  onClose: () => void;
};
export const EditJobApplication: React.FC<EditJobApplicationProps> = ({
  application,
  index,
  onClose,
}) => {
  const [editedApplication, setEditedApplication] =
    useState<JobApplication>(application);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const errors: string[] = [];
    if (!editedApplication.company.trim()) errors.push("Company is required.");
    if (!editedApplication.role.trim()) errors.push("Role is required.");
    if (!editedApplication.jobType) errors.push("Job Type is required.");
    if (
      editedApplication.jobType === "Onsite" &&
      !editedApplication.location.trim()
    )
      errors.push("Location is required for Onsite jobs.");
    if (!editedApplication.date.trim()) errors.push("Date is required.");
    if (!editedApplication.status) errors.push("Status is required.");

    if (errors.length > 0) {
      alert(
        "Please check the following validation errors:\n" + errors.join("\n")
      );
      return;
    }

    const newEditedApplication: JobApplication = {
      ...application,
      company: editedApplication.company.trim(),
      role: editedApplication.role.trim(),
      jobType: editedApplication.jobType,
      location:
        editedApplication.jobType === "Onsite"
          ? editedApplication.location.trim()
          : "",
      date: editedApplication.date,
      status: editedApplication.status,
      note: editedApplication.note.trim(),
    };

    await editJobApplication(application._id!, newEditedApplication)
      .then((response) => {
        if (response.data) {
          const updatedApplicationData = appState.jobApplications;
          updatedApplicationData[index] = newEditedApplication;
          appState.jobApplications = updatedApplicationData;
          storeDataInLocalStorage(appState.jobApplications);

          onClose();
        }
      })
      .catch((error: Error) => {
        console.log(error);
      });
  };

  return (
    <div className="edit-form" style={{ display: "flex" }}>
      <div className="edit-content">
        <h3>Edit Job Application</h3>
        <form className="edit-application-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="edit_company">Company:</label>
            <input
              type="text"
              id="edit_company"
              value={editedApplication.company}
              onChange={(e) =>
                setEditedApplication({
                  ...editedApplication,
                  company: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label htmlFor="edit_role">Role:</label>
            <input
              type="text"
              id="edit_role"
              value={editedApplication.role}
              onChange={(e) =>
                setEditedApplication({
                  ...editedApplication,
                  role: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label htmlFor="edit_jobType">Type:</label>
            <select
              id="edit_jobType"
              value={editedApplication.jobType}
              onChange={(e) =>
                setEditedApplication({
                  ...editedApplication,
                  jobType: e.target.value,
                })
              }
            >
              <option>Onsite</option>
              <option>Remote</option>
              <option>Hybrid</option>
            </select>
          </div>

          {editedApplication.jobType === "Onsite" && (
            <div>
              <label htmlFor="edit_location">Location:</label>
              <input
                type="text"
                id="edit_location"
                value={editedApplication.location}
                onChange={(e) =>
                  setEditedApplication({
                    ...editedApplication,
                    location: e.target.value,
                  })
                }
              />
            </div>
          )}

          <div>
            <label htmlFor="edit_date">Date:</label>
            <input
              type="date"
              id="edit_date"
              value={editedApplication.date}
              onChange={(e) =>
                setEditedApplication({
                  ...editedApplication,
                  date: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label htmlFor="edit_status">Status:</label>
            <select
              id="edit_status"
              value={editedApplication.status}
              onChange={(e) =>
                setEditedApplication({
                  ...editedApplication,
                  status: e.target.value,
                })
              }
            >
              <option>Applied</option>
              <option>Interviewing</option>
              <option>Rejected</option>
              <option>Hired</option>
            </select>
          </div>

          <div>
            <label htmlFor="edit_note">Note:</label>
            <textarea
              id="edit_note"
              rows={3}
              placeholder="Write your notes..."
              value={editedApplication.note}
              onChange={(e) =>
                setEditedApplication({
                  ...editedApplication,
                  note: e.target.value,
                })
              }
            ></textarea>
          </div>

          <div>
            <button type="submit" className="updateBtn">
              Update Application
            </button>
            <button type="button" className="cancelBtn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
