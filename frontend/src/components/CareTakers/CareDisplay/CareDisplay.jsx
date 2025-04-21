import { useContext, useState, useEffect } from "react";
import { CareStoreContext } from "../../../Context/CareStoreContext";
import Careitem from "../CareItem/CareItem";
import CareExplore from "../CareExplore/CareExplore"; // Import the Explore menu for filtering
import "./CareDisplay.css";

const CareDisplay = () => {
  const { careTakerList, fetchCareTakerList } = useContext(CareStoreContext);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetchCareTakerList();
  }, [fetchCareTakerList]);

  const filteredCareList = careTakerList.filter((careTaker) =>
    category === "All" ? true : careTaker.category === category
  );

  return (
    <div className="care-display" id="care-display">
      <CareExplore category={category} setCategory={setCategory} />

      <div className="care-item-container" id="care-item-container">
        {filteredCareList.length > 0 ? (
          filteredCareList.map((careTaker) =>
            careTaker && careTaker._id ? (
              <Careitem key={careTaker._id} careTaker={careTaker} />
            ) : (
              <p key={Math.random()}>Invalid caretaker data</p>
            )
          )
        ) : (
          <p>No caretakers available for the selected category</p>
        )}
      </div>
    </div>
  );
};

export default CareDisplay;