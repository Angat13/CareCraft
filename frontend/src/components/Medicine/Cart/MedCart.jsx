import { useContext } from 'react';
import '../../../pages/Cart/Cart.css';
import { MedStoreContext } from '../../../Context/MedStoreContext';
import { useNavigate } from 'react-router-dom';

const MedCart = () => {
  const { cartItems, medicineList, removeFromCart, getTotalCartAmount, url } = useContext(MedStoreContext);
  const navigate = useNavigate();

  // Check if medicineList is available and not empty
  if (!medicineList || medicineList.length === 0) {
    return <div>Loading medicines...</div>;
  }

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {medicineList.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={url + "/images1/" + item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>Rs{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>Rs{item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>Rs{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>{getTotalCartAmount() === 0 ? 0 : 50}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>Rs{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 50}</p>
            </div>
          </div>
          <button onClick={() => navigate('/Med-place-order')}>Proceed to Checkout</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>Enter Promo Code Here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Promo Code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default MedCart;
