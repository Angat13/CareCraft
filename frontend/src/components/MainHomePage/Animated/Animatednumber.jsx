import  { useEffect } from "react";
import "./AnimatedNumber.css"

const Stats = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counters = entry.target.querySelectorAll('.number');
          counters.forEach(counter => {
            const updateCounter = () => {
              const target = +counter.getAttribute('data-target');
              const count = +counter.innerText;
              const increment = target / 200;

              if (count < target) {
                counter.innerText = `${Math.ceil(count + increment)}`;
                setTimeout(updateCounter, 10);
              } else {
                counter.innerText = target.toString();
              }
            };

            updateCounter();
          });
        }
      });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => {
      if (statsSection) {
        observer.unobserve(statsSection);
      }
    };
  }, []);

  return (
    <section className="stats">
      <div className="stat-item">
        <h3 className="number" data-target="100000">0</h3>
        <p>Happy Patients</p>
      </div>
      <div className="stat-item">
        <h3 className="number" data-target="5000">0</h3>
        <p>Hospitals Reached</p>
      </div>
      <div className="stat-item">
        <h3 className="number" data-target="30000">0</h3>
        <p>Staff Members</p>
      </div>
    </section>
  );
};

export default Stats;
