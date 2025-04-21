import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/add" className="sidebar-option">
          <img src={assets.add_icon} alt="Add Icon" />
          <p>Add Items</p>
        </NavLink>

        <NavLink to="/list" className="sidebar-option">
          <img src={assets.order_icon} alt="List Icon" />
          <p>List Items</p>
        </NavLink>

        <NavLink to="/orders" className="sidebar-option">
          <img src={assets.order_icon} alt="Orders Icon" />
          <p>Orders</p>
        </NavLink>
        <NavLink to="/add-med" className="sidebar-option">
          <img src={assets.add_icon} alt="Add Icon" />
          <p>Add Medicines</p>
        </NavLink>
        <NavLink to="/list-med" className="sidebar-option">
          <img src={assets.order_icon} alt="List Icon" />
          <p>List Medicines</p>
          </NavLink>
          <NavLink to="/add-care" className="sidebar-option">
          <img src={assets.add_icon} alt="Add Icon" />
          <p>Add CareTakers</p>
        </NavLink>
        <NavLink to="/list-care" className="sidebar-option">
          <img src={assets.order_icon} alt="List Icon" />
          <p>List CareTakers</p>
          </NavLink>
          <NavLink to="/admin-user" className="sidebar-option">
          <img src={assets.order_icon} alt="List icon" />
          <p>Users</p>
          </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
