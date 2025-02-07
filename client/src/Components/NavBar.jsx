import "./NavBar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">CureCloud</h1>
      <ul className="nav-links">
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#features">Features</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
