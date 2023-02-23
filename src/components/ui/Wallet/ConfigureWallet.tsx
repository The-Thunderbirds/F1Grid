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
        className="bg-[#212e48] mx-2 py-2 px-2 rounded-xl text-white hover:bg-[#00a3ff]"
        onClick={configure}
      >
        Configure wallet
      </button>
    </>
  )
}
