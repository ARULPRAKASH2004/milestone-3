import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const socialMediaLinks = [
  {
    name: 'Facebook',
    icon: 'fab fa-facebook',
    url: 'https://www.facebook.com',
  },
  {
    name: 'Twitter',
    icon: 'fab fa-twitter',
    url: 'https://www.twitter.com',
  },
  {
    name: 'Instagram',
    icon: 'fab fa-instagram',
    url: 'https://www.instagram.com',
  },
  {
    name: 'LinkedIn',
    icon: 'fab fa-linkedin',
    url: 'https://www.linkedin.com',
  },
];

const FooterColumn = ({ heading, children }) => (
  <div className="footer-column">
    <h2 className="footer-heading">{heading}</h2>
    {children}
  </div>
);

const SocialMediaLinks = () => (
  <div className="social-icons">
    {socialMediaLinks.map((link, index) => (
      <a
        key={index}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="social-item"
      >
        <i className={link.icon} />
        <span>{link.name}</span>
      </a>
    ))}
  </div>
);

const FooterBottom = () => (
  <div className="footer-bottom">
    <p className="moto">Wheelwise - "Your Destination for Smart Car Rentals"</p>
    <p className="copyright">&copy; 2024 Wheelwise. All Rights Reserved.</p>
  </div>
);

const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <FooterColumn heading="Quick Links">
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          
          <li>
            <Link to="/about-us">AboutUs</Link>
          </li>
          <li>
            <Link to="/faq">FAQ</Link>
          </li>
        </ul>
      </FooterColumn>

      <FooterColumn heading="Legal">
        <ul>
          <li>
            <Link to="/tos">Terms of Service</Link>
          </li>
          <li>
            <Link to="/privacy">Privacy Policy</Link>
          </li>
          <li>
            <Link to="/refund-poilcy">Refund Policy</Link>
          </li>
        </ul>
      </FooterColumn>

      <FooterColumn heading="Contact Us">
        <ul>
          <li>
            <i className="fas fa-phone" />
            Phone: (123) 456-7890
          </li>
          <li>
            <i className="fas fa-phone-square-alt" />
            Landline: +1 (987) 654-3210
          </li>
          <li>
            <i className="fas fa-envelope" />
           
            <a href="mailto:support@wheelwise.com" className="contact-link">support@wheelwise.com</a>
          </li>

          
        </ul>
      </FooterColumn>

      <FooterColumn heading="Follow Us">
        <SocialMediaLinks />
      </FooterColumn>
    </div>

    <FooterBottom />
  </footer>
);

export default Footer;
