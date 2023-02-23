import { useEffect } from "react"
import { useGraphQLMutation } from "../../../graphql/useGraphQLMutation"
import { useFlowAccountConfiguration } from "../../../hooks/userFlowAccountConfiguration"
import { useFlowUser } from "../../../hooks/userFlowUser"
import { ReadyWalletDocument, Wallet } from "../../../generated/graphql"

interface Props {
  wallet: Wallet
  onReady?: () => void
}

export function ConfigureWallet({ wallet, onReady }: Props) {
  const flowUser = useFlowUser()

  const { executeMutation: readyWallet } = useGraphQLMutation(ReadyWalletDocument)
  const { configured, configure } = useFlowAccountConfiguration()

  // Once the wallet is configured, call the ready mutation to tell Niftory it's ready to receive NFTs
  useEffect(() => {
    if (!configured || wallet.address != flowUser?.addr) {
      return
    }

    readyWallet({ address: flowUser?.addr }).then(onReady)
  }, [flowUser?.addr, configured])

  return (
    <>
      <button
        className="btn btn-primary w-25"
        onClick={configure}
      >
        Configure wallet
      </button>
    </>
  )
}
