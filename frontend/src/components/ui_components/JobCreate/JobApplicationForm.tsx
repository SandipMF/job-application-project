import React, { useState } from "react";
import type { JobApplication } from "../../../models";
import { appState } from "../../../state";
import { storeDataInLocalStorage } from "../../../storage";
import "./JobApplicationForm.css";
import { createNewJobApplication } from "../../../services/jobApplicationApis";

export const JobApplicationForm: React.FC = () => {
  const [form, setForm] = useState({
    company: "",
    role: "",
    jobType: "Onsite",
    location: "",
    date: "",
    status: "Applied",
    note: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors: string[] = [];
    if (!form.company) errors.push("Company is required.");
    if (!form.role) errors.push("Role is required.");
    if (!form.jobType) errors.push("Job Type is required.");
    if (form.jobType === "Onsite" && !form.location)
      errors.push("Location is required for Onsite jobs.");
    if (!form.date) errors.push("Date is required.");
    if (!form.status) errors.push("Status is required.");

    if (errors.length > 0) {
      alert(
        "Please check the following validation errors:\n" + errors.join("\n")
      );
      return;
    }

    const newApplication: JobApplication = {
      // id: crypto.randomUUID(),
      company: form.company.trim(),
      role: form.role.trim(),
      jobType: form.jobType,
      location: form.jobType === "Onsite" ? form.location.trim() : "",
      date: form.date,
      status: form.status,
      note: form.note.trim(),
    };

    await createNewJobApplication(newApplication)
      .then((response) => {
        if (response.data) {
          appState.jobApplications = [
            ...appState.jobApplications,
            { ...newApplication, _id: response.data._id },
          ];
          storeDataInLocalStorage(appState.jobApplications);

          // Reset form
          setForm({
            company: "",
            role: "",
            jobType: "Onsite",
            location: "",
            date: "",
            status: "Applied",
            note: "",
          });
        }
      })
      .catch((error: Error) => {
        console.log(error);
      });
  };

  return (
    <div className="form-section">
      <h3>Application Form</h3>
      <form className="application-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="company">Company:</label>
          <input
            type="text"
            id="company"
            value={form.company}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="role">Role:</label>
          <input
            type="text"
            id="role"
            value={form.role}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="jobType">Type:</label>
          <select id="jobType" value={form.jobType} onChange={handleChange}>
            <option>Onsite</option>
            <option>Remote</option>
            <option>Hybrid</option>
          </select>
        </div>
        {form.jobType === "Onsite" && (
          <div id="locationDiv">
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              value={form.location}
              onChange={handleChange}
            />
          </div>
        )}
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={form.date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <select id="status" value={form.status} onChange={handleChange}>
            <option>Applied</option>
            <option>Interviewing</option>
            <option>Rejected</option>
            <option>Hired</option>
          </select>
        </div>
        <div>
          <label htmlFor="note">Note:</label>
          <textarea
            id="note"
            rows={3}
            placeholder="Write your notes..."
            value={form.note}
            onChange={handleChange}
          />
        </div>
        <div className="div-footer-button-container">
          <button className="submitBtn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
