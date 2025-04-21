import { useContext, useState, useEffect } from 'react';
import { assets } from '../../assets/assets';
import '../Navbar/Navbar.css';
import { Link } from 'react-router-dom';
import { MedStoreContext } from '../../Context/MedStoreContext';

const MedNavbar = () => {
  const [menu, setMenu] = useState("Home");
  const { getTotalCartAmount, token } = useContext(MedStoreContext);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    (function () {
      if (!window.chatbase || window.chatbase("getState") !== "initialized") {
        window.chatbase = (...args) => {
          if (!window.chatbase.q) {
            window.chatbase.q = [];
          }
          window.chatbase.q.push(args);
        };
        window.chatbase = new Proxy(window.chatbase, {
          get(target, prop) {
            if (prop === "q") return target.q;
            return (...args) => target(prop, ...args);
          },
        });
      }

      const onLoad = function () {
        const script = document.createElement("script");
        script.src = "https://www.chatbase.co/embed.min.js";
        script.id = "yZGiEvVe2RAAOCAO5sUar";
        script.domain = "www.chatbase.co";
        document.body.appendChild(script);
      };

      if (document.readyState === "complete") {
        onLoad();
      } else {
        window.addEventListener("load", onLoad);
      }
    })();
  }, []);

  // Function to open Chatbase Chatbot


  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="CareCraft Logo" className="logo" /></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu('Home')} className={menu === "Home" ? "active" : ""}>Home</Link>
        <a href='#med-display' onClick={() => setMenu('Medicine')} className={menu === "Medicine" ? "active" : ""}>Medicine</a>
        <a href='#footer' onClick={() => setMenu('Contact-us')} className={menu === "Contact-us" ? "active" : ""}>Contact us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search Icon" />
        <Link to='/MedCart' className='navbar-search-icon'>
          <img src={assets.basket_icon} alt="Basket Icon" />
          <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
       </Link>
       {!token ? (
         <button onClick={() => setShowLogin(true)}>Sign In</button>
       ) : (
         <div className='navbar-profile'>
           <img src={assets.profile_icon} alt="Profile Icon" />
         </div>
       )}
      </div>

      
    </div>
  );
};

export default MedNavbar;
