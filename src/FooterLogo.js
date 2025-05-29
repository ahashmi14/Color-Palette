import React from "react";
import "./FooterLogo.css";

export default function FooterLogo() {
  return (
    <div className="footer-logo-container">
      <img
        src="/assets/vii-labs-logo.png"
        alt="VII Labs Logo"
        className="footer-logo-image"
      />
      <span className="footer-logo-text">App By VII Labs</span>
    </div>
  );
}
