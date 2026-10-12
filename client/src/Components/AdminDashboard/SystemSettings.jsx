import { useEffect, useState } from "react";
import { faSave, faServer } from "@fortawesome/free-solid-svg-icons";
import { api } from "../../api/client";
import { useAuth } from "../../auth/AuthProvider";
import { useAction, useApi } from "../../hooks/useApi";
import { formatDateTime, labelFor } from "../../utils/format";
import { checks, validate } from "../../utils/validation";
import AsyncContent, { ErrorMessage } from "../common/AsyncContent";
import { Button } from "../common/Button";
import { Card } from "../common/Card";
import { Checkbox, FormField } from "../common/FormField";
import { PageHeader, PageShell } from "../common/PageShell";
import Tabs from "../common/Tabs";

const LANGUAGES = ["en", "af", "zu", "xh"];
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TIME_ZONES = ["Africa/Johannesburg", "UTC"];
const TABS = [
  { value: "general", label: "General" },
  { value: "appointments", label: "Appointments" },
  { value: "security", label: "Security" },
];
const REGION = "africa-south1";

// SystemSettings -> flat form state (strings for inputs).
const toForm = (s) => ({
  organisationName: s.organisationName ?? "",
  supportEmail: s.supportEmail ?? "",
  supportPhone: s.supportPhone ?? "",
  defaultTimeZone: s.defaultTimeZone,
  defaultLanguage: s.defaultLanguage,
  maintenanceBanner: s.maintenanceBanner ?? "",
  defaultDurationMinutes: String(s.appointments.defaultDurationMinutes),
  bookingWindowDays: String(s.appointments.bookingWindowDays),
  minLeadTimeMinutes: String(s.appointments.minLeadTimeMinutes),
  patientCancellationCutoffHours: String(
    s.appointments.patientCancellationCutoffHours
  ),
  openingStart: s.appointments.openingHours.start,
  openingEnd: s.appointments.openingHours.end,
  openingDays: s.appointments.openingHours.days,
  sessionTimeoutMinutes: String(s.security.sessionTimeoutMinutes),
});

const quarterHour = (v) =>
  checks.time(v) ??
  (Number(v.slice(3)) % 15 ? "Use a 15-minute boundary" : null);

// Mirrors SystemSettingsUpdateRequest (src/models/preferences.js).
const RULES = {
  organisationName: [checks.required, checks.maxLength(120)],
  supportEmail: checks.email,
  supportPhone: checks.phone,
  maintenanceBanner: checks.maxLength(300),
  bookingWindowDays: [checks.required, checks.intRange(1, 365)],
  minLeadTimeMinutes: [checks.required, checks.intRange(0, 1440)],
  patientCancellationCutoffHours: [checks.required, checks.intRange(0, 72)],
  openingStart: quarterHour,
  openingEnd: [
    quarterHour,
    (v, f) => (v <= f.openingStart ? "Must be after the opening time" : null),
  ],
  openingDays: (v) => (v.length ? null : "Choose at least one day"),
  sessionTimeoutMinutes: [checks.required, checks.intRange(5, 480)],
};

const toBody = (f) => ({
  organisationName: f.organisationName.trim(),
  supportEmail: f.supportEmail.trim() || null,
  supportPhone: f.supportPhone.trim() || null,
  defaultTimeZone: f.defaultTimeZone,
  defaultLanguage: f.defaultLanguage,
  maintenanceBanner: f.maintenanceBanner.trim() || null,
  appointments: {
    defaultDurationMinutes: Number(f.defaultDurationMinutes),
    bookingWindowDays: Number(f.bookingWindowDays),
    minLeadTimeMinutes: Number(f.minLeadTimeMinutes),
    patientCancellationCutoffHours: Number(f.patientCancellationCutoffHours),
    openingHours: {
      start: f.openingStart,
      end: f.openingEnd,
      days: [...f.openingDays].sort(),
    },
  },
  security: { sessionTimeoutMinutes: Number(f.sessionTimeoutMinutes) },
});

// GET / PATCH /system-settings. Everyone can read them; only system admins may save (§2.16).
function SystemSettings() {
  const { isSystemAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState("general");
  const settings = useApi(() => api.getSystemSettings());
  const health = useApi(() => api.health());
  const [form, setForm] = useState(null);
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (settings.data) setForm(toForm(settings.data));
  }, [settings.data]);

  const save = useAction(async () => {
    settings.setData(await api.updateSystemSettings(toBody(form)));
    setSaved(true);
  });
  const submit = (e) => {
    e.preventDefault();
    setSaved(false);
    const found = validate(form, RULES);
    setErrors(found);
    if (!Object.keys(found).length) save.run();
  };

  const field = (key, label, props = {}) => (
    <FormField
      label={label}
      value={form[key]}
      error={errors[key]}
      disabled={!isSystemAdmin}
      onChange={(e) => {
        setSaved(false);
        setForm({ ...form, [key]: e.target.value });
      }}
      {...props}
    />
  );
  const toggleDay = (day, on) =>
    setForm({
      ...form,
      openingDays: on
        ? [...form.openingDays, day]
        : form.openingDays.filter((d) => d !== day),
    });

  return (
    <PageShell>
      <PageHeader
        title="System Settings"
        subtitle={
          isSystemAdmin
            ? undefined
            : "Only system administrators can change these settings."
        }
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card padded={false} className="lg:col-span-2">
          <Tabs tabs={TABS} value={activeTab} onChange={setActiveTab} />
          <AsyncContent
            loading={settings.loading || !form}
            error={settings.error}
          >
            {form && (
              <form onSubmit={submit} noValidate className="p-6 space-y-6">
                <ErrorMessage error={save.error} />
                {saved && (
                  <p className="p-3 bg-green-50 text-green-800 rounded-lg font-poppins text-sm">
                    Settings saved.
                  </p>
                )}
                {activeTab === "general" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {field("organisationName", "Organisation name", {
                      maxLength: 120,
                    })}
                    {field("supportEmail", "Support email", { type: "email" })}
                    {field("supportPhone", "Support phone", { type: "tel" })}
                    {field("defaultTimeZone", "Default time zone", {
                      as: "select",
                      children: TIME_ZONES.map((tz) => (
                        <option key={tz} value={tz}>
                          {tz}
                        </option>
                      )),
                    })}
                    {field("defaultLanguage", "Default language", {
                      as: "select",
                      hint: "Only English UI text exists for now.",
                      children: LANGUAGES.map((l) => (
                        <option key={l} value={l}>
                          {labelFor(l)}
                        </option>
                      )),
                    })}
                    {field(
                      "maintenanceBanner",
                      "Maintenance banner (shown to all users)",
                      {
                        as: "textarea",
                        rows: 2,
                        maxLength: 300,
                        wrapperClassName: "md:col-span-2",
                      }
                    )}
                  </div>
                )}
                {activeTab === "appointments" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {field("defaultDurationMinutes", "Default duration", {
                        as: "select",
                        children: [15, 30, 45, 60].map((d) => (
                          <option key={d} value={d}>
                            {d} minutes
                          </option>
                        )),
                      })}
                      {field(
                        "bookingWindowDays",
                        "Booking window (days ahead)",
                        { type: "number", min: 1, max: 365 }
                      )}
                      {field(
                        "minLeadTimeMinutes",
                        "Minimum lead time (minutes)",
                        { type: "number", min: 0, max: 1440 }
                      )}
                      {field(
                        "patientCancellationCutoffHours",
                        "Patient cancellation cutoff (hours)",
                        {
                          type: "number",
                          min: 0,
                          max: 72,
                        }
                      )}
                      {field("openingStart", "Opening time", {
                        type: "time",
                        step: 900,
                      })}
                      {field("openingEnd", "Closing time", {
                        type: "time",
                        step: 900,
                      })}
                    </div>
                    <div>
                      <p className="font-poppins text-sm text-ink mb-2">
                        Open on
                      </p>
                      <div className="flex flex-wrap gap-4">
                        {WEEKDAYS.map((name, i) => (
                          <Checkbox
                            key={name}
                            label={name}
                            disabled={!isSystemAdmin}
                            checked={form.openingDays.includes(i + 1)}
                            onChange={(on) => toggleDay(i + 1, on)}
                          />
                        ))}
                      </div>
                      {errors.openingDays && (
                        <p className="mt-1 font-poppins text-xs text-red-600">
                          {errors.openingDays}
                        </p>
                      )}
                    </div>
                  </div>
                )}
                {activeTab === "security" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {field("sessionTimeoutMinutes", "Idle sign-out (minutes)", {
                      type: "number",
                      min: 5,
                      max: 480,
                    })}
                  </div>
                )}
                {isSystemAdmin && (
                  <div className="flex justify-end gap-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setForm(toForm(settings.data));
                        setErrors({});
                        setSaved(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" icon={faSave} disabled={save.busy}>
                      {save.busy ? "Saving…" : "Save Changes"}
                    </Button>
                  </div>
                )}
              </form>
            )}
          </AsyncContent>
        </Card>
        <Card title="System Status" titleSize="lg">
          <AsyncContent loading={health.loading} error={health.error}>
            <div className="space-y-3 font-poppins text-sm text-ink">
              <p>
                <span className="text-ink-muted">API: </span>
                <span className="text-primary">
                  {health.data?.status === "ok" ? "Online" : "Unknown"}
                </span>
              </p>
              <p>
                <span className="text-ink-muted">Version: </span>
                <span className="text-primary">{health.data?.version}</span>
              </p>
              <p>
                <span className="text-ink-muted">Region: </span>
                <span className="text-primary">{REGION}</span>
              </p>
              {settings.data?.updatedAt && (
                <p>
                  <span className="text-ink-muted">
                    Settings last changed:{" "}
                  </span>
                  {formatDateTime(settings.data.updatedAt)}
                </p>
              )}
            </div>
          </AsyncContent>
          <Button
            variant="secondary"
            size="sm"
            icon={faServer}
            className="mt-4"
            onClick={() => health.reload()}
          >
            Check again
          </Button>
        </Card>
      </div>
    </PageShell>
  );
}

export default SystemSettings;
