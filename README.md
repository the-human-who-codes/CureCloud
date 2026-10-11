Here's your updated **README.md** with a direct link to the API repo:  

---

# **CureCloud**

A **centralized health management system** designed to modernize healthcare record-keeping, **enhance patient management**, and **streamline hospital operations** with secure, cloud-based technology.

## **📌 Overview**

CureCloud is a **cloud-based health management platform** for hospitals and clinics. It eliminates physical medical records by providing a **secure, scalable**, and **integrated system** for:  
✅ **Patient Information Storage**  
✅ **Seamless Booking for Specialists**  
✅ **Medical Record Management**  
✅ **AI-driven Insights & Analytics** _(future iterations)_

Built with **scalability and security** in mind, CureCloud aims to become a **universal healthcare platform**.

---

## **🚀 Getting Started**

### **1️⃣ Clone the Repository**

```sh
git clone [Repository URL]
cd CureCloud
```

### **2️⃣ Client Setup**

```sh
cd ./client
npm install
npm run dev
```

-   The frontend will be available at **`http://localhost:5173`** (or the assigned port).

### **3️⃣ Backend Setup**

The API lives in **[CureCloudBackend](https://github.com/the-human-who-codes/CureCloudBackend)**
(Express on Cloud Functions + Firestore). Clone it next to this repo, then:

```sh
cd ../CureCloudBackend
npm install
npm run serve          # Auth, Firestore and Functions emulators
```

```sh
cd ../CureCloud/client
npm run dev:emulator   # frontend wired to the local emulators
```

`npm run dev` (without emulators) calls the deployed API directly (`VITE_API_BASE_URL` in `client/.env.development`).

---

## **🔗 API Repository**

📌 **[CureCloudBackend](https://github.com/the-human-who-codes/CureCloudBackend)** — endpoints, roles and data model.

Refer to the API documentation for available endpoints and integration details.

---

## **🗄️ Database Schema & ERD**

CureCloud follows a structured **Entity-Relationship Model (ERD)**.  
📌 **[View the ERD](docs/database/ERD.md)**

```
docs/
│── database/
│   ├── ERD.md       # Entity-Relationship Diagram description
│   ├── schema.sql   # SQL schema definition
│   ├── curecloud_erd.puml  # ERD in PlantUML format
```

---

## **📬 Feature Development & User Stories**

🚀 **All feature requests, enhancements, and user stories are tracked in [GitHub Issues](https://github.com/your-repo/issues).**

Contributors can **browse existing tasks** or **submit new issues** for discussion and development.

---

## **🤝 Contributions & Community**

CureCloud is an **open-source project**. Contributions are welcome!

-   **Guidelines:** [CONTRIBUTING.md](CONTRIBUTING.md)
-   **Report Issues:** [GitHub Issues](https://github.com/your-repo/issues)
-   **Feature Requests:** Open a GitHub discussion.

**🚀 Deployment is automated upon pull request approval.**

---

## **📜 License**

CureCloud is licensed under the **GNU Affero General Public License (AGPL-3.0)**.

**🔹 Key Points:**

-   ✅ Free to use, modify, and distribute.
-   ❗ Any modifications **must be open-sourced** if deployed as a service.
-   🏢 Commercial usage **must** also comply with AGPL.
-   🔒 Proprietary licenses available upon request.

📌 See the [LICENSE](LICENSE) file for details.

---

## **📎 Useful Links**

-   📖 **[API Documentation](docs/API.md)**
-   🎨 **[UI/UX Design](docs/design.md)**
-   🏗️ **[Project Architecture](docs/Architecture.md)**
-   📊 **[Database Schema](docs/database/ERD.md)**
-   🚀 **[Deployment Guide](docs/Deployment.md)**

