import React from "react";
import BookingLogo from "../../images/logo.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={`/`} className="logo-link">
      <img className="logo-light logo-img" src={BookingLogo} alt="logo" />
      <img className="logo-light logo-img" src={BookingLogo} alt="logo" />
    </Link>
  );
};

export default Logo;
