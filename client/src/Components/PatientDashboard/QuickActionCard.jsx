import {
  faCalendarPlus,
  faPrescriptionBottle,
  faFileMedical,
  faCommentMedical,
} from "@fortawesome/free-solid-svg-icons";
import QuickActionButton from "./QuickActionButton";
const QuickActionCard = () => {
  return (
    <div>
      <h2 className="font-poppins text-xl font-semibold text-[#2c4ecf] mb-4">
        Quick Actions
      </h2>
      <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff]">
        <div className="space-y-4">
          {[
            {
              name: "Book Appointment",
              icon: faCalendarPlus,
            },
            {
              name: "Request Prescription Refill",
              icon: faPrescriptionBottle,
            },
            {
              name: "View Medical Records",
              icon: faFileMedical,
            },
            {
              name: "Message Doctor",
              icon: faCommentMedical,
            },
          ].map((action) => (
            <QuickActionButton
              key={action.name}
              name={action.name}
              icon={action.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default QuickActionCard;
