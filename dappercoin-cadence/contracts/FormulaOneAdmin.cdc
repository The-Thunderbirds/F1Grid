/*

  FormulaOneAdmin.cdc

  This contract defines a function that takes a FormulaOne Admin
  object and stores it in the storage of the contract account
  so it can be used.

 */

import FormulaOne from "./FormulaOne.cdc"

pub contract FormulaOneAdminReceiver {

    // storeAdmin takes a FormulaOne Admin resource and 
    // saves it to the account storage of the account
    // where the contract is deployed
    pub fun storeAdmin(newAdmin: @FormulaOne.Admin) {
        self.account.save(<-newAdmin, to: /storage/FormulaOneAdmin)
    }
    
    init() {
    }
}