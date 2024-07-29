import React from 'react';
import { NavLink } from 'react-router-dom';
import { ModeToggle } from '../mode-toggle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignInAlt, faUserPlus, faTruck } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const NavLinks = [
    {
      title: "Home",
      path: "/",
      icon: faHome  // Home icon
    },
    {
      title: "Login",
      path: "/login",
      icon: faSignInAlt  // Login icon
    },
    {
      title: "Register",
      path: "/register",
      icon: faUserPlus  // Register icon
    }
  ];

  return (
    <div className="w-full h-[8vh] flex flex-row justify-center items-center absolute top-1 shadow-sm shadow-primary/50">
      <div className="w-1/4 h-full flex items-center justify-start text-lg text-primary font-bold">
        <FontAwesomeIcon icon={faTruck} className="mr-2" /> INV_TOBY
      </div>
      <div className="w-2/4 h-full flex flex-row justify-end items-center gap-8 font-bold">
        {NavLinks.map((link, index) => (
          <li key={index} className="list-none">
            <NavLink to={link.path} className="flex items-center gap-2 text-primary hover:text-secondary">
              {link.icon && <FontAwesomeIcon icon={link.icon} />}
              {link.title}
            </NavLink>
          </li>
        ))}
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
