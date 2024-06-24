import React from 'react';
import './FooterComp.css'; 


const FooterComp = () => {
  return (
    <footer className="footer poetsen-font">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} eMoney. All rights reserved.</p>
        <nav className="footer-nav">
          <a href="/about">About</a>
          <a href="/about">Contact</a>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-service">Terms of Service</a>
        </nav>
      </div>
    </footer>
  );
};

export default FooterComp;
