import {NonFungibleToken, FormulaOne} from "@/constants";

export const accountIsSetup = 
`
import NonFungibleToken from ${NonFungibleToken}
import FormulaOne from ${FormulaOne}

// Check to see if an account looks like it has been set up to hold FormulaOne NFTs.
pub fun main(address: Address): Bool {
    let account = getAccount(address)
    return account.getCapability(FormulaOne.CollectionPublicPath).borrow<&{NonFungibleToken.CollectionPublic}>() != nil
}
`