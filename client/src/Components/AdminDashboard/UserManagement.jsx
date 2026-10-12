import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import {
  faCopy,
  faEye,
  faUserCheck,
  faUserClock,
  faUserSlash,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { api, listAll } from "../../api/client";
import { useAuth } from "../../auth/AuthProvider";
import { useAction, useApi, usePagedApi } from "../../hooks/useApi";
import { formatDateTime, labelFor, relativeTime } from "../../utils/format";
import { checks } from "../../utils/validation";
import AsyncContent, { ErrorMessage, LoadMore } from "../common/AsyncContent";
import { Button, IconButton } from "../common/Button";
import { Card } from "../common/Card";
import { FilterSelect, FormField } from "../common/FormField";
import InitialsAvatar from "../common/InitialsAvatar";
import Modal from "../common/Modal";
import { PageHeader, PageShell } from "../common/PageShell";
import ReasonModal from "../common/ReasonModal";
import { StatCard } from "../common/StatCard";
import StatusBadge from "../common/StatusBadge";
import { DataTable, Td } from "../common/TableHead";

const STAFF = ["doctor", "nurse"];

// Approve a pending signup, or move an active doctor/nurse, or change their role. Activating
// staff needs a facility, a licence number and (nurses) a department of that facility (§2.1).
function AccountForm({ target, mode, facilities, onClose, onSaved }) {
  const { user, isSystemAdmin } = useAuth();
  const [role, setRole] = useState(target.role);
  const [facilityId, setFacilityId] = useState(
    target.facilityId ??
      (isSystemAdmin ? facilities[0]?.id ?? "" : user.facilityId)
  );
  const [departmentId, setDepartmentId] = useState(target.departmentId ?? "");
  const [licenceNumber, setLicenceNumber] = useState(
    target.practitioner?.licenceNumber ?? ""
  );
  const [formError, setFormError] = useState(null);
  const departments = useApi(
    () =>
      facilityId && STAFF.includes(role)
        ? listAll(api.listDepartments, {
            facilityId: isSystemAdmin ? facilityId : undefined,
            status: "active",
          })
        : Promise.resolve([]),
    [facilityId, role]
  );

  const roleChanged = role !== target.role;
  const save = useAction(async () => {
    const body = {};
    if (mode === "approve") body.status = "active";
    if (roleChanged) body.role = role;
    if (STAFF.includes(role)) {
      if (
        facilityId !== target.facilityId ||
        departmentId !== (target.departmentId ?? "")
      ) {
        body.facilityId = facilityId;
        body.departmentId = departmentId || null;
      }
      if (
        licenceNumber.trim() !== (target.practitioner?.licenceNumber ?? "") ||
        roleChanged
      )
        body.practitioner = { licenceNumber: licenceNumber.trim() };
    }
    if (!Object.keys(body).length) return onClose();
    onSaved(await api.updateUser(target.id, body));
    onClose();
  });

  const submit = (e) => {
    e.preventDefault();
    setFormError(null);
    if (STAFF.includes(role)) {
      if (!facilityId) return setFormError("Choose a facility.");
      if (role === "nurse" && !departmentId)
        return setFormError("Nurses need a department (their ward).");
      if (!licenceNumber.trim() || checks.licenceNumber(licenceNumber))
        return setFormError(
          `Enter a valid ${
            role === "doctor" ? "HPCSA" : "SANC"
          } number (4–20 letters, digits, / or -).`
        );
    }
    save.run();
  };

  const roles = isSystemAdmin ? ["doctor", "nurse", "admin"] : STAFF;
  const title =
    mode === "approve" ? `Approve ${target.name}` : `Edit ${target.name}`;

  return (
    <Modal
      title={title}
      onClose={onClose}
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="account-form" disabled={save.busy}>
            {save.busy ? "Saving…" : mode === "approve" ? "Approve" : "Save"}
          </Button>
        </>
      }
    >
      <form
        id="account-form"
        onSubmit={submit}
        noValidate
        className="space-y-4"
      >
        <ErrorMessage error={save.error ?? departments.error} />
        {formError && <ErrorMessage error={{ message: formError }} />}
        <FormField
          as="select"
          label="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          {roles.map((r) => (
            <option key={r} value={r}>
              {labelFor(r)}
            </option>
          ))}
        </FormField>
        {STAFF.includes(role) && (
          <>
            {isSystemAdmin ? (
              <FormField
                as="select"
                label="Facility"
                value={facilityId}
                onChange={(e) => {
                  setFacilityId(e.target.value);
                  setDepartmentId("");
                }}
              >
                <option value="">Choose a facility</option>
                {facilities.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </FormField>
            ) : (
              <p className="font-poppins text-sm text-ink">
                Facility: your facility
              </p>
            )}
            <FormField
              as="select"
              label={
                role === "nurse" ? "Department (ward)" : "Department (optional)"
              }
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
            >
              <option value="">None</option>
              {(departments.data ?? []).map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </FormField>
            <FormField
              label={`${
                role === "doctor" ? "HPCSA" : "SANC"
              } registration number`}
              value={licenceNumber}
              maxLength={20}
              hint={
                roleChanged
                  ? "Licence numbers are body-specific: enter the new one."
                  : undefined
              }
              onChange={(e) => setLicenceNumber(e.target.value)}
            />
          </>
        )}
      </form>
    </Modal>
  );
}

AccountForm.propTypes = {
  target: PropTypes.object.isRequired,
  mode: PropTypes.oneOf(["approve", "edit"]).isRequired,
  facilities: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired,
};

function Detail({ label, children }) {
  return (
    <div>
      <p className="font-poppins text-xs text-ink-muted">{label}</p>
      <p className="font-poppins text-primary">{children || "—"}</p>
    </div>
  );
}

Detail.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node,
};

// Account details (GET /users/{id}): identity, contact and practitioner profile.
function UserDetail({ userId, departmentName, facilityName, onClose }) {
  const detail = useApi(() => api.getUser(userId), [userId]);
  const u = detail.data;
  const p = u?.practitioner;
  return (
    <Modal title={u?.name ?? "User"} onClose={onClose} size="lg">
      <AsyncContent loading={detail.loading} error={detail.error}>
        {u && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Detail label="Email">
              {u.email}
              {u.emailVerified === false && " (not verified)"}
            </Detail>
            <Detail label="Phone">{u.phone}</Detail>
            <Detail label="Role">{labelFor(u.role)}</Detail>
            <Detail label="Status">
              {labelFor(u.status)}
              {u.statusReason ? ` — ${u.statusReason}` : ""}
            </Detail>
            <Detail label="Facility">{facilityName(u.facilityId)}</Detail>
            <Detail label="Department">{departmentName(u.departmentId)}</Detail>
            <Detail label="Identity document">
              {u.identifier &&
                `${labelFor(u.identifier.type)}: ${u.identifier.value}`}
            </Detail>
            <Detail label="Emergency contact">
              {u.emergencyContact &&
                `${u.emergencyContact.name} (${u.emergencyContact.relationship}) · ${u.emergencyContact.phone}`}
            </Detail>
            {p && (
              <>
                <Detail label="Licence">
                  {labelFor(p.licenceBody)} {p.licenceNumber}
                </Detail>
                <Detail label="Specialisation">{p.specialization}</Detail>
                <Detail label="Practising since">{p.practisingSince}</Detail>
                <Detail label="Office">{p.officeLocation}</Detail>
                <Detail label="Qualifications">
                  {p.qualifications
                    ?.map((q) => `${q.title}, ${q.institution} (${q.year})`)
                    .join("; ")}
                </Detail>
              </>
            )}
            <Detail label="Last sign-in">
              {u.lastSignInAt && formatDateTime(u.lastSignInAt)}
            </Detail>
            <Detail label="Created">{formatDateTime(u.createdAt)}</Detail>
          </div>
        )}
      </AsyncContent>
    </Modal>
  );
}

UserDetail.propTypes = {
  userId: PropTypes.string.isRequired,
  departmentName: PropTypes.func.isRequired,
  facilityName: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

function UserManagement() {
  const { user, isSystemAdmin } = useAuth();
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const role = params.get("role") ?? "all";
  const status = params.get("status") ?? "all";
  const departmentId = params.get("departmentId") ?? "";
  const [search, setSearch] = useState(q);
  const [dialog, setDialog] = useState(null);
  const [copied, setCopied] = useState(false);
  useEffect(() => setSearch(q), [q]);

  const dashboard = useApi(() => api.getDashboard());
  const facilities = useApi(() => listAll(api.listFacilities));
  const departments = useApi(() => listAll(api.listDepartments));
  const users = usePagedApi(
    (cursor) =>
      api.listUsers({
        // The API combines the name search only with role and status (§2.19).
        q: departmentId ? undefined : q || undefined,
        role: role === "all" ? undefined : role,
        status: status === "all" ? undefined : status,
        departmentId: departmentId || undefined,
        cursor,
      }),
    [q, role, status, departmentId]
  );

  const setParam = (key, value) =>
    setParams((p) => {
      const next = new URLSearchParams(p);
      if (value && value !== "all") next.set(key, value);
      else next.delete(key);
      return next;
    });

  const departmentName = (id) =>
    id ? departments.data?.find((d) => d.id === id)?.name ?? "—" : "—";
  const facilityName = (id) =>
    id ? facilities.data?.find((f) => f.id === id)?.name ?? "—" : "Unassigned";

  const replace = (u) => {
    users.setItems((items) =>
      items.map((x) => (x.id === u.id ? { ...x, ...u } : x))
    );
    dashboard.reload();
  };
  const enable = useAction(async (target) =>
    replace(await api.updateUser(target.id, { status: "active" }))
  );

  const c = dashboard.data?.counters;
  const roleOptions = [
    { value: "all", label: "All roles" },
    ...["doctor", "nurse", "admin", ...(isSystemAdmin ? ["patient"] : [])].map(
      (r) => ({ value: r, label: labelFor(r) })
    ),
  ];
  const copyLink = async () => {
    await navigator.clipboard?.writeText(
      `${window.location.origin}/staff-sign-up`
    );
    setCopied(true);
  };

  // Only system admins manage admin and patient accounts; nobody manages their own (§2.1).
  const manageable = (target) =>
    target.id !== user.id && (isSystemAdmin || STAFF.includes(target.role));

  return (
    <PageShell>
      <PageHeader
        title="User Management"
        actions={
          <Button icon={faCopy} variant="secondary" onClick={copyLink}>
            {copied ? "Link copied" : "Copy staff sign-up link"}
          </Button>
        }
      />
      {c && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard label="Total Users" value={c.totalUsers} icon={faUsers} />
          <StatCard
            label="Active Users"
            value={c.activeUsers}
            icon={faUserCheck}
            tone="success"
          />
          <StatCard
            label="Pending Staff"
            value={c.pendingStaff}
            icon={faUserClock}
            tone="warning"
          />
          <StatCard
            label="Disabled"
            value={c.disabledUsers}
            icon={faUserSlash}
            tone="danger"
          />
        </div>
      )}

      <Card className="mb-6">
        <form
          className="flex flex-wrap items-end gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            setParam("q", search.trim());
          }}
        >
          <FormField
            compact
            label="Search by name"
            type="search"
            value={search}
            maxLength={60}
            disabled={Boolean(departmentId)}
            onChange={(e) => setSearch(e.target.value)}
            wrapperClassName="flex-1 min-w-[200px]"
          />
          <FilterSelect
            label="Role"
            value={role}
            onChange={(v) => setParam("role", v)}
            options={roleOptions}
          />
          <FilterSelect
            label="Status"
            value={status}
            onChange={(v) => setParam("status", v)}
            options={["all", "active", "pending", "disabled"].map((s) => ({
              value: s,
              label: s === "all" ? "All statuses" : labelFor(s),
            }))}
          />
          <FilterSelect
            label="Department"
            value={departmentId}
            onChange={(v) => setParam("departmentId", v)}
            options={[
              { value: "", label: "All departments" },
              ...(departments.data ?? []).map((d) => ({
                value: d.id,
                label: d.name,
              })),
            ]}
          />
          <Button type="submit" variant="secondary">
            Search
          </Button>
        </form>
      </Card>

      <ErrorMessage error={enable.error} className="mb-4" />
      <AsyncContent
        loading={users.loading}
        error={users.error}
        empty={users.items.length === 0}
        emptyText="No users match these filters."
      >
        <Card padded={false}>
          <DataTable
            columns={[
              "User",
              "Role",
              isSystemAdmin ? "Facility / Department" : "Department",
              "Status",
              "Last sign-in",
              "Actions",
            ]}
          >
            {users.items.map((u) => (
              <tr key={u.id}>
                <Td>
                  <div className="flex items-center gap-3">
                    <InitialsAvatar
                      name={u.name}
                      photoUrl={u.photoUrl ?? undefined}
                    />
                    <div>
                      <p className="font-medium text-primary">{u.name}</p>
                      <p className="text-sm">{u.email}</p>
                    </div>
                  </div>
                </Td>
                <Td>{labelFor(u.role)}</Td>
                <Td className="text-sm">
                  {isSystemAdmin && (
                    <span className="block">{facilityName(u.facilityId)}</span>
                  )}
                  {departmentName(u.departmentId)}
                </Td>
                <Td>
                  <StatusBadge status={u.status} />
                  {u.emailVerified === false && (
                    <StatusBadge
                      tone="warning"
                      size="sm"
                      className="block mt-1 w-fit"
                    >
                      Email not verified
                    </StatusBadge>
                  )}
                </Td>
                <Td className="text-sm">
                  {u.lastSignInAt ? relativeTime(u.lastSignInAt) : "Never"}
                </Td>
                <Td>
                  <div className="flex flex-wrap items-center gap-2">
                    <IconButton
                      icon={faEye}
                      title="View details"
                      className="text-primary hover:bg-line"
                      onClick={() => setParam("user", u.id)}
                    />
                    {manageable(u) && u.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          disabled={u.emailVerified === false}
                          title={
                            u.emailVerified === false
                              ? "The user must verify their email address first"
                              : undefined
                          }
                          onClick={() =>
                            setDialog({ type: "approve", target: u })
                          }
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() =>
                            setDialog({ type: "reject", target: u })
                          }
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    {manageable(u) && u.status === "active" && (
                      <>
                        {u.role !== "patient" && (
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() =>
                              setDialog({ type: "edit", target: u })
                            }
                          >
                            Edit
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() =>
                            setDialog({ type: "disable", target: u })
                          }
                        >
                          Disable
                        </Button>
                      </>
                    )}
                    {manageable(u) && u.status === "disabled" && (
                      <Button
                        size="sm"
                        variant="secondary"
                        disabled={enable.busy}
                        onClick={() => enable.run(u)}
                      >
                        Enable
                      </Button>
                    )}
                  </div>
                </Td>
              </tr>
            ))}
          </DataTable>
          <LoadMore {...users} />
        </Card>
      </AsyncContent>

      {params.get("user") && (
        <UserDetail
          userId={params.get("user")}
          departmentName={departmentName}
          facilityName={facilityName}
          onClose={() => setParam("user", null)}
        />
      )}
      {(dialog?.type === "approve" || dialog?.type === "edit") && (
        <AccountForm
          target={dialog.target}
          mode={dialog.type}
          facilities={facilities.data ?? []}
          onClose={() => setDialog(null)}
          onSaved={replace}
        />
      )}
      {(dialog?.type === "reject" || dialog?.type === "disable") && (
        <ReasonModal
          title={`${dialog.type === "reject" ? "Reject" : "Disable"} ${
            dialog.target.name
          }`}
          confirmLabel={
            dialog.type === "reject" ? "Reject signup" : "Disable account"
          }
          required={dialog.type === "reject"}
          onClose={() => setDialog(null)}
          onSubmit={async (statusReason) =>
            replace(
              await api.updateUser(dialog.target.id, {
                status: "disabled",
                ...(statusReason && { statusReason }),
              })
            )
          }
        />
      )}
    </PageShell>
  );
}

export default UserManagement;
