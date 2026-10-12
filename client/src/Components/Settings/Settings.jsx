import { useEffect, useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import {
  faExternalLinkAlt,
  faKey,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { api } from "../../api/client";
import { useAuth } from "../../auth/AuthProvider";
import { useAction, useApi } from "../../hooks/useApi";
import { auth } from "../../firebaseConfig";
import { labelFor, setDisplayTimeZone } from "../../utils/format";
import AsyncContent, { ErrorMessage } from "../common/AsyncContent";
import { Button } from "../common/Button";
import { Card, SectionTitle } from "../common/Card";
import { Checkbox, FormField } from "../common/FormField";
import { PageHeader, PageShell } from "../common/PageShell";

const LANGUAGES = ["en", "af", "zu", "xh"];
const TIME_ZONES = [
  ["Africa/Johannesburg", "South Africa (SAST, UTC+2)"],
  ["Africa/Harare", "Central Africa (CAT, UTC+2)"],
  ["Africa/Nairobi", "East Africa (EAT, UTC+3)"],
  ["Africa/Lagos", "West Africa (WAT, UTC+1)"],
  ["Europe/London", "United Kingdom"],
  ["UTC", "UTC"],
];
const CHANNELS = [
  ["inApp", "In-app notifications", null],
  ["email", "Email notifications", "Not yet delivered"],
  ["sms", "SMS notifications", "Not yet delivered"],
];

// The caller's preferences (GET / PATCH /me/preferences) and account security.
function SettingsPage() {
  const { user, firebaseUser } = useAuth();
  const preferences = useApi(() => api.getPreferences());
  const [form, setForm] = useState(null);
  const [saved, setSaved] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  useEffect(() => {
    if (preferences.data) setForm(preferences.data);
  }, [preferences.data]);

  const save = useAction(async () => {
    const next = await api.updatePreferences({
      notifications: form.notifications,
      language: form.language,
      timeZone: form.timeZone,
    });
    preferences.setData(next);
    setDisplayTimeZone(next.timeZone);
    setSaved(true);
  });
  const reset = useAction(async () => {
    await sendPasswordResetEmail(auth, user.email);
    setResetSent(true);
  });

  const change = (patch) => {
    setSaved(false);
    setForm((f) => ({ ...f, ...patch }));
  };
  const providers = (firebaseUser?.providerData ?? []).map((p) => p.providerId);
  const passwordAccount = providers.includes("password");

  return (
    <PageShell>
      <PageHeader title="Settings" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <SectionTitle spacing="lg">Preferences</SectionTitle>
          <AsyncContent
            loading={preferences.loading || !form}
            error={preferences.error}
          >
            {form && (
              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  save.run();
                }}
              >
                <ErrorMessage error={save.error} />
                <div>
                  <h3 className="font-poppins text-ink font-medium mb-4">
                    Notification Preferences
                  </h3>
                  <div className="space-y-3">
                    {CHANNELS.map(([key, label, hint]) => (
                      <Checkbox
                        key={key}
                        label={label}
                        hint={hint}
                        checked={form.notifications[key]}
                        onChange={(on) =>
                          change({
                            notifications: { ...form.notifications, [key]: on },
                          })
                        }
                      />
                    ))}
                  </div>
                </div>
                <FormField
                  as="select"
                  label="Language"
                  hint="English only for now."
                  value={form.language}
                  onChange={(e) => change({ language: e.target.value })}
                >
                  {LANGUAGES.map((l) => (
                    <option key={l} value={l}>
                      {labelFor(l)}
                    </option>
                  ))}
                </FormField>
                <FormField
                  as="select"
                  label="Time zone"
                  hint="Dates and times in CureCloud are shown in this zone."
                  value={form.timeZone}
                  onChange={(e) => change({ timeZone: e.target.value })}
                >
                  {TIME_ZONES.some(([tz]) => tz === form.timeZone) ? null : (
                    <option value={form.timeZone}>{form.timeZone}</option>
                  )}
                  {TIME_ZONES.map(([tz, label]) => (
                    <option key={tz} value={tz}>
                      {label}
                    </option>
                  ))}
                </FormField>
                <div className="flex items-center gap-4">
                  <Button type="submit" icon={faSave} disabled={save.busy}>
                    {save.busy ? "Saving…" : "Save"}
                  </Button>
                  {saved && (
                    <span className="font-poppins text-sm text-green-700">
                      Saved.
                    </span>
                  )}
                </div>
              </form>
            )}
          </AsyncContent>
        </Card>

        <Card>
          <SectionTitle spacing="lg">Security</SectionTitle>
          <div className="space-y-4">
            <ErrorMessage error={reset.error} />
            <p className="font-poppins text-sm text-ink">
              Signed in as <span className="text-primary">{user?.email}</span>
            </p>
            {passwordAccount ? (
              <>
                <Button
                  variant="secondary"
                  icon={faKey}
                  disabled={reset.busy || resetSent}
                  onClick={() => reset.run()}
                >
                  Change Password
                </Button>
                {resetSent && (
                  <p className="font-poppins text-sm text-green-700">
                    We sent a password reset link to your email.
                  </p>
                )}
              </>
            ) : (
              <a
                href="https://myaccount.google.com/security"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-surface text-primary rounded-lg font-poppins hover:bg-line"
              >
                <FontAwesomeIcon icon={faExternalLinkAlt} />
                Manage your Google account security
              </a>
            )}
          </div>
        </Card>
      </div>
    </PageShell>
  );
}

export default SettingsPage;
