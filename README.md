---

# **CureCloud**

A centralized health management system for modernizing healthcare record-keeping and patient management.

## **Overview**

CureCloud is an open-source, cloud-based health management system designed for hospitals and clinics. It streamlines patient information storage, specialist bookings, and medical record management, eliminating the need for physical records. The goal is to provide a universal healthcare platform with potential AI-driven insights in future iterations.

## **Getting Started**

### **Running the Project Locally**

To set up and run the project locally, follow these steps:

1. **Clone the Repository:**

   ```sh
   git clone [Insert GitHub Repo URL]
   cd CureCloud
   ```

2. **Navigate to the Client Directory:**

   ```sh
   cd ./client
   ```

3. **Install Dependencies:**

   ```sh
   npm install
   ```

4. **Run the Development Server:**
   ```sh
   npm run dev
   ```

This will start the frontend, and you should see the application running on `http://localhost:5173` (or the assigned port).

## **Contributing**

Contributions are welcome! Whether it's fixing bugs, suggesting new features, or improving the UI, feel free to collaborate.

### **How to Contribute**

1. **Fork the repository** and create a new branch for your changes.
2. **Open an issue** if you have an idea or found a bug.
3. **Make your changes**, then commit and push your branch.
4. **Submit a Pull Request (PR)** to the main repo for review.

### **Deployment**

For testing deployment locally, you can use Firebase Emulator:

1. **Install Firebase CLI (if not installed):**

   ```sh
   npm install -g firebase-tools
   ```

2. **Start the Firebase Emulator:**
   ```sh
   firebase emulators:start
   ```

This will simulate how the app will function when deployed.

Once your changes are ready, submit a **Pull Request** to merge your contributions into the main branch.

## **License**

This project is open-source under the [MIT License](LICENSE).

---
