import { useContext } from 'react';
import '../../pages/Cart/Cart.css';
import { CareStoreContext } from '../../Context/CareStoreContext';
import { useNavigate } from 'react-router-dom';

const CareCart = () => {
  const { cartItems, careTakerList, removeFromCart, getTotalCartAmount, url } = useContext(CareStoreContext);
  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Image</p>
          <p>Name</p>
          <p>Price</p>
          <p>No of Hours</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {careTakerList && careTakerList.length > 0 ? (
          careTakerList.map((item) => {
            if (cartItems[item._id] > 0) {
              return (
                <div key={item._id}>
                  <div className="cart-items-title cart-items-item">
                    <img src={`${url}/imagess/${item.image}`} alt="" />
                    <p>{item.name}</p>
                    <p>Rs {item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>Rs {item.price * cartItems[item._id]}</p>
                    <p onClick={() => removeFromCart(item._id)} className="cross">x</p>
                  </div>
                  <hr />
                </div>
              );
            }
            return null;
          })
        ) : (
          <p>No caretakers available.</p> // Fallback message
        )}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>Rs {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Transportation Charges</p>
              <p>{getTotalCartAmount() === 0 ? 0 : 40}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>Rs {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 40}</p>
            </div>
          </div>
          <button onClick={() => navigate('/Care-place-order')}>Proceed to Checkout</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>Enter Promo code here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareCart;
