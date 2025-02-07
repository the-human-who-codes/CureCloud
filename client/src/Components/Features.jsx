import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/autoplay"; // Make sure to import autoplay CSS
import "./Features.css";

import healthRecordsIcon from "../assets/records.svg";
import appointmentIcon from "../assets/booking.svg";
import aiInsightsIcon from "../assets/ai.svg";
import dataSharingIcon from "../assets/data-sharing.svg";
import specialistsIcon from "../assets/specialist.svg";
import healthTrackingIcon from "../assets/health-tracking.svg";

const featuresData = [
  {
    icon: healthRecordsIcon,
    title: "Digital Health Records",
    description:
      "Securely store and access your medical history anytime, anywhere.",
  },
  {
    icon: appointmentIcon,
    title: "Appointment Booking",
    description:
      "Book appointments with specialists from the comfort of your home.",
  },
  {
    icon: aiInsightsIcon,
    title: "AI-Powered Insights",
    description:
      "Get tailored health insights and recommendations with AI integration.",
  },
  {
    icon: dataSharingIcon,
    title: "Secure Data Sharing",
    description:
      "Easily and securely share your medical records with healthcare professionals.",
  },
  {
    icon: specialistsIcon,
    title: "Specialist Availability",
    description:
      "Check availability and get instant access to specialists based on your needs.",
  },
  {
    icon: healthTrackingIcon,
    title: "Health Tracking",
    description:
      "Track your vitals, appointments, and progress over time to stay on top of your health.",
  },
];

function Features() {
  return (
    <section className="features" id="features">
      <div className="container">
        <h2>Features</h2>
        <Swiper
          modules={[EffectCoverflow, Pagination, Autoplay]} // Add Autoplay module
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          loop={true} // Enables looping
          autoplay={{
            delay: 3000, // Slide change delay (in milliseconds)
            disableOnInteraction: false, // Ensures autoplay continues after interaction
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 150,
            modifier: 2.5,
            slideShadows: false,
          }}
          pagination={{ clickable: true }}
          className="features-slider"
        >
          {featuresData.map((feature, index) => (
            <SwiperSlide key={index} className="feature-card">
              <div className="icon">
                <img src={feature.icon} alt={`${feature.title} Icon`} />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default Features;
