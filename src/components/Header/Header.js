import React from 'react';
import './Header.css';
import { Link } from "react-router-dom";


function Header() {
  return (
    <div className="header">
        <Link to="/"><img className="header__logo" src="/assets/logo.png" alt="logo" /></Link>
    </div>
  );
}

export default Header;
