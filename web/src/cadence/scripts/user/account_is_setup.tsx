import {FormulaOneMarket} from "@/constants";

export const accountIsSetup = 
`
import FormulaOneMarket from ${FormulaOneMarket}

// Check to see if an account looks like it has been set up to hold FormulaOneMarket Collection.
pub fun main(address: Address): Bool {
    let account = getAccount(address)
    return account.getCapability(/public/FormulaOneSaleCollection).borrow<&{FormulaOneMarket.SalePublic}>() != nil
}
`