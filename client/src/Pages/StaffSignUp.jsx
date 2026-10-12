import { useState } from "react";
import { Link } from "react-router-dom";
import {
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { api } from "../api/client";
import { auth } from "../firebaseConfig";
import { Button } from "../Components/common/Button";
import { ErrorMessage } from "../Components/common/AsyncContent";
import { FormField } from "../Components/common/FormField";
import {
  checks,
  compact,
  identifierError,
  validate,
} from "../utils/validation";

const INITIAL = {
  name: "",
  identifierType: "za-id",
  identifierValue: "",
  identifierCountry: "",
  email: "",
  phone: "",
  role: "nurse",
  licenceNumber: "",
  specialization: "",
  password: "",
  confirmPassword: "",
};

// Mirrors SignupRequest in the API (src/models/user.js).
const RULES = {
  name: checks.name,
  identifierValue: [
    checks.required,
    (value, v) =>
      identifierError({
        type: v.identifierType,
        value,
        country: v.identifierCountry,
      }),
  ],
  email: [checks.required, checks.email],
  phone: [checks.required, checks.phone],
  licenceNumber: checks.licenceNumber,
  specialization: checks.maxLength(100),
  password: (v) =>
    !v || v.length < 8
      ? "Password must be at least 8 characters"
      : v.length > 128
      ? "At most 128 characters"
      : null,
  confirmPassword: (v, all) =>
    v !== all.password ? "Passwords do not match" : null,
};

function StaffSignUp() {
  const [form, setForm] = useState(INITIAL);
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const errors = validate(form, RULES);
    setFieldErrors(errors);
    if (Object.keys(errors).length) return;

    setLoading(true);
    try {
      const email = form.email.trim().toLowerCase();
      await api.signupStaff(
        compact({
          name: form.name,
          email,
          phone: form.phone,
          role: form.role,
          password: form.password,
          licenceNumber: form.licenceNumber,
          specialization: form.specialization,
          identifier: compact({
            type: form.identifierType,
            value: form.identifierValue,
            country: form.identifierCountry.toUpperCase(),
          }),
        })
      );
      // Approval requires a verified email; Firebase sends the verification message itself.
      const { user } = await signInWithEmailAndPassword(
        auth,
        email,
        form.password
      );
      await sendEmailVerification(user);
      await signOut(auth);
      setDone(true);
    } catch (err) {
      setError(
        err.code === "conflict"
          ? { message: "This email cannot be used for staff sign-up." }
          : err
      );
      if (err.fieldErrors) setFieldErrors(err.fieldErrors());
    } finally {
      setLoading(false);
    }
  };

  const field = (name, label, props = {}) => (
    <FormField
      label={label}
      name={name}
      value={form[name]}
      onChange={handleChange}
      error={fieldErrors[name]}
      {...props}
    />
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface to-surface-tint flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-sm border border-line p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="font-poppins text-3xl font-bold text-primary mb-2">
            Join CureCloud
          </h1>
          <p className="font-poppins text-ink">
            Staff sign-up for doctors and nurses
          </p>
        </div>

        {done ? (
          <div className="p-4 bg-green-50 text-green-800 rounded-lg font-poppins text-center">
            Check your inbox to verify your email; your account then awaits
            approval by an administrator.
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <ErrorMessage error={error} className="mb-6" />
            <div className="space-y-6">
              {field("name", "Full Name", {
                required: true,
                placeholder: "Enter your full name",
              })}
              <FormField
                as="select"
                label="Identity Document"
                name="identifierType"
                value={form.identifierType}
                onChange={handleChange}
              >
                <option value="za-id">South African ID</option>
                <option value="passport">Passport</option>
                <option value="asylum-seeker-permit">
                  Asylum seeker permit
                </option>
                <option value="other">Other</option>
              </FormField>
              {field("identifierValue", "Document Number", { required: true })}
              {form.identifierType === "passport" &&
                field("identifierCountry", "Passport Country (e.g. ZW)", {
                  maxLength: 2,
                })}
              {field("email", "Email Address", {
                type: "email",
                required: true,
                placeholder: "Enter your work email",
              })}
              {field("phone", "Phone Number", {
                type: "tel",
                required: true,
                placeholder: "082 123 4567",
              })}
              <FormField
                as="select"
                label="Role"
                name="role"
                value={form.role}
                onChange={handleChange}
              >
                <option value="nurse">Nurse</option>
                <option value="doctor">Doctor</option>
              </FormField>
              {field(
                "licenceNumber",
                form.role === "doctor"
                  ? "HPCSA Registration Number (optional)"
                  : "SANC Registration Number (optional)"
              )}
              {field("specialization", "Specialisation (optional)")}
              {field("password", "Password", {
                type: "password",
                required: true,
                placeholder: "At least 8 characters",
              })}
              {field("confirmPassword", "Confirm Password", {
                type: "password",
                required: true,
              })}
            </div>

            <Button type="submit" disabled={loading} className="w-full mt-8">
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
        )}

        <p className="mt-6 text-center font-poppins text-sm text-ink">
          Already have an account?{" "}
          <Link to="/" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default StaffSignUp;
