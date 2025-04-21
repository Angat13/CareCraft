import { useContext, useEffect, useState } from 'react';
import '../../../pages/PlaceOrder/PlaceOrder.css';
import { MedStoreContext } from '../../../Context/MedStoreContext';
import { assets } from '../../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const MedPlaceOrder = () => {
  const [payment, setPayment] = useState("cod");
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const { getTotalCartAmount, token, medicineList, cartItems, url, setCartItems, currency, deliveryCharge } = useContext(MedStoreContext);
  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    console.log("Place order triggered"); 

    let orderItems = [];

    if (Array.isArray(medicineList)) {
      medicineList.forEach((item) => {
        if (cartItems[item._id] > 0) {
          let itemInfo = {
            name: item.name,
            price: item.price,
            quantity: cartItems[item._id],
          };
          orderItems.push(itemInfo);
        }
      });
    } else {
      console.error("medicineList is not available or not an array");
      toast.error("There was an issue with the items in the cart.");
      return;
    }

    let orderData = {
      userId: token, 
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + deliveryCharge,
    };

    console.log("Order data:", orderData); 

    try {
      if (payment === "stripe") {
        console.log("Stripe payment selected"); 
        let response = await axios.post(url + "/api/medorder/placemed", orderData, {
          headers: { token },
        });
        console.log("Stripe response:", response.data); 

        if (response.data.success) {
          const { session_url } = response.data;
          console.log("Redirecting to Stripe session URL:", session_url);
          window.location.replace(session_url); 
        } else {
          toast.error("Something went wrong with Stripe");
        }
      } else {
        console.log("COD payment selected"); 
        let response = await axios.post(url + "/api/medorder/placecodmed", orderData, {
          headers: { token },
        });
        console.log("COD response:", response.data); 

        if (response.data.success) {
          toast.success(response.data.message);
          setCartItems({});
          navigate("/myorders"); 
        } else {
          toast.error("Something went wrong with COD");
        }
      }
    } catch (error) {
      console.error("Error placing order:", error); 
      toast.error("Order placement failed.");
    }
  };

  useEffect(() => {
    if (!token) {
      toast.error("To place an order, sign in first");
      navigate('/Medcart');
    } else if (getTotalCartAmount() === 0) {
      navigate('/');
    }
  }, [token, getTotalCartAmount, navigate]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-field">
          <input type="text" name="firstName" onChange={onChangeHandler} value={data.firstName} placeholder="First name" required />
          <input type="text" name="lastName" onChange={onChangeHandler} value={data.lastName} placeholder="Last name" required />
        </div>
        <input type="email" name="email" onChange={onChangeHandler} value={data.email} placeholder="Email address" required />
        <input type="text" name="street" onChange={onChangeHandler} value={data.street} placeholder="Street" required />
        <div className="multi-field">
          <input type="text" name="city" onChange={onChangeHandler} value={data.city} placeholder="City" required />
          <input type="text" name="state" onChange={onChangeHandler} value={data.state} placeholder="State" required />
        </div>
        <div className="multi-field">
          <input type="text" name="zipcode" onChange={onChangeHandler} value={data.zipcode} placeholder="Zip code" required />
          <input type="text" name="country" onChange={onChangeHandler} value={data.country} placeholder="Country" required />
        </div>
        <input type="text" name="phone" onChange={onChangeHandler} value={data.phone} placeholder="Phone" required />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details"><p>Subtotal</p><p>{currency}{getTotalCartAmount()}</p></div>
            <hr />
            <div className="cart-total-details"><p>Delivery Fee</p><p>{currency}{getTotalCartAmount() === 0 ? 0 : deliveryCharge}</p></div>
            <hr />
            <div className="cart-total-details"><b>Total</b><b>{currency}{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + deliveryCharge}</b></div>
          </div>
        </div>
        <div className="payment">
          <h2>Payment Method</h2>
          <div onClick={() => setPayment("cod")} className="payment-option">
            <img src={payment === "cod" ? assets.checked : assets.un_checked} alt="" />
            <p>COD (Cash on delivery)</p>
          </div>
          <div onClick={() => setPayment("stripe")} className="payment-option">
            <img src={payment === "stripe" ? assets.checked : assets.un_checked} alt="" />
            <p>Stripe (Credit / Debit)</p>
          </div>
        </div>
        <button type="submit" className="place-order-submit">Place Order</button>
      </div>
    </form>
  );
};

export default MedPlaceOrder;
