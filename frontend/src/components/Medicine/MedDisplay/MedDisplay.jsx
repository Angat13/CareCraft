import { useContext } from "react";
import { MedStoreContext } from "../../../Context/MedStoreContext";
import Meditem from "../MedItem/Meditem";
import "./MedDisplay.css";

const MedDisplay = () => {
  const { medicineList } = useContext(MedStoreContext);

  return (
    <div className="med-display" id="med-display">
      {Array.isArray(medicineList) && medicineList.length > 0 ? (
        medicineList.map((medicine) =>
          medicine && medicine._id ? (
            <Meditem key={medicine._id} medicine={medicine} />
          ) : (
            <div key={Math.random()} className="med-item-error">
              Invalid medicine data
            </div>
          )
        )
      ) : (
        <p>No medicines available</p>
      )}
    </div>
  );
};

export default MedDisplay;
