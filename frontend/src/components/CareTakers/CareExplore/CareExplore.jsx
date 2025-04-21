import  { useCallback } from "react";
import { Care_list } from "../../../assets/assets";
import "./CareExplore.css";

const CareExplore = ({ category, setCategory }) => {
  const handleCategoryClick = useCallback(
    (item) => {
      setCategory((prev) => (prev === item.care_name ? "All" : item.care_name));
    },
    [setCategory]
  );

  return (
    <div className="Explore-care" id="explore-care">
      <p className="explore-care-text">Choose the best CareTakers near you</p>
      <div className="explore-care-list">
        {Care_list.map((item, index) => (
          <div
            onClick={() => handleCategoryClick(item)}
            key={item.care_name}
            className={`explore-care-list-item ${
              category === item.care_name ? "active" : ""
            }`}
          >
            <img
              src={item.care_image}
              alt={item.care_name}
            />
            <p>{item.care_name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default CareExplore;