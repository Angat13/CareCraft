import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const CareStoreContext = createContext(null);

const CareStoreContextProvider = (props) => {
  const url = "http://localhost:4000";
  const [careTakerList, setCareTakerList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const currency = "₹";
  const deliveryCharge = 50;

  // Add caretaker to cart (now integrated with backend)
  const addToCart = async (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      updatedCart[itemId] = (updatedCart[itemId] || 0) + 1;
      return updatedCart;
    });

    if (token) {
      try {
        await axios.post(url + "/api/carecart/addcare", { itemId }, { headers: { token } });
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }
  };

  // Remove caretaker from cart (now integrated with backend)
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId] > 0) updatedCart[itemId] -= 1;
      return updatedCart;
    });

    if (token) {
      try {
        await axios.post(url + "/api/carecart/removecare", { itemId }, { headers: { token } });
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    }
  };

  // Get total cart amount
  const getTotalCartAmount = () => {
    return Object.keys(cartItems).reduce((totalAmount, item) => {
      const itemInfo = careTakerList.find((product) => product._id === item);
      if (itemInfo && cartItems[item] > 0) {
        totalAmount += itemInfo.price * cartItems[item];
      }
      return totalAmount;
    }, 0);
  };

  // Fetch caretakers list
  const fetchCareTakerList = async () => {
    try {
      const response = await axios.get(url + "/api/care/listcare");
      setCareTakerList(response.data.data);
    } catch (error) {
      console.error("Error fetching caretakers:", error);
    }
  };

  // Load cart data from backend
  const loadCartData = async (token) => {
    if (!token) return;
    try {
      const response = await axios.post(url + "/api/carecart/getcare", {}, { headers: { token } });
      setCartItems(response.data.cartData || {});  // Fallback to empty object if no cartData
    } catch (error) {
      console.error("Error loading cart data:", error);
    }
  };

  // Fetch data when token is set or changes
  useEffect(() => {
    fetchCareTakerList(); // Fetch caretakers regardless of token
    if (token) {
      loadCartData(token);  // Only load cart data if token is available
    }
  }, [token]);  // Runs when token changes

  const contextValue = {
    url,
    careTakerList,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    fetchCareTakerList,
    setToken,
    loadCartData,
    setCartItems,
    currency,
    deliveryCharge,
  };

  return (
    <CareStoreContext.Provider value={contextValue}>
      {props.children}
    </CareStoreContext.Provider>
  );
};

export default CareStoreContextProvider;


