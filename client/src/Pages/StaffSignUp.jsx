import { useState } from "react";

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
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to sign up");
      }

      window.location.href = "/role-selection";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8faff] to-[#e6eaff] flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-sm border border-[#e1e8ff] p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="font-poppins text-3xl font-bold text-[#2c4ecf] mb-2">
            Join CureCloud
          </h1>
          <p className="font-poppins text-[#4a5568]">
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
              <label className="block font-poppins text-sm text-[#4a5568] mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                required
                className="w-full px-4 py-3 rounded-lg border border-[#e1e8ff] focus:border-[#2c4ecf] focus:ring-1 focus:ring-[#2c4ecf] font-poppins"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block font-poppins text-sm text-[#4a5568] mb-2">
                National ID Number
              </label>
              <input
                type="text"
                name="nationalId"
                required
                className="w-full px-4 py-3 rounded-lg border border-[#e1e8ff] focus:border-[#2c4ecf] focus:ring-1 focus:ring-[#2c4ecf] font-poppins"
                placeholder="Enter your ID number"
                value={formData.nationalId}
                onChange={(e) =>
                  setFormData({ ...formData, nationalId: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block font-poppins text-sm text-[#4a5568] mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-lg border border-[#e1e8ff] focus:border-[#2c4ecf] focus:ring-1 focus:ring-[#2c4ecf] font-poppins"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block font-poppins text-sm text-[#4a5568] mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                required
                className="w-full px-4 py-3 rounded-lg border border-[#e1e8ff] focus:border-[#2c4ecf] focus:ring-1 focus:ring-[#2c4ecf] font-poppins"
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block font-poppins text-sm text-[#4a5568] mb-2">
                Role
              </label>
              <select
                name="role"
                required
                className="w-full px-4 py-3 rounded-lg border border-[#e1e8ff] focus:border-[#2c4ecf] focus:ring-1 focus:ring-[#2c4ecf] font-poppins"
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
              <label className="block font-poppins text-sm text-[#4a5568] mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                className="w-full px-4 py-3 rounded-lg border border-[#e1e8ff] focus:border-[#2c4ecf] focus:ring-1 focus:ring-[#2c4ecf] font-poppins"
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block font-poppins text-sm text-[#4a5568] mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                required
                className="w-full px-4 py-3 rounded-lg border border-[#e1e8ff] focus:border-[#2c4ecf] focus:ring-1 focus:ring-[#2c4ecf] font-poppins"
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
            className="w-full mt-8 px-6 py-3 bg-[#2c4ecf] text-white rounded-lg font-poppins font-semibold hover:bg-[#2341b0] transition-colors duration-200 disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center font-poppins text-sm text-[#4a5568]">
          Already have an account?{" "}
          <a href="/login" className="text-[#2c4ecf] hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}

export default StaffSignUp;
