import { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MainNavbar.css";
import { StoreContext } from "../../../Context/StoreContext";
import { assets } from "../../../assets/assets";

const MainNavbar = () => {
  const { token, setToken } = useContext(StoreContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, [setToken]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setIsDropdownOpen(false);
  };

  return (
    <nav className="navbar1">
      <h1 className="navbar-title">CareCraft</h1>
      <ul className="navbar-links">
        <li>
          <Link to="/homemade-food">Homemade Food</Link>
        </li>
        <li>
          <Link to="/medicine">Medicine</Link>
        </li>
        <li>
          <Link to="/caretakers">CareTaker</Link>
        </li>

        {token && (
          <div className="navbar-profile" ref={dropdownRef}>
            <img
              src={assets.profile_icon || "/placeholder.svg"}
              alt="Profile"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />
            <ul className={`navbar-profile-dropdown ${isDropdownOpen ? "active" : ""}`}>
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon || "/placeholder.svg"} alt="Orders" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={handleLogout}>
                <img src={assets.logout_icon || "/placeholder.svg"} alt="Logout" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default MainNavbar;
