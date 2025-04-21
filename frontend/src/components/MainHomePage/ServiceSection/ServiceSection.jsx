import  { useState } from 'react';
import './ServiceSection.css';
import nurse from './nurse_14.jpg'
import nurse2 from './nurse_11.jpg'
import nurse3 from './nurse_10.jpg'

const ServiceSection = () => {
  const [activeDoctor, setActiveDoctor] = useState(null);

  const doctors = [
    {
      id: 1,
      name: "Sarah Johnson",
      specialty: "CareTaker",
      image: nurse, 
      description: "With over a decade of experience in elderly care, Sarah Johnson is known for her compassionate approach and dedication to improving the quality of life for her patients. She specializes in providing personalized assistance, ensuring that every individual receives the care and attention they need"
    },
    {
      id: 2,
      name: "Shweta Sharma",
      specialty: "CareTaker",
      image: nurse2,
      description: "Shweta is a skilled caretaker with a background in post-surgical care and rehabilitation. Her expertise lies in assisting patients with mobility challenges, daily activities, and emotional well-being. Her warm nature and patience make her a trusted companion for those in need."
    },
    {
      id: 3,
      name: " Emily Williams",
      specialty: "CareTaker",
      image: nurse3, 
      description: "Emily Williams is a dedicated pediatrician with a passion for caring for children and their families. She has extensive experience in managing chronic conditions and providing support to families navigating complex healthcare needs. Her gentle demeanor and expertise make her a favorite among both patients and parents."
    }
  ];

  return (
    <section className="service-section">
      <h2 className="section-title">Our Top CareTakers</h2>
      <div className="doctors-container">
        {doctors.map((doctor) => (
          <div 
            key={doctor.id} 
            className={`doctor-card ${activeDoctor === doctor.id ? 'active' : ''}`}
            onClick={() => setActiveDoctor(activeDoctor === doctor.id ? null : doctor.id)}
          >
            <div className="doctor-image-container">
              <img src={doctor.image} alt={doctor.name} className="doctor-image" />
            </div>
            <h3 className="doctor-name">{doctor.name}</h3>
            <p className="doctor-specialty">{doctor.specialty}</p>
            {activeDoctor === doctor.id && (
              <div className="doctor-description">
                <p>{doctor.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceSection;