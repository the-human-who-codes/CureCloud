import { useState } from "react";
import { api } from "../api/client";
import { FormField } from "../Components/common/FormField";

const FIELDS = [
  {
    name: "fullName",
    label: "Full Name",
    type: "text",
    placeholder: "Enter your full name",
  },
  {
    name: "nationalId",
    label: "National ID Number",
    type: "text",
    placeholder: "Enter your ID number",
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    type: "tel",
    placeholder: "Enter your phone number",
  },
];

const PASSWORD_FIELDS = [
  { name: "password", label: "Password", placeholder: "Create a password" },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    placeholder: "Confirm your password",
  },
];

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

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

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
            {FIELDS.map(({ name, label, type, placeholder }) => (
              <FormField
                key={name}
                label={label}
                type={type}
                name={name}
                required
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleChange}
              />
            ))}
            <FormField
              as="select"
              label="Role"
              name="role"
              required
              value={formData.role}
              onChange={handleChange}
            >
              <option value="nurse">Nurse</option>
              <option value="doctor">Doctor</option>
              <option value="admin">Administrator</option>
            </FormField>
            {PASSWORD_FIELDS.map(({ name, label, placeholder }) => (
              <FormField
                key={name}
                label={label}
                type="password"
                name={name}
                required
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleChange}
              />
            ))}
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
