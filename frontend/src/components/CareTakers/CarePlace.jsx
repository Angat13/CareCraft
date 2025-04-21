import { useContext, useEffect, useState } from 'react';
import '../../pages/PlaceOrder/PlaceOrder.css';
import { CareStoreContext } from '../../Context/CareStoreContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';
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

  const { getTotalCartAmount, token,careTakerList, cartItems, url, setCartItems, currency, deliveryCharge } = useContext(CareStoreContext);
  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    console.log("Place order triggered"); // Debug log

    let orderItems = [];
    careTakerList.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = {
          name: item.name,
          price: item.price,
          quantity: cartItems[item._id],
        };
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      userId: token, // Assuming token is the user ID
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + deliveryCharge,
    };

    console.log("Order data:", orderData); // Debug log

    try {
      if (payment === "stripe") {
        console.log("Stripe payment selected"); // Debug log
        let response = await axios.post(url + "/api/careorder/placecare", orderData, {
          headers: { token },
        });
        console.log("Stripe response:", response.data); // Debug log

        if (response.data.success) {
          const { session_url } = response.data;
          console.log("Redirecting to Stripe session URL:", session_url); // Debug log
          window.location.replace(session_url); // Redirect to Stripe's payment page
        } else {
          toast.error("Something went wrong with Stripe");
        }
      } else {
        console.log("COD payment selected"); // Debug log
        let response = await axios.post(url + "/api/careorder/placecodcare", orderData, {
          headers: { token },
        });
        console.log("COD response:", response.data); // Debug log

        if (response.data.success) {
          toast.success(response.data.message);
          setCartItems({});
          navigate("/myorders"); // Navigate to the orders page
        } else {
          toast.error("Something went wrong with COD");
        }
      }
    } catch (error) {
      console.error("Error placing order:", error); // Debug log
      toast.error("Order placement failed.");
    }
  };

  useEffect(() => {
    if (!token) {
      toast.error("To place an order, sign in first");
      navigate('/Carecart');
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
        <button className="place-order-submit" type="submit">{payment === "cod" ? "Place Order" : "Proceed To Payment"}</button>
      </div>
    </form>
  );
};

export default MedPlaceOrder;
