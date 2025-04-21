import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const MedStoreContext = createContext(null);

const MedStoreContextProvider = (props) => {
  const url = "http://localhost:4000"; // Base URL for API
  const [medicineList, setMedicineList] = useState([]); // Medicines list
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const currency = "₹";
  const deliveryCharge = 50;

  // Fetch medicines
  const fetchMedicineList = async () => {
    try {
      const response = await axios.get(`${url}/api/medicine/listmed`);
      console.log("Fetched Medicines:", response.data); // Debug log
      if (response.data.success && Array.isArray(response.data.data)) {
        setMedicineList(response.data.data);
      } else {
        console.error("Invalid data structure:", response.data);
      }
    } catch (error) {
      console.error("Error fetching medicines:", error.message);
    }
  };

  // Load cart data
  const loadCartData = async () => {
    if (!token) return;
    try {
      const response = await axios.get(`${url}/api/cart`, { headers: { token } });
      if (response.data.success) {
        setCartItems(response.data.cartItems || {});
      }
    } catch (error) {
      console.error("Error loading cart data:", error.message);
    }
  };

  // Add item to cart
  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
    if (token) {
      try {
        await axios.post(
          `${url}/api/medcart/addmed`,
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error adding to cart:", error.message);
      }
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId] -= 1;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
    if (token) {
      try {
        await axios.post(
          `${url}/api/medcart/removemed`,
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error removing from cart:", error.message);
      }
    }
  };

  // Calculate total cart amount
  const getTotalCartAmount = () => {
    return Object.keys(cartItems).reduce((total, itemId) => {
      const item = medicineList.find((med) => med._id === itemId);
      return total + (item ? item.price * cartItems[itemId] : 0);
    }, 0);
  };

  useEffect(() => {
    const initialize = async () => {
      await fetchMedicineList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData();
      }
    };
    initialize();
  }, []);

  const contextValue = {
    url,
    medicineList,
    cartItems,
    addToCart,
    setCartItems,
    token,
    removeFromCart,
    getTotalCartAmount,
    currency,
    deliveryCharge,
  };

  return (
    <MedStoreContext.Provider value={contextValue}>
      {props.children}
    </MedStoreContext.Provider>
  );
};

export default MedStoreContextProvider;
