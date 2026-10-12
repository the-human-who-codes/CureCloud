import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { labelFor } from "../../utils/format";
import { Card, SectionTitle } from "../common/Card";
import InfoItem from "./InfoItem";

// Contact data. For patients it comes from the Patient record (with a separate contact email);
// for staff from the User. The sign-in email is always read-only (§2.1).
const ContactInformationSection = ({
  signInEmail,
  contactEmail,
  phone,
  emergencyContact,
  address,
  isPatient,
}) => {
  return (
    <Card>
      <SectionTitle spacing="lg">
        <FontAwesomeIcon icon={faAddressCard} className="mr-2" />
        Contact Information
      </SectionTitle>
      <div className="space-y-4">
        <InfoItem label="Sign-in email" value={signInEmail ?? "—"} />
        {isPatient && (
          <InfoItem label="Contact email" value={contactEmail ?? "—"} />
        )}
        <InfoItem label="Phone" value={phone ?? "—"} />
        {isPatient && (
          <InfoItem
            label="Address"
            value={
              address
                ? [
                    address.line1,
                    address.line2,
                    address.suburb,
                    address.city,
                    labelFor(address.province),
                    address.postalCode,
                  ]
                    .filter(Boolean)
                    .join(", ")
                : "—"
            }
          />
        )}
        <InfoItem
          label="Emergency Contact"
          value={emergencyContact?.name ?? "—"}
        >
          {emergencyContact && (
            <p className="font-poppins text-sm text-ink">
              {emergencyContact.relationship} • {emergencyContact.phone}
            </p>
          )}
        </InfoItem>
      </div>
    </Card>
  );
};

ContactInformationSection.propTypes = {
  signInEmail: PropTypes.string,
  contactEmail: PropTypes.string,
  phone: PropTypes.string,
  emergencyContact: PropTypes.shape({
    name: PropTypes.string,
    relationship: PropTypes.string,
    phone: PropTypes.string,
  }),
  address: PropTypes.object,
  isPatient: PropTypes.bool,
};

export default ContactInformationSection;
