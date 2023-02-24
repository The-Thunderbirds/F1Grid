import {FormulaOne} from "@/constants";

export const accountIsSetup = 
`
import FormulaOne from ${FormulaOne}

// Check to see if an account looks like it has been set up to hold FormulaOne NFTs.
pub fun main(address: Address): Bool {
    let account = getAccount(address)
    return account.getCapability(/public/MomentCollection).borrow<&{FormulaOne.MomentCollectionPublic}>() != nil
}
`