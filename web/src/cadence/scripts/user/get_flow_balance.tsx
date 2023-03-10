import {FungibleToken, AdminAccountAddress, FlowCoin} from "@/constants";

export const getFlowBalance = 
`
// This script reads the balance field of an account's FlowToken Balance

import FungibleToken from ${FungibleToken}
import FlowToken from ${FlowCoin}

pub fun main(account: Address): UFix64 {

    let vaultRef = getAccount(account)
        .getCapability(/public/flowTokenBalance)
        .borrow<&FlowToken.Vault{FungibleToken.Balance}>()
        ?? panic("Could not borrow Balance reference to the Vault")

    return vaultRef.balance
}
`