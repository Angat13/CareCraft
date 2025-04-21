import { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Checkbox from './CheckBox'; // Import your custom Checkbox

const LoginPopup = ({ setShowLogin }) => {
  const { setToken, url, loadCartData } = useContext(StoreContext);
  const [isChecked, setIsChecked] = useState(false); // Checkbox state

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();

    if (!isChecked) {
      toast.error("You must agree to the terms and conditions.");
      return;
    }

    const new_url = url + "/api/user/login";
    const response = await axios.post(new_url, data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      loadCartData({ token: response.data.token });
      setShowLogin(false);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>Login</h2> 
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          <input 
            name="email" 
            onChange={onChangeHandler} 
            value={data.email} 
            type="email" 
            placeholder="Your email" 
            required
          />
          <input 
            name="password" 
            onChange={onChangeHandler} 
            value={data.password} 
            type="password" 
            placeholder="Password" 
            required 
          />
        </div>
        
        {/* Replace Default Checkbox with Custom Checkbox */}
        <div className="login-popup-condition">
          <Checkbox checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
        </div>

        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginPopup;
