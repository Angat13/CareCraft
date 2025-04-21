import  { useState } from 'react'
import Home from './pages/Home/Home'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart/Cart'
import LoginPopup from './components/LoginPopup/LoginPopup'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import MyOrders from './pages/MyOrders/MyOrders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify/Verify'
import MainHome from './components/MainHomePage/MainHome'
import MedPlaceOrder from './components/Medicine/PlaceHolder/MedPlaceHolder'
import MedRender from './components/Medicine/MedRender'
import MedCart from './components/Medicine/Cart/MedCart'
import CareRender from './components/CareTakers/CareRender/CareRender'
import CareCart from './components/CareTakers/CareCart'
import TrackOrder from './pages/TrackOrder/TrackOrder'
import CarePlaceorder from './components/CareTakers/CarePlace'
import NotFound from '../src/pages/404/404'

const App = () => {

  const [showLogin,setShowLogin] = useState(false);

  return (
    <>
    <ToastContainer/>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className='app'>
        {/* <Navbar setShowLogin={setShowLogin}/> */}
        <Routes>
          <Route path='/' element={<MainHome/>}/>
          <Route path='/homemade-food' element={<Home />} />
          <Route path='/medicine' element={<MedRender />} />
          <Route path='/cart' element={<Cart />}/>
          <Route path='/order' element={<PlaceOrder />}/>
          <Route path='/MedCart' element={<MedCart />}/>
          <Route path='/Med-place-order' element={<MedPlaceOrder />}/>
          <Route path='/myorders' element={<MyOrders />}/>
          <Route path='/verify' element={<Verify />}/>
          <Route path='/caretakers' element={<CareRender />}/>
          <Route path = "/carecart" element={<CareCart/>}/>
          <Route path = "Care-place-order" element={<CarePlaceorder/>}/>
          <Route path="/track-order/:orderId" element={<TrackOrder />}/>
          <Route path="*" element={< NotFound/>} />
        </Routes>
      </div>
      
    </>
  )
}

export default App

