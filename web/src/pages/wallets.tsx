import React from "react"
import { useMemo } from "react"

import { AppUserDocument, Wallet, WalletType } from "../generated/graphql"

import { useAuthContext } from "../hooks/useAuthContext"
import { useGraphQLQuery } from "../graphql/useGraphQLQuery"
import { WalletQuery, WalletDocument, WalletState } from "../generated/graphql"

import { RegisterWallet } from "../components/ui/Wallet/RegisterWallet"
import { VerifyWallet } from "../components/ui/Wallet/VerifyWallet"
import { ConfigureWallet } from "../components/ui/Wallet/ConfigureWallet"

import * as fcl from "@onflow/fcl"
import { useFlowUser } from "../hooks/userFlowUser"
import CommonSection from "../components/ui/Common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
export const Wallets = () => {

  const flowUser = useFlowUser()

  const { session, signIn, isLoading } = useAuthContext()

  const { wallet, fetching: walletFetching } = useGraphQLQuery<WalletQuery>({
    query: WalletDocument,
    pause: isLoading,
  })

  const {
    appUser,
    fetching: fetchingWallets,
    reExecuteQuery,
  } = useGraphQLQuery({ query: AppUserDocument })

  const wallets = useMemo(
    () =>
      appUser?.wallets.sort((a, b) => {
        if (a.walletType === WalletType.Custodial) return -1
        if (b.walletType === WalletType.Custodial) return 1
        return a.address > b.address ? 1 : -1
      }),
    [appUser?.wallets]
  )

  return (
    <>
      <CommonSection title="Connect Wallet" />
      <section>
        <Container>
          <Row className="mb-5">
      {
        wallet &&
        <>
          <h2>Your Wallets:</h2>
            {wallets?.map((currWallet) => (
              <Col lg="3" md="4" sm="6" key={currWallet.address} className="mb-4">
                <div className="wallet__item" style={{width:"max-content", borderRadius:"15px",height:"200px"}}>
                  <h5>
                    Wallet address - <button
                      className="btn btn-primary"
                      onClick={() => {
                        const url = `${process.env.NEXT_PUBLIC_FLOW_SCAN_URL}/account/${currWallet?.address}`
                        window.open(url)
                      }}
                    >
                      {currWallet?.address}
                    </button>
                  </h5>
                  <h5>
                    Wallet status -
                    {" " + currWallet?.state?.toString()}
                  </h5>
                  <h5  className="text-white text-3xl font-bold">
                    Wallet type - {" " + currWallet?.walletType}
                  </h5>
                {
                  currWallet?.walletType === WalletType.External && currWallet.address !== flowUser?.addr &&
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      fcl.unauthenticate()
                      fcl.logIn()
                    }}
                  >
                    Switch Wallet
                  </button>
                }
                {
                  currWallet.address === flowUser?.addr &&
                  <>
                    {
                      currWallet.state === WalletState.Unverified &&
                      <VerifyWallet wallet={currWallet as Wallet} />
                    }
                    {
                      currWallet.state === WalletState.Verified &&
                      <ConfigureWallet wallet={currWallet as Wallet} />
                    }
                  </>
                }
                </div>
          </Col>
            ))}

        </>
      }
          </Row>
          <RegisterWallet onRegister={() => reExecuteQuery({ requestPolicy: "network-only" })} />
        </Container>  
      </section>

    </>
  );
}

export default Wallets;