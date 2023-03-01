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

// Flow NS
import { validName, getAddrByName, validAddr, getNameByAddr } from "@/api/flowns";

const NAV__LINKS = [

  {
    display: "Market",
    url: "/market",
  },
  {
    display: "My Packs",
    url: "/packs"
  },
  {
    display: "Compare",
    url: "/compare"
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
  },
  {
    display: "Create Membership",
    url: "/admin/membership",
  }
]
const Header = () => {

  const router = useRouter();
  const flowUser = useFlowUser()
  const { session, signIn } = useAuthContext()

  const [hasSetupAccount, setHasSetupAccount] = useState(false);
  const [loading, setLoading] = useState(false);

  const [flowNSAddr, setFlowNSAddr] = useState(null);
  const [flowNSName, setFlowNSName] = useState(null);

  useEffect(() => {
    if (flowUser?.addr) {
      isAccountSetup(flowUser?.addr).then((res) => {
        setHasSetupAccount(res);
      })
    }
  }, [flowUser]);

  useEffect(() => {
    getAddrByName("flowns.fn").then((res) => {
      if (res) {
        setFlowNSAddr(res.owner);
      } else {
        setFlowNSAddr("FLOWNS name NOT FOUND OR EXPIRED");
      }
    });

    getNameByAddr("0x3c09a556ecca42dc").then((res) => {
      console.log(res);
      if (res) {
        let name = res[0].name;
        for (let rec in res) {
          if (rec.isDefault) {
            name = rec.name;
          }
        }
        setFlowNSName(name);
      } else {
        setFlowNSName("FLOWNS addr NOT FOUND OR EXPIRED");
      }
    });

    validName("flowns.fn").then((res) => {
      console.log(`Is Name Valid : ${res}`);
    })

    validAddr("0x3c09a556ecca42dc").then((res) => {
      console.log(`Is Address Valid : ${res}`);
    })

  }, [])

  const handleConnectWallet = async () => {
    fcl.unauthenticate()
    fcl.logIn()
  }

  const handleSignInWithGoogle = () => {
    fcl.unauthenticate()
    signIn();
  };

  const handleGetStarted = async () => {
    setLoading(true)
    const result = await _setupAccount();
    if (result) {
      alert("Your account setup is successful")
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
                            {
                session || flowUser?.addr &&
                <li className="nav__item" key={3} style={{ marginTop: "5px" }}>
                  <Link
                    href="/join-membership"
                    className=""
                  >
                    Membership
                  </Link>
                </li>
              }
              
            </ul>


          </div>

          <div className="nav__right d-flex align-items-center gap-5 ">
            {flowUser?.addr == AdminAccountAddress ?
                  <UncontrolledDropdown>
                    <DropdownToggle caret style={{ background: "none", color: "white", border: "1px solid red", borderRadius: "10px", padding:"9px 21px"}} className="dropdown__toggle">
                      Admin
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu" >

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
                :
                <></>
              }
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
              <button className="btn d-flex gap-2 align-items-center" onClick={handleGetStarted} style={{ color: "white" }}>
                {!loading && <span> Get Started </span>}
                <Spinner color="primary" style={{ display: loading ? "block" : "none" }} />
              </button>
            }
            {
              flowUser?.addr &&
                console.log({flowNSAddr}, {flowNSName})
            }
            
            {
              flowUser?.addr && hasSetupAccount &&
              <button className="btn d-flex gap-2 align-items-center" style={{ color: "white" }}
                onClick={() => {
                  router.push("/collection")
                  navigator.clipboard.writeText(flowUser?.addr)
                }}
              >
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
