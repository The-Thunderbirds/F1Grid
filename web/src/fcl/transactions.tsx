import * as fcl from "@onflow/fcl"
import * as types from "@onflow/types";

import {setupFormulaOneAccount} from "@/cadence/transactions/user/setup_formulaone_account";
import {createSeries} from "@/cadence/transactions/admin/series/create_series"

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


export const createNewSeries = async (name) => {
  try {
    console.log(name)
      const transactionId = await fcl.mutate({
        cadence: `${createSeries}`,
        args: (arg, t) => [
          arg(name, types.String)
        ],
      })
      console.log("Series created now with transaction ID", transactionId);
      const transaction = await fcl.tx(transactionId).onceSealed();
      console.log("Testnet explorer link: ", `https://testnet.flowscan.org/transaction/${transactionId}`);
      console.log(transaction);
      alert("Series has been created successfully!")
    } catch (error) {
      console.log(error);
      alert("Error creating series, please check the console for error details!")
    }
}