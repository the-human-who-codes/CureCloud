import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { labelFor } from "../../utils/format";
import { Card, SectionTitle } from "../common/Card";
import InfoItem from "./InfoItem";

// Practitioner profile of a doctor or nurse (users/{uid}.practitioner).
const ProfessionalInformationSection = ({ practitioner }) => {
  const years =
    practitioner.practisingSince != null
      ? new Date().getFullYear() - practitioner.practisingSince
      : null;
  return (
    <Card>
      <SectionTitle spacing="lg">
        <FontAwesomeIcon icon={faUser} className="mr-2" />
        Professional Information
      </SectionTitle>
      <div className="space-y-4">
        <InfoItem
          label={`${labelFor(practitioner.licenceBody)} registration`}
          value={practitioner.licenceNumber ?? "Not recorded"}
        />
        <InfoItem
          label="Specialisation"
          value={practitioner.specialization ?? "—"}
        />
        <InfoItem
          label="Experience"
          value={
            years == null
              ? "—"
              : `${years} year${years === 1 ? "" : "s"} (since ${
                  practitioner.practisingSince
                })`
          }
        />
        <InfoItem label="Office" value={practitioner.officeLocation ?? "—"} />
        <InfoItem label="Qualifications">
          {practitioner.qualifications?.length ? (
            practitioner.qualifications.map((q) => (
              <div key={`${q.title}-${q.year}`} className="mt-2">
                <p className="font-poppins text-lg">{q.title}</p>
                <p className="font-poppins text-sm text-ink">
                  {q.institution}, {q.year}
                </p>
              </div>
            ))
          ) : (
            <p className="font-poppins text-lg">—</p>
          )}
        </InfoItem>
        {practitioner.bio && (
          <InfoItem label="About">
            <p className="font-poppins whitespace-pre-line">
              {practitioner.bio}
            </p>
          </InfoItem>
        )}
      </div>
    </Card>
  );
};

ProfessionalInformationSection.propTypes = {
  practitioner: PropTypes.shape({
    licenceBody: PropTypes.string,
    licenceNumber: PropTypes.string,
    specialization: PropTypes.string,
    practisingSince: PropTypes.number,
    officeLocation: PropTypes.string,
    bio: PropTypes.string,
    qualifications: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        institution: PropTypes.string,
        year: PropTypes.number,
      })
    ),
  }).isRequired,
};

export default ProfessionalInformationSection;
