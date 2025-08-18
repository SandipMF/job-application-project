# **Job Application Tracker**

Design a **Job Application Tracker** where users can log job applications they've submitted. The form dynamically adjusts based on job type (e.g., remote, onsite), and applications are stored in local storage. Users can view, edit, and delete their applications. The app should also provide visual status (applied/interviewing/rejected/hired) and count per status.

---

### ✅ **Functional Requirements**

**As a user, I want to:**

1. **Fill out a job application form with:**
    - Company Name
    - Role
    - Job Type (Remote / Onsite / Hybrid)
    - Location (required only if job type ≠ Remote)
    - Application Date
    - Application Status (dropdown: Applied, Interviewing, Rejected, Hired)
    - Notes (optional)
2. **On clicking "Add Application", it should:**
    - Add the entry to the right-hand table
    - Store it in local storage
    - Update the total and per-status counts
3. **Click "Edit" to:**
    - Load the record into the form
    - Change button to "Update Application"
    - Save the updated data into the table and storage
4. **Click "Delete" to:**
    - Remove the entry from the table and storage
    - Update all counters
5. **On page reload:**
    - Restore all job entries and counts from local storage

---

### **Special Behavior**

- Location field is hidden/disabled when job type is "Remote"
- Status is color-coded (e.g., green = Hired, red = Rejected)
- Each status count is displayed at the top

---

### **Layout Structure**

```
┌────────────────────────────────────────────────────────────────────────┐
│ Job Applications: 6 | Applied: 2 | Interviewing: 2 | Hired: 1 | ❌ 1   │
├─────────────────────────────┬──────────────────────────────────────────┤
│ 📝 Application Form         │ 📄 Job Applications Table               │
│ ┌─────────────────────────┐ │ ┌──────────────────────────────────────┐ │
│ │ Company:    [_______]   │ │ │ Company | Role | Type | Status | 🛠️ │ │
│ │ Role:       [_______]   │ │ │ Google  | SWE  | Remote| Hired |[✏][❌]│ │
│ │ Type:       [Remote ▼]  │ │ │ XYZ     | PM   | Onsite| Applied|[✏][❌]│ │
│ │ Location:   [_______]   │ │ └──────────────────────────────────────┘ │
│ │ Date:       [📅_____]   │ │                                          │
│ │ Status:     [Applied▼] │ │                                          │
│ │ Notes:      [_______]   │ │                                          │
│ │ [Add Application]       │ │                                          │
└─────────────────────────────┴──────────────────────────────────────────┘

```
