import { useState } from "react";
import { api } from "../api/client";

function StaffSignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    nationalId: "",
    role: "nurse",
    phoneNumber: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      await api.signupStaff(formData);

      window.location.href = "/role-selection";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface to-surface-tint flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-sm border border-line p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="font-poppins text-3xl font-bold text-primary mb-2">
            Join CureCloud
          </h1>
          <p className="font-poppins text-ink">
            Create your account to get started
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label className="block font-poppins text-sm text-ink mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                required
                className="w-full px-4 py-3 rounded-lg border border-line focus:border-primary focus:ring-1 focus:ring-primary font-poppins"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block font-poppins text-sm text-ink mb-2">
                National ID Number
              </label>
              <input
                type="text"
                name="nationalId"
                required
                className="w-full px-4 py-3 rounded-lg border border-line focus:border-primary focus:ring-1 focus:ring-primary font-poppins"
                placeholder="Enter your ID number"
                value={formData.nationalId}
                onChange={(e) =>
                  setFormData({ ...formData, nationalId: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block font-poppins text-sm text-ink mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-lg border border-line focus:border-primary focus:ring-1 focus:ring-primary font-poppins"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block font-poppins text-sm text-ink mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                required
                className="w-full px-4 py-3 rounded-lg border border-line focus:border-primary focus:ring-1 focus:ring-primary font-poppins"
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block font-poppins text-sm text-ink mb-2">
                Role
              </label>
              <select
                name="role"
                required
                className="w-full px-4 py-3 rounded-lg border border-line focus:border-primary focus:ring-1 focus:ring-primary font-poppins"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
              >
                <option value="nurse">Nurse</option>
                <option value="doctor">Doctor</option>
                <option value="admin">Administrator</option>
              </select>
            </div>

            <div>
              <label className="block font-poppins text-sm text-ink mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                className="w-full px-4 py-3 rounded-lg border border-line focus:border-primary focus:ring-1 focus:ring-primary font-poppins"
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block font-poppins text-sm text-ink mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                required
                className="w-full px-4 py-3 rounded-lg border border-line focus:border-primary focus:ring-1 focus:ring-primary font-poppins"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-8 px-6 py-3 bg-primary text-white rounded-lg font-poppins font-semibold hover:bg-primary-hover transition-colors duration-200 disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center font-poppins text-sm text-ink">
          Already have an account?{" "}
          <a href="/login" className="text-primary hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}

export default StaffSignUp;
