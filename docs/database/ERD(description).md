## **1️⃣ Entity-Relationship Diagram (ERD) Description**

### **Core Entities & Relationships:**

-   **Users (Patients, Doctors, Nurses, Admins)**

    -   A user can be a **patient, doctor, nurse, or admin** (role-based access).
    -   Doctors & nurses **belong to a facility**.
    -   Patients can **book appointments** with doctors.

-   **Facilities (Hospitals/Clinics)**

    -   Each facility has **staff, patients, and resources**.
    -   Patients can be **admitted, transferred, or discharged**.

-   **Appointments & Scheduling**

    -   Patients can **book** and **reschedule** appointments.
    -   Doctors & nurses have **shift schedules**.

-   **Medical Records & Vitals**

    -   Every patient has a **medical record** linked to **diagnoses, treatments, and prescriptions**.
    -   Vitals are recorded and stored for **historical tracking**.

-   **Billing & Insurance**

    -   Patients have **invoices, payments, and insurance details**.
    -   Facilities track **outstanding balances and transactions**.

-   **Real-Time Chat (Future Feature)**
    -   Only **staff members** can chat with each other.
    -   Messages are stored in a **chat history** table.

---

## **2️⃣ Schema Definitions (Tables & Columns)**

I'll define the key tables and their attributes.

### **🔹 Users Table** (`users`)

| Column Name   | Data Type    | Constraints                           | Description                     |
| ------------- | ------------ | ------------------------------------- | ------------------------------- |
| `id`          | UUID         | Primary Key                           | Unique identifier for the user  |
| `name`        | VARCHAR(255) | NOT NULL                              | Full name                       |
| `email`       | VARCHAR(255) | UNIQUE, NOT NULL                      | Email (used for authentication) |
| `role`        | ENUM         | CHECK (doctor, nurse, patient, admin) | Defines user type               |
| `facility_id` | UUID         | Foreign Key → `facilities.id`         | If staff, linked to a facility  |
| `created_at`  | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP             | Timestamp of account creation   |

---

### **🔹 Facilities Table** (`facilities`)

| Column Name | Data Type    | Constraints              | Description                |
| ----------- | ------------ | ------------------------ | -------------------------- |
| `id`        | UUID         | Primary Key              | Unique facility ID         |
| `name`      | VARCHAR(255) | NOT NULL                 | Facility name              |
| `location`  | TEXT         | NOT NULL                 | Address or GPS coordinates |
| `type`      | ENUM         | CHECK (hospital, clinic) | Type of facility           |
| `capacity`  | INT          | NOT NULL                 | Maximum number of patients |

---

### **🔹 Appointments Table** (`appointments`)

| Column Name  | Data Type | Constraints                                      | Description                        |
| ------------ | --------- | ------------------------------------------------ | ---------------------------------- |
| `id`         | UUID      | Primary Key                                      | Unique appointment ID              |
| `patient_id` | UUID      | Foreign Key → `users.id`                         | Patient who booked the appointment |
| `doctor_id`  | UUID      | Foreign Key → `users.id`                         | Doctor assigned to the appointment |
| `date`       | TIMESTAMP | NOT NULL                                         | Scheduled appointment date/time    |
| `status`     | ENUM      | CHECK (pending, confirmed, cancelled, completed) | Appointment status                 |
| `notes`      | TEXT      | NULL                                             | Optional notes from the doctor     |

---

### **🔹 Medical Records Table** (`medical_records`)

| Column Name  | Data Type | Constraints               | Description                    |
| ------------ | --------- | ------------------------- | ------------------------------ |
| `id`         | UUID      | Primary Key               | Unique record ID               |
| `patient_id` | UUID      | Foreign Key → `users.id`  | Patient this record belongs to |
| `doctor_id`  | UUID      | Foreign Key → `users.id`  | Doctor who added the record    |
| `diagnosis`  | TEXT      | NOT NULL                  | Medical diagnosis              |
| `treatment`  | TEXT      | NOT NULL                  | Prescribed treatment           |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Timestamp of the record        |

---

### **🔹 Billing Table** (`billing`)

| Column Name   | Data Type     | Constraints                    | Description                |
| ------------- | ------------- | ------------------------------ | -------------------------- |
| `id`          | UUID          | Primary Key                    | Unique billing ID          |
| `patient_id`  | UUID          | Foreign Key → `users.id`       | Linked patient             |
| `facility_id` | UUID          | Foreign Key → `facilities.id`  | Facility providing service |
| `amount`      | DECIMAL(10,2) | NOT NULL                       | Amount to be paid          |
| `status`      | ENUM          | CHECK (pending, paid, overdue) | Payment status             |
| `created_at`  | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP      | Billing timestamp          |

---

### **🔹 Chat Messages Table** (`messages`)

| Column Name   | Data Type | Constraints               | Description               |
| ------------- | --------- | ------------------------- | ------------------------- |
| `id`          | UUID      | Primary Key               | Unique message ID         |
| `sender_id`   | UUID      | Foreign Key → `users.id`  | Who sent the message      |
| `receiver_id` | UUID      | Foreign Key → `users.id`  | Who received the message  |
| `content`     | TEXT      | NOT NULL                  | Message content           |
| `timestamp`   | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | When the message was sent |

---

## **3️⃣ Data Flow Explanation 🚀**

1. **Authentication**

    - User logs in using **Google OAuth**.
    - The system retrieves or creates a user in the `users` table.

2. **Booking Appointments**

    - A **patient selects a doctor** and **chooses a time slot**.
    - An entry is created in `appointments` with `status = "pending"`.

3. **Managing Medical Records**

    - Doctors can **update patient medical records** in `medical_records`.
    - A patient's **vital signs history** is tracked in `vitals`.

4. **Billing Process**

    - Once an **appointment is completed**, a **billing entry is created**.
    - The patient or their insurance **pays the bill** (updating the `billing` table).

5. **Chat System for Staff**
    - A **doctor or nurse** sends a message.
    - It is **stored in the `messages` table** with timestamps.

---
