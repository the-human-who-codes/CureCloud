import Notifications from "../Components/Notifications/Notifications";
import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar";

const NotificationsPage = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Header />
        <div className="flex-grow">
          <Notifications />
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
