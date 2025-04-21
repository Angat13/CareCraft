import { useContext, useState, useEffect } from 'react';
import { assets } from '../../../assets/assets';
import '../../Navbar/Navbar.css';
import { Link } from 'react-router-dom';
import { CareStoreContext } from '../../../Context/CareStoreContext';

const CareNavbar = () => {
  const [menu, setMenu] = useState("Home");
  const { getTotalCartAmount } = useContext(CareStoreContext);

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



  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="CareCraft Logo" className="logo" /></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu('Home')} className={menu === "Home" ? "active" : ""}>Home</Link>
        <a href='#care-display' onClick={() => setMenu('CareTakers')} className={menu === "CareTakers" ? "active" : ""}>CareTakers</a>
        <a href='#footer' onClick={() => setMenu('Contact-us')} className={menu === "Contact-us" ? "active" : ""}>Contact us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search Icon" />
        <div className='navbar-search-icon'>
          <Link to='/carecart'><img src={assets.basket_icon} alt="Basket Icon" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
      </div>

    

    </div>
  );
};

export default CareNavbar;
