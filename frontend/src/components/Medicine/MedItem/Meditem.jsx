import { useContext, useEffect, useState } from "react";
import { MedStoreContext } from "../../../Context/MedStoreContext";
import "./MedItem.css";
import { assets } from "../../../assets/assets";

const Meditem = ({ medicine }) => {
  const { addToCart, removeFromCart, cartItems, url } = useContext(MedStoreContext);
  const [itemQuantity, setItemQuantity] = useState(0);

  useEffect(() => {
    if (medicine && cartItems) {
      setItemQuantity(cartItems[medicine._id] || 0);
    }
  }, [cartItems, medicine]);

  if (!medicine) {
    return null;
  }

  const handleAdd = () => {
    addToCart(medicine._id);
  };

  const handleRemove = () => {
    if (itemQuantity > 0) {
      removeFromCart(medicine._id);
    }
  };

  return (
    <div className="med-item">
      <div className="med-item-img-container">
        <img
          src={`${url}/images1/${medicine.image}`}
          alt={medicine.name || "Medicine"}
          className="med-item-image"
        />
        <div className="med-item-counter">
          {itemQuantity > 0 && (
            <>
              <img
                src={assets.remove_icon_red}
                alt="Remove"
                className="remove-btn"
                onClick={handleRemove}
              />
              <span>{itemQuantity}</span>
            </>
          )}
          <img
            src={assets.add_icon_green}
            alt="Add"
            className="add-btn"
            onClick={handleAdd}
          />
        </div>
      </div>
      <div className="med-item-info">
        <div className="med-item-name-price">
          <p>{medicine.name || "Unknown Name"}</p>
          <p className="med-item-price">₹{medicine.price || "0.00"}</p>
        </div>
        <p className="med-item-desc">{medicine.description || "No description available."}</p>
      </div>
    </div>
  );
};

export default Meditem;