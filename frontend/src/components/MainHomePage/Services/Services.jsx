import { useState, useEffect } from "react";
import "./Services.css";
import Caretakervideo from "./Nurse Video.mp4";
import foodvideo from "./food.mp4";
import medicinevideo from "./medicine.mp4";
import guitarvideo from "./Guitar.mp4";

const servicesData = [
  {
    video: Caretakervideo,
    title: "Caretaker",
    description: "Providing attentive care to patients to ensure their well-being.",
    details: "Our caretakers are trained to provide personalized care, assist with daily activities, and ensure a comfortable environment for patients.",
  },
  {
    video: foodvideo,
    title: "Homemade Food",
    description: "Nutritious homemade meals tailored to the patient's needs.",
    details: "Our homemade meals are prepared by experienced chefs who specialize in healthy, nutritious, and patient-friendly diets.",
  },
  {
    video: guitarvideo,
    title: "Therapist",
    description: "Professional therapy services to support mental health.",
    details: "Our therapists provide expert mental health support and therapy sessions to help patients cope with their condition.",
  },
  {
    video: medicinevideo,
    title: "Medicine",
    description: "Professional therapy services to support mental health.",
    details: "Our therapists provide expert mental health support and therapy sessions to help patients cope with their condition.",
  },
];

const Services = () => {
  const [currentService, setCurrentService] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentService((prevService) => (prevService + 1) % servicesData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);



  return (
    <div className="services-container">
      <div className="service">
        {/* Full-screen video with smooth transition */}
        <video
          key={currentService} // Key prop to force re-render of the video when currentService changes
          src={servicesData[currentService].video}
          className="service-video"
          autoPlay
          loop
          muted
        />
        
        {/* Content overlay on left side */}
        <div className="service-content">
          <h2 className="service-title">{servicesData[currentService].title}</h2>
          <p className="service-description">
            {servicesData[currentService].description}
          </p>
          

          {/* Show service details with transition */}
          </div>
        </div>
      </div>
  );
};

export default Services;
