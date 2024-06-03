import React from 'react';
import './FooterComp.css'; 


const FooterComp = () => {
  return (
    <footer className="footer poetsen-font">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} eMoney. All rights reserved.</p>
        <nav className="footer-nav">
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-service">Terms of Service</a>
        </nav>
      </div>
    </footer>
  );
};

export default FooterComp;
