import { Facebook, Linkedin, Twitter, Mail, Phone } from 'lucide-react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="CareCraft Logo" className="logo" />
          <p>CareCraft: Empowering health and wellness through innovative care solutions.</p>
          <div className="footer-social-icons">
            <a href="https://facebook.com" aria-label="Facebook">
              <Facebook className="icon" />
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn">
              <Linkedin className="icon" />
            </a>
            <a href="https://twitter.com" aria-label="Twitter">
              <Twitter className="icon" />
            </a>
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/delivery">Delivery</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Get in Touch</h2>
          <ul>
            <li>
              <Phone className="contact-icon" />
              <span>+1 (916) 741-4292</span>
            </li>
            <li>
              <Mail className="contact-icon" />
              <span>contact@carecraft.com</span>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        &copy; {new Date().getFullYear()} CareCraft.com - All rights reserved
      </p>
    </footer>
  )
}

export default Footer
