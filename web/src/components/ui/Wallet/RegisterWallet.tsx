import { useEffect } from "react"

import * as fcl from "@onflow/fcl"
import { useFlowUser } from "../../../hooks/userFlowUser"
import { useGraphQLMutation } from "../../../graphql/useGraphQLMutation"
import {
  RegisterWalletDocument,
  RegisterWalletMutation,
  RegisterWalletMutationVariables,
} from "../../../generated/graphql"

interface Props {
  onRegister?: () => void
}

export function RegisterWallet({ onRegister }: Props) {
  const flowUser = useFlowUser()

  const { executeMutation: registerWallet } = useGraphQLMutation<
    RegisterWalletMutation,
    RegisterWalletMutationVariables
  >(RegisterWalletDocument)

  // When the user logs in, register their wallet. This is because we need to register after fcl.login and it doesn't return a promise.
  useEffect(() => {
    if (!flowUser?.addr) {
      return
    }

    registerWallet({ address: flowUser?.addr }).then(() => onRegister?.())
  }, [flowUser?.addr, flowUser?.loggedIn])

  const handleRegister = async () => {
    fcl.unauthenticate()
    fcl.logIn()
  }

  return (
    <button 
    className="bg-[#212e48] mx-2 py-2 px-2 rounded-xl text-white hover:bg-[#00a3ff]"
    onClick={handleRegister}>
      Add Dapper wallet
    </button>
  )
}
