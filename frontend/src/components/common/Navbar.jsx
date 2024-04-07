import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

// import logo from "../../assets/Logo/heartwiseconnection.png";
import { NavbarLinks } from "../../data/navbar-links";
// eslint-disable-next-line no-unused-vars
import { ACCOUNT_TYPE } from "../../utils/constants";
import ProfileDropdown from "../core/Auth/ProfileDropDown";

const logo = "https://i.ibb.co/txjwyQy/Whats-App-Image-2024-04-06-at-00-07-24-636605ad-removebg-preview-1.png";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const location = useLocation();

  const matchRoute = (route) => {
    return location.pathname === route;
  };

  return (
    <div
      className={`flex h-[110px] items-center justify-center border-b-[1px] border-b-richblack-700 ${location.pathname !== "/" ? "bg-richblack-800" : ""
        } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-content h-[100px] items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img
            src={logo}
            alt="Logo"
            className="h-auto w-[190px]"
            loading="lazy"
            style={{ height: '200px' }}
          />
        </Link>
        {/* Navigation links */}
        <nav className="hidden md:block  ">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                <Link to={link.path}>
                  <p
                    className={`${matchRoute(link.path) ? "text-yellow-25" : "text-richblack-25"
                      }`}
                  >
                    {link.title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>

          {/* to contain ui of ai models */}

        </nav>
        {/* Login / Signup / Dashboard */}
        <div className="hidden items-center gap-x-4 md:flex">
          {token === null && (
            <>
              <Link to="/login">
                <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                  Sign up
                </button>
              </Link>

            </>
          )}
          {token !== null && (
            <ProfileDropdown accountType={user.accountType} />
          )}
        </div>
        <button className="mr-4 md:hidden">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
