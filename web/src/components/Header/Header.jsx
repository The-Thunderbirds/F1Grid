import React, { useRef, useEffect, useState } from "react";
import { Container, Spinner, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import Link from "next/link";

import { useAuthContext } from "../../hooks/useAuthContext"
import { Logout } from "../Logout";

import * as fcl from "@onflow/fcl"
import { useFlowUser } from "../../hooks/userFlowUser"

import { createCollection, _createSaleCollection, _startSale, _purchaseMoment } from "src/fcl/transactions";
import { isAccountSetup } from "src/fcl/scripts";
import f1logo from "@/assets/images/F1.svg";
import Image from "next/image";
import { useRouter } from "next/router";

const NAV__LINKS = [

  {
    display: "Market",
    url: "/market",
  },
  {
    display: "Packs",
    url: "/packs"
  },
  {
    display: "Collection",
    url: "/collection"
  }

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
  const { session, signIn, isLoading } = useAuthContext()

  const [hasCollection, setHasCollection] = useState(false);
  const [hasSaleCollection, setHasSaleCollection] = useState(false);

  useEffect(() => {
    if (flowUser?.addr) {
      isAccountSetup(flowUser?.addr).then((res) => {
        setHasCollection(res);
        setHasSaleCollection(res);
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

  const [loading, setLoading] = useState(false);

  const handleSaleCollectionCreation = async () => {
    setLoading(true)
    const result = await _createSaleCollection()
    if (result) {
      alert("Sale Collection created successfully")
      setHasSaleCollection(true)
      setLoading(false)
      window.location.reload();
    }
    else {
      alert("Something went wrong")
      setLoading(false)
    }
  }


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
              {NAV__LINKS.map((item, index) => (
                <li className="nav__item" key={index} style={{marginTop:"5px"}}>
                  <Link
                    href={item.url}
                    className=""
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
              <li className="nav__item" key={5}>
              <UncontrolledDropdown>
          <DropdownToggle caret style={{background:"none", color:"white", border:"1px solid red", borderRadius:"10px"}} className="dropdown__toggle">
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
            </ul>
                              
           
          </div>

          <div className="nav__right d-flex align-items-center gap-5 ">
            {/* Account address */}

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
              flowUser?.addr && !hasCollection &&
              <button className="btn d-flex gap-2 align-items-center" onClick={createCollection} style={{ color: "white" }}>
                Create Collection
              </button>
            }
            {/* Create Sale collection to sell Moments in Marketplace from User Moments */}
            {
              flowUser?.addr && hasCollection && !hasSaleCollection &&
              <button className="btn d-flex gap-2 align-items-center" onClick={handleSaleCollectionCreation} style={{ color: "white" }}>                
                {!loading && <span> Create Sale Collection </span>}
                 <Spinner color="primary" style={{ display: loading ? "block" : "none"}} />
              </button>
            }
            {
              flowUser?.addr &&
              <button className="btn d-flex gap-2 align-items-center" style={{ color: "white" }} onClick={() => {router.push("/collection")}}>
                <span>
                  <i className="ri-wallet-fill"></i>
                </span>
                {flowUser?.addr}
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
