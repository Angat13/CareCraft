import { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import AppDownload from '../../components/AppDownload/AppDownload';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import LoginPopup from '../../components/LoginPopup/LoginPopup';

const Home = () => {
  const [category, setCategory] = useState("All");
  const [showLogin, setShowLogin] = useState(false); // Default to false

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      setShowLogin(true); // Show login popup only if no token is found
    }
  }, []); 

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <Navbar setShowLogin={setShowLogin} />
      <Header />
      <ExploreMenu setCategory={setCategory} category={category} />
      <FoodDisplay category={category} />
      <AppDownload />
      <Footer />
    </>
  );
};

export default Home;
