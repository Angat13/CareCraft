import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyOrders.css";
import axios from "axios";
import { StoreContext } from "../../Context/StoreContext";
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const [data, setData] = useState([]); // Default as empty array
  const { url, token, currency } = useContext(StoreContext);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      console.log("Fetching orders...");
      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      console.log("Response:", response.data); // Debug API response

      setData(response.data.data || []); // Ensure array
    } catch (error) {
      console.error("Error fetching orders:", error.response?.data || error.message);
      setData([]); // Fallback to empty array on error
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data?.length > 0 ? (
          data.map((order, index) => (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="" />
              <p>
                {order.items?.map((item, index) =>
                  index === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `
                )}
              </p>
              <p>
                {currency}
                {order.amount}.00
              </p>
              <p>Items: {order.items?.length || 0}</p>
              <p>
                <span>&#x25cf;</span> <b>{order.status}</b>
              </p>
              <button onClick={() => navigate(`/track-order/${order._id}`)}>Track Order</button>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
