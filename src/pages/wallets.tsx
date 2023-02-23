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
      {
        wallet &&
        <>
          <div className="flex flex-col">
            <span className="text-white text-3xl font-bold">
              Wallet email id -
              {wallet?.appUser?.email}
            </span>
          </div>
          <h1 className="text-4xl text-white">List of Wallets</h1>
          <ul>
            {wallets?.map((currWallet) => (
              <li key={currWallet.address}>
                <div className="flex flex-col">
                  <span className="text-white text-3xl font-bold">
                    Wallet address -
                    <button
                      className="bg-[#212e48] mx-2 py-2 px-2 rounded-xl text-white hover:bg-[#00a3ff]"
                      onClick={() => {
                        const url = `${process.env.NEXT_PUBLIC_FLOW_SCAN_URL}/account/${currWallet?.address}`
                        window.open(url)
                      }}
                    >
                      {currWallet?.address}
                    </button>
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-3xl font-bold">
                    Wallet status -
                    {currWallet?.state?.toString()}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-3xl font-bold">
                    Wallet type -
                    {currWallet?.walletType}
                  </span>
                </div>
                {
                  currWallet?.walletType === WalletType.External && currWallet.address !== flowUser?.addr &&
                  <button
                    className="bg-[#212e48] mx-2 py-2 px-2 rounded-xl text-white hover:bg-[#00a3ff]"
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
                <hr />
              </li>
            ))}
          </ul>
          <RegisterWallet onRegister={() => reExecuteQuery({ requestPolicy: "network-only" })} />
        </>
      }
    </>
  );
}

export default Wallets;