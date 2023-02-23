import * as fcl from "@onflow/fcl"
import * as types from "@onflow/types";

import {setupFormulaOneAccount} from "../cadence/transactions/user/setup_formulaone_account";

export const createCollection = async () => {
    try {
        const transactionId = await fcl.mutate({
          cadence: `${setupFormulaOneAccount}`,
          args: (arg, t) => [
          ],
        })
        console.log("Collection created now with transaction ID", transactionId);
        const transaction = await fcl.tx(transactionId).onceSealed();
        console.log("Testnet explorer link: ", `https://testnet.flowscan.org/transaction/${transactionId}`);
        console.log(transaction);
        alert("Collection has been created successfully!")
      } catch (error) {
        console.log(error);
        alert("Error creating collection, please check the console for error details!")
      }
}