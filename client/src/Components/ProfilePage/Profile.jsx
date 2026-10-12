import { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import ContactInformationSection from "./ContactInformationSection";
import ProfessionalInformationSection from "./ProfessionalInformationSection";
import ProfileCard from "./ProfileCard";
import ScheduleOverview from "./ScheduleOverview";
import InfoItem from "./InfoItem";
import { api } from "../../api/client";
import { useAuth } from "../../auth/AuthProvider";
import { useAction } from "../../hooks/useApi";
import { formatDate, labelFor, maskIdentifier } from "../../utils/format";
import { checks, compact, validate } from "../../utils/validation";
import { ErrorMessage } from "../common/AsyncContent";
import { Button, IconButton } from "../common/Button";
import { Card, SectionTitle } from "../common/Card";
import { FormField } from "../common/FormField";
import Modal from "../common/Modal";
import { PageShell } from "../common/PageShell";

const PROVINCES = [
  "eastern-cape",
  "free-state",
  "gauteng",
  "kwazulu-natal",
  "limpopo",
  "mpumalanga",
  "north-west",
  "northern-cape",
  "western-cape",
];
const thisYear = new Date().getFullYear();

const optional = (v) => (v.trim() ? v.trim() : null);

// One "Edit Profile" form. Staff and admins write PATCH /me; patients write their name to
// PATCH /me and their contact data to the Patient (PATCH /patients/{id}), its single source.
function ProfileForm({ onClose }) {
  const { user, patient, applyMe, setPatient } = useAuth();
  const isPatient = user.role === "patient";
  const contact = isPatient ? patient ?? {} : user;
  const practitioner = user.practitioner;
  const [form, setForm] = useState({
    name: user.name ?? "",
    phone: contact.phone ?? "",
    email: isPatient ? patient?.email ?? "" : "",
    ecName: contact.emergencyContact?.name ?? "",
    ecRelationship: contact.emergencyContact?.relationship ?? "",
    ecPhone: contact.emergencyContact?.phone ?? "",
    line1: patient?.address?.line1 ?? "",
    line2: patient?.address?.line2 ?? "",
    suburb: patient?.address?.suburb ?? "",
    city: patient?.address?.city ?? "",
    province: patient?.address?.province ?? "gauteng",
    postalCode: patient?.address?.postalCode ?? "",
    specialization: practitioner?.specialization ?? "",
    practisingSince: practitioner?.practisingSince?.toString() ?? "",
    officeLocation: practitioner?.officeLocation ?? "",
    bio: practitioner?.bio ?? "",
    qualifications: practitioner?.qualifications ?? [],
  });
  const [errors, setErrors] = useState({});
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const hasContact = [form.ecName, form.ecRelationship, form.ecPhone].some(
    (v) => v.trim()
  );
  const hasAddress = [form.line1, form.city, form.postalCode].some((v) =>
    v.trim()
  );
  const emergencyContact = hasContact
    ? {
        name: form.ecName.trim(),
        relationship: form.ecRelationship.trim(),
        phone: form.ecPhone.trim(),
      }
    : null;

  const save = useAction(async () => {
    if (isPatient) {
      if (form.name.trim() !== user.name)
        applyMe(await api.updateMe({ name: form.name.trim() }));
      if (patient)
        setPatient(
          await api.updatePatient(patient.id, {
            phone: optional(form.phone),
            email: optional(form.email),
            emergencyContact,
            address: hasAddress
              ? compact({
                  line1: form.line1,
                  line2: form.line2,
                  suburb: form.suburb,
                  city: form.city,
                  province: form.province,
                  postalCode: form.postalCode,
                  country: "ZA",
                })
              : null,
          })
        );
    } else {
      applyMe(
        await api.updateMe({
          name: form.name.trim(),
          phone: optional(form.phone),
          emergencyContact,
          ...(practitioner && {
            practitioner: {
              specialization: optional(form.specialization),
              practisingSince: form.practisingSince
                ? Number(form.practisingSince)
                : null,
              officeLocation: optional(form.officeLocation),
              bio: optional(form.bio),
              qualifications: form.qualifications
                .filter((q) => q.title.trim())
                .map((q) => ({
                  title: q.title.trim(),
                  institution: q.institution.trim(),
                  year: Number(q.year),
                })),
            },
          }),
        })
      );
    }
    onClose();
  });

  const submit = (e) => {
    e.preventDefault();
    const found = validate(form, {
      name: checks.name,
      phone: checks.phone,
      email: checks.email,
      ecName: (v) =>
        hasContact && v.trim().length < 2 ? "Name of the contact" : null,
      ecRelationship: (v) =>
        hasContact && !v.trim() ? "Required" : checks.maxLength(50)(v),
      ecPhone: [
        (v) => (hasContact && !v.trim() ? "Required" : null),
        checks.phone,
      ],
      line1: (v) =>
        hasAddress && !v.trim() ? "Required for an address" : null,
      city: (v) => (hasAddress && !v.trim() ? "Required for an address" : null),
      postalCode: [
        (v) => (hasAddress && !v.trim() ? "Required for an address" : null),
        checks.postalCode,
      ],
      specialization: checks.maxLength(100),
      practisingSince: checks.intRange(1940, thisYear),
      officeLocation: checks.maxLength(200),
      bio: checks.maxLength(1000),
    });
    const badQualification = form.qualifications.find(
      (q) =>
        q.title.trim() &&
        (!q.institution.trim() ||
          checks.intRange(1940, thisYear)(q.year) ||
          !q.year)
    );
    if (badQualification)
      found.qualifications =
        "Each qualification needs an institution and a year";
    setErrors(found);
    if (!Object.keys(found).length) save.run();
  };

  const field = (key, label, props = {}) => (
    <FormField
      label={label}
      value={form[key]}
      error={errors[key]}
      onChange={set(key)}
      {...props}
    />
  );
  const updateQualification = (i, patch) =>
    setForm({
      ...form,
      qualifications: form.qualifications.map((q, j) =>
        j === i ? { ...q, ...patch } : q
      ),
    });

  return (
    <Modal
      title="Edit Profile"
      onClose={onClose}
      size="xl"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="profile-form" disabled={save.busy}>
            {save.busy ? "Saving…" : "Save"}
          </Button>
        </>
      }
    >
      <form
        id="profile-form"
        onSubmit={submit}
        noValidate
        className="space-y-6"
      >
        <ErrorMessage error={save.error} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {field("name", "Display name", { maxLength: 120 })}
          {field("phone", "Phone", { type: "tel" })}
          {isPatient && field("email", "Contact email", { type: "email" })}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {field("ecName", "Emergency contact name")}
          {field("ecRelationship", "Relationship", { maxLength: 50 })}
          {field("ecPhone", "Emergency contact phone", { type: "tel" })}
        </div>
        {isPatient && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {field("line1", "Street address", { maxLength: 200 })}
            {field("line2", "Address line 2", { maxLength: 200 })}
            {field("suburb", "Suburb", { maxLength: 100 })}
            {field("city", "City or town", { maxLength: 100 })}
            <FormField
              as="select"
              label="Province"
              value={form.province}
              onChange={set("province")}
            >
              {PROVINCES.map((p) => (
                <option key={p} value={p}>
                  {labelFor(p)}
                </option>
              ))}
            </FormField>
            {field("postalCode", "Postal code", {
              maxLength: 4,
              inputMode: "numeric",
            })}
          </div>
        )}
        {practitioner && (
          <div className="space-y-4">
            <SectionTitle size="lg" spacing="none">
              Professional profile
            </SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {field("specialization", "Specialisation", { maxLength: 100 })}
              {field("practisingSince", "Practising since (year)", {
                type: "number",
                min: 1940,
                max: thisYear,
              })}
              {field("officeLocation", "Office location", { maxLength: 200 })}
            </div>
            {field("bio", "About you", {
              as: "textarea",
              rows: 3,
              maxLength: 1000,
            })}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="font-poppins text-sm text-ink">Qualifications</p>
                <Button
                  size="sm"
                  variant="secondary"
                  icon={faPlus}
                  disabled={form.qualifications.length >= 10}
                  onClick={() =>
                    setForm({
                      ...form,
                      qualifications: [
                        ...form.qualifications,
                        { title: "", institution: "", year: "" },
                      ],
                    })
                  }
                >
                  Add
                </Button>
              </div>
              {errors.qualifications && (
                <p className="font-poppins text-xs text-red-600 mb-2">
                  {errors.qualifications}
                </p>
              )}
              <div className="space-y-2">
                {form.qualifications.map((q, i) => (
                  <div key={i} className="flex items-end gap-2">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
                      <FormField
                        compact
                        label="Qualification"
                        value={q.title}
                        maxLength={120}
                        onChange={(e) =>
                          updateQualification(i, { title: e.target.value })
                        }
                      />
                      <FormField
                        compact
                        label="Institution"
                        value={q.institution}
                        maxLength={120}
                        onChange={(e) =>
                          updateQualification(i, {
                            institution: e.target.value,
                          })
                        }
                      />
                      <FormField
                        compact
                        label="Year"
                        type="number"
                        value={q.year}
                        onChange={(e) =>
                          updateQualification(i, { year: e.target.value })
                        }
                      />
                    </div>
                    <IconButton
                      icon={faTrash}
                      title="Remove"
                      className="text-red-500 hover:bg-red-50"
                      onClick={() =>
                        setForm({
                          ...form,
                          qualifications: form.qualifications.filter(
                            (_, j) => j !== i
                          ),
                        })
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </form>
    </Modal>
  );
}

ProfileForm.propTypes = { onClose: PropTypes.func.isRequired };

function ProfilePage() {
  const { user, patient, can } = useAuth();
  const [editing, setEditing] = useState(false);
  if (!user) return null;
  const isPatient = user.role === "patient";
  const title = [labelFor(user.role), user.practitioner?.specialization]
    .filter(Boolean)
    .join(" · ");
  const contact = isPatient ? patient ?? {} : user;

  return (
    <PageShell>
      <ProfileCard
        name={user.name}
        title={title}
        photoUrl={user.photoUrl ?? undefined}
        settingsPath={`/${user.role}/settings`}
        onEdit={() => setEditing(true)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          {user.practitioner && (
            <ProfessionalInformationSection practitioner={user.practitioner} />
          )}
          <ContactInformationSection
            isPatient={isPatient}
            signInEmail={user.email}
            contactEmail={patient?.email ?? undefined}
            phone={contact.phone ?? undefined}
            emergencyContact={contact.emergencyContact ?? undefined}
            address={patient?.address ?? undefined}
          />
        </div>
        {isPatient ? (
          <Card>
            <SectionTitle spacing="lg">
              <FontAwesomeIcon icon={faIdCard} className="mr-2" />
              Personal Details
            </SectionTitle>
            <div className="space-y-4">
              <InfoItem
                label="Date of birth"
                value={formatDate(patient?.birthDate)}
              />
              <InfoItem label="Sex" value={labelFor(patient?.sex)} />
              <InfoItem
                label="Folder number"
                value={patient?.folderNumber ?? "—"}
              />
              <InfoItem
                label="Identity document"
                value={
                  patient?.identifier
                    ? `${labelFor(patient.identifier.type)} ${maskIdentifier(
                        patient.identifier.value
                      )}`
                    : "Not on file"
                }
              >
                <p className="font-poppins text-xs text-ink">
                  Only hospital staff can record or change your ID number.
                </p>
              </InfoItem>
            </div>
          </Card>
        ) : (
          can("shift:read") && <ScheduleOverview />
        )}
      </div>
      {editing && <ProfileForm onClose={() => setEditing(false)} />}
    </PageShell>
  );
}

export default ProfilePage;
