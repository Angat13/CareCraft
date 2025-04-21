import { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loader from '../TruckLoader/TruckLoader'; // Import Loader
import PayButton from '../../components/PayButton/PayButton';

const PlaceOrder = () => {
    const [payment, setPayment] = useState("cod");
    const [loading, setLoading] = useState(false);
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

    const { getTotalCartAmount, token, food_list, cartItems, url, setCartItems, currency, deliveryCharge } = useContext(StoreContext);
    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const placeOrder = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Check if any field is empty
        for (let key in data) {
            if (!data[key].trim()) {
                toast.error(`Please fill in the ${key.replace(/([A-Z])/g, ' $1').trim()} field.`);
                setLoading(false);
                return;
            }
        }

        let orderItems = [];
        food_list.forEach((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = { ...item, quantity: cartItems[item._id] };
                orderItems.push(itemInfo);
            }
        });

        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + deliveryCharge,
        };

        try {
            if (payment === "stripe") {
                let response = await axios.post(`${url}/api/order/place`, orderData, { headers: { token } });
                if (response.data.success) {
                    window.location.replace(response.data.session_url);
                } else {
                    throw new Error("Payment Failed");
                }
            } else {
                let response = await axios.post(`${url}/api/order/placecod`, orderData, { headers: { token } });
                if (response.data.success) {
                    toast.success(response.data.message);
                    setCartItems({});
                    setTimeout(() => {
                        navigate("/myorders");
                        setLoading(false);
                    }, 2000);
                } else {
                    throw new Error("Order Failed");
                }
            }
        } catch (error) {
            toast.error("Something Went Wrong");
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!token) {
            toast.error("To place an order, sign in first");
            navigate('/cart');
        } else if (getTotalCartAmount() === 0) {
            navigate('/cart');
        }
    }, [token]);

    return (
        <>
            {loading ? <Loader /> : (
                <form onSubmit={placeOrder} className='place-order'>
                    <div className="place-order-left">
                        <p className='title'>Delivery Information</p>
                        <div className="multi-field">
                            <input type="text" name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First name' required />
                            <input type="text" name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Last name' required />
                        </div>
                        <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Email address' required />
                        <input type="text" name='street' onChange={onChangeHandler} value={data.street} placeholder='Street' required />
                        <div className="multi-field">
                            <input type="text" name='city' onChange={onChangeHandler} value={data.city} placeholder='City' required />
                            <input type="text" name='state' onChange={onChangeHandler} value={data.state} placeholder='State' required />
                        </div>
                        <div className="multi-field">
                            <input type="text" name='zipcode' onChange={onChangeHandler} value={data.zipcode} placeholder='Zip code' required />
                            <input type="text" name='country' onChange={onChangeHandler} value={data.country} placeholder='Country' required />
                        </div>
                        <input type="text" name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Phone' required />
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
                                <p>COD (Cash on Delivery)</p>
                            </div>
                            <div onClick={() => setPayment("stripe")} className="payment-option">
                                <img src={payment === "stripe" ? assets.checked : assets.un_checked} alt="" />
                                <p>Stripe (Credit / Debit Card)</p>
                            </div>
                        </div>
                        <PayButton onClick={placeOrder} disabled={loading}>
                            {loading ? "Processing..." : (payment === "cod" ? "Place Order" : "Proceed To Payment")}
                        </PayButton>
                    </div>
                </form>
            )}
        </>
    );
};

export default PlaceOrder;
