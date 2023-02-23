import React, { useRef, useEffect, useState } from "react";
import { Container } from "reactstrap";
import Link from "next/link";

import { useAuthContext } from "../../hooks/useAuthContext"
import { Logout } from "../Logout";

import * as fcl from "@onflow/fcl"
import { useFlowUser } from "../../hooks/userFlowUser"

import {createCollection} from "src/fcl/transactions";
import {isAccountSetup} from "src/fcl/scripts";

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
  {
    display: "Series",
    url: "/admin/series",
  },
  {
    display: "Set",
    url: "/admin/set",
  }
];

const Header = () => {

  const flowUser = useFlowUser()
  const { session, signIn, isLoading } = useAuthContext()

  const [hasCollection, setHasCollection] = useState(false);

  useEffect(() => {
    if(flowUser?.addr) {
      isAccountSetup(flowUser?.addr).then((res) => {
        setHasCollection(res);
      })
    }
  }, [flowUser]);

  const handleConnectWallet = async () => {
    fcl.unauthenticate()
    fcl.logIn()
  }

  const handleSignInWithGoogle = () => {
    fcl.unauthenticate()
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
            {/* Account address */}
            <h5 className=" d-flex gap-2 align-items-center" style={{color: "white"}}>
              {flowUser?.addr}
            </h5>            
            {/* Connect With Dappr wallet directly */}
            {
              !session && !flowUser?.addr &&
              <button className="btn d-flex gap-2 align-items-center" onClick={handleConnectWallet} style={{color:"white"}}>
                Connect Wallet
              </button>
            }
            {/* Sign In with Google using Niftory */}
            {
              !session && !flowUser?.addr &&
              <button className="btn d-flex gap-2 align-items-center" onClick={handleSignInWithGoogle} style={{color:"white"}}>
                <span>
                <i class="ri-google-fill"></i>
                </span>
                Sign In
              </button>
            }
            {/* Multiple Wallets when Signed In using Niftory */}
            {
              session &&
              <button className="btn d-flex gap-2 align-items-center" style={{color:"white"}}>
              <Link href="/wallets">
                Wallets
              </Link>
              </button>
            }
            {/* Each users needs to create Collection to keep NFTs */}
            {
              flowUser?.addr && !hasCollection &&
              <button className="btn d-flex gap-2 align-items-center" onClick={createCollection} style={{color:"white"}}>
                Create Collection
              </button>
            }
            {/* Logout either if Signed In by Google or Niftory */}
            {
              (session || flowUser?.addr) && <Logout/>
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
