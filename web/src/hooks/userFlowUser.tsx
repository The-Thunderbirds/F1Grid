import * as fcl from "@onflow/fcl"
import { useMemo, useState } from "react"

export function useFlowUser() {
  const [flowUser, setFlowUser] = useState<fcl.CurrentUserObject>()

  useMemo(() => {
    fcl
      .config()
      // Point App at Emulator REST API
      // .put("accessNode.api", "https://fcl-discovery.onflow.org/api/local/authn")
      // Point FCL at dev-wallet (default port)
      // .put("discovery.wallet", "https://fcl-discovery.onflow.org/local/authn")
      .put("app.detail.title", "F1 Grid")
      .put("app.detail.icon", "https://i.imgur.com/RrnHBDh.png")
      .put("accessNode.api", process.env.NEXT_PUBLIC_FLOW_ACCESS_API) // connect to Flow
      .put("discovery.wallet", process.env.NEXT_PUBLIC_WALLET_API) 
      .put("discovery.authn.include", "0x82ec283f88a62e65") // use Dapper wallet

      // use pop instead of default IFRAME/RPC option for security enforcement
      .put("discovery.wallet.method", "POP/RPC")

    // Sets flowUser whenver it changes
    fcl.currentUser.subscribe(setFlowUser)
  }, [])

  return flowUser
}
