import React, { useRef, useEffect } from "react";
import { Container } from "reactstrap";
import Link from "next/link";

import { useAuthContext } from "../../hooks/useAuthContext"
import { Logout } from "../Logout";

const NAV__LINKS = [
  {
    display: "Home",
    url: "/",
  },
  {
    display: "Market",
    url: "/market",
  },
  {
    display: "Create",
    url: "/create",
  },
  {
    display: "Contact",
    url: "/contact",
  },
];

const Header = () => {

  const { session, signIn, isLoading } = useAuthContext()

  const onConnectWallet = () => {
    signIn();
  };

  const headerRef = useRef(null);

  const menuRef = useRef(null);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("header__shrink");
      } else {
        headerRef.current.classList.remove("header__shrink");
      }
    });

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle("active__menu");
  const signInHandler = () => {
  }
  const connectWalletHandler = () => {
  }
  return (
    <header className="header" ref={headerRef}>
      <Container>
        <div className="navigation">
          <div className="logo">
            <h2 className=" d-flex gap-2 align-items-center ">
              <span>
                <i class="ri-fire-fill"></i>
              </span>
              NFTs
            </h2>
          </div>

          <div className="nav__menu" ref={menuRef} onClick={toggleMenu}>
            <ul className="nav__list">
              {NAV__LINKS.map((item, index) => (
                <li className="nav__item" key={index}>
                  <Link
                    href={item.url}
                    className={(navClass) =>
                      navClass.isActive ? "active" : ""
                    }
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="nav__right d-flex align-items-center gap-5 ">

          {!session && 
            <button className="btn d-flex gap-2 align-items-center" onClick={onConnectWallet} style={{color:"white"}}>
              <span>
              <i class="ri-google-fill"></i>
              </span>
              Sign In
            </button>
          }
          {session && 
            <>
            <button className="btn d-flex gap-2 align-items-center" style={{color:"white"}}>
            <Link href="/wallets">
              Wallets
            </Link>
            </button>

            <Logout/>
            </>
          }

            <span className="mobile__menu">
              <i class="ri-menu-line" onClick={toggleMenu}></i>
            </span>
            
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
