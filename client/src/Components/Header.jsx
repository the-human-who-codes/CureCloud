import { useState } from "react";
import "./styles/Header.css";

function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className="header">
      <div className="logo">CureCloud</div>
      <button className="hamburger" onClick={toggleNav}>
        ☰
      </button>
      <nav className={`nav ${isNavOpen ? "open" : ""}`}>
        <a href="#home" onClick={toggleNav}>
          Home
        </a>
        <a href="#features" onClick={toggleNav}>
          Features
        </a>
        <a href="#specialists" onClick={toggleNav}>
          Specialists
        </a>
        <a href="#contact" onClick={toggleNav}>
          Contact
        </a>
        <button className="cta-button">Get Started</button>
      </nav>
    </header>
  );
}

export default Header;
