import React, { useRef, useEffect, useState } from "react";
import { Container, Spinner, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import Link from "next/link";

import { useAuthContext } from "../../hooks/useAuthContext"
import { Logout } from "../Logout";

import * as fcl from "@onflow/fcl"
import { useFlowUser } from "../../hooks/userFlowUser"

import { _setupAccount, _startSale, _purchaseMoment } from "src/fcl/transactions";
import { isAccountSetup } from "src/fcl/scripts";
import f1logo from "@/assets/images/F1.svg";
import Image from "next/image";
import { useRouter } from "next/router";

import { AdminAccountAddress } from "@/constants"

const NAV__LINKS = [

  {
    display: "Market",
    url: "/market",
  },
  {
    display: "My Packs",
    url: "/packs"
  },
  // {
  //   display: "Sale Collection",
  //   url: "/sale-collection"
  // }

];

const ADMIN__LINKS = [
  {
    display: "Create Play",
    url: "/admin/play",
  },
  {
    display: "Create Set",
    url: "/admin/set",
  },
  {
    display: "Mint Moment",
    url: "/admin/mint",
  }
]
const Header = () => {

  const router = useRouter();
  const flowUser = useFlowUser()
  const { session, signIn } = useAuthContext()

  const [hasSetupAccount, setHasSetupAccount] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (flowUser?.addr) {
      isAccountSetup(flowUser?.addr).then((res) => {
        setHasSetupAccount(res);
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
      window.removeEventListener("scroll", () => { });
    };
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle("active__menu");

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <div className="navigation">
          <div className="logo">
            <h2 className=" d-flex gap-2 align-items-center ">
              <Link href="\">
                <Image src={f1logo} width="64px" />
              </Link>
            </h2>
          </div>

          <div className="nav__menu" ref={menuRef} onClick={toggleMenu}>
            <ul className="nav__list" >
              <li className="nav__item" key={1} style={{ marginTop: "5px" }}>
                <Link
                  href="/market"
                  className=""
                >
                  Market
                </Link>
              </li>
              {
                session || flowUser?.addr &&
                <li className="nav__item" key={2} style={{ marginTop: "5px" }}>
                  <Link
                    href="/packs"
                    className=""
                  >
                    Packs
                  </Link>
                </li>
              }
              {flowUser?.addr == AdminAccountAddress ?
                <li className="nav__item" key={5}>
                  <UncontrolledDropdown>
                    <DropdownToggle caret style={{ background: "none", color: "white", border: "1px solid red", borderRadius: "10px" }} className="dropdown__toggle">
                      Admin
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu">

                      {ADMIN__LINKS.map((item, index) => (
                        <DropdownItem
                          className="dropdown-item"
                          onClick={() => {
                            router.push(item.url);
                          }}
                        >
                          {item.display}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </li>
                :
                <></>
              }
            </ul>


          </div>

          <div className="nav__right d-flex align-items-center gap-5 ">
            {/* Connect With Dappr wallet directly */}
            {
              !session && !flowUser?.addr &&
              <button className="btn d-flex gap-2 align-items-center" onClick={handleConnectWallet} style={{ color: "white" }}>
                Connect Wallet
              </button>
            }
            {/* Sign In with Google using Niftory */}
            {
              !session && !flowUser?.addr &&
              <button className="btn d-flex gap-2 align-items-center" onClick={handleSignInWithGoogle} style={{ color: "white" }}>
                <span>
                  <i className="ri-google-fill"></i>
                </span>
                Sign In
              </button>
            }
            {/* Multiple Wallets when Signed In using Niftory */}
            {
              session &&
              <button className="btn d-flex gap-2 align-items-center" style={{ color: "white" }}>
                <Link href="/wallets">
                  Wallets
                </Link>
              </button>
            }
            {/* Each users needs to create Collection to keep NFTs */}
            {
              flowUser?.addr && !hasSetupAccount &&
              <button className="btn d-flex gap-2 align-items-center" onClick={_setupAccount} style={{ color: "white" }}>
                Get Started
              </button>
            }
            {
              flowUser?.addr && hasSetupAccount &&
              <button className="btn d-flex gap-2 align-items-center" style={{ color: "white" }} onClick={() => { router.push("/collection") }}>
                <span>
                  <i className="ri-wallet-fill"></i>
                </span>
                {flowUser?.addr.substring(0, 8)}...
              </button>
            }
            {/* Logout either if Signed In by Google or Niftory */}
            {
              (session || flowUser?.addr) && <Logout />
            }
            <span className="mobile__menu">
              <i className="ri-menu-line" onClick={toggleMenu}></i>
            </span>

          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
