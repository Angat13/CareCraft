import { useContext, useEffect, useState } from "react";
import { CareStoreContext } from "../../../Context/CareStoreContext";
import "./CareItem.css";
import { assets } from "../../../assets/assets";

const Careitem = ({ careTaker }) => {
  const { addToCart, removeFromCart, cartItems, url } = useContext(CareStoreContext);
  const [itemQuantity, setItemQuantity] = useState(0);

  useEffect(() => {
    if (careTaker) {
      setItemQuantity(cartItems[careTaker._id] || 0);
    }
  }, [cartItems, careTaker]);

  if (!careTaker) {
    return <div></div>;
  }

  const handleAdd = () => {
    addToCart(careTaker._id);
  };

  const handleRemove = () => {
    removeFromCart(careTaker._id);
  };

  return (
    <div className="care-item">
      <div className="care-item-img-container">
        <img
          src={`${url}/imagess/${careTaker.image}`}
          alt={careTaker.name}
          className="care-item-image"
        />
        <div className="care-item-counter">
          {itemQuantity > 0 && (
            <img
              src={assets.remove_icon_red}
              alt="Remove"
              className="remove-btn"
              onClick={handleRemove}
            />
          )}
          {itemQuantity > 0 && <span>{itemQuantity}</span>}
          <img
            src={assets.add_icon_green}
            alt="Add"
            className="add-btn"
            onClick={handleAdd}
          />
        </div>
      </div>
      <div className="care-item-info">
        <div className="care-item-name-price">
          <p>{careTaker.name}</p>
          <p className="care-item-price">₹{careTaker.price}</p>
        </div>
        <p className="care-item-desc">{careTaker.description}</p>
      </div>
    </div>
  );
};

export default Careitem;
