import './MainFooter.css'
import { assets } from '../../../assets/assets'

const MainFooter = () => {
  return (
    <div className='footer' id ='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>niwsanzionsoinwoidnowixo coiieixiobxiob</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon}alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                    <img src={assets.twitter_icon}alt="" />
                </div>
                </div>
                <div className="footer-content-center">
                          <h2>COMPANY</h2>
                          <ul>
                            <li>Home</li>
                            <li>About us</li>
                            <li>Delivery</li>
                            <li>Privacy Policy</li>
                          </ul>
                </div>

                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>9167414292</li>
                        <li>contact@angatw123@gmail.com</li>
                    </ul>    
            </div>
        </div>
        <hr />
        <p className='footer-copyright'>Copyright 2024 @CareCraft.com-All rights reserved</p>
    </div>
  )
}

export default MainFooter