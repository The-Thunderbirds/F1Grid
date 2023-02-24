import * as fcl from "@onflow/fcl"
import * as types from "@onflow/types";

import { setupAccount } from "@/cadence/transactions/user/setup_account";
import { createSet } from "@/cadence/transactions/admin/set/create_set"

export const createCollection = async () => {
    try {
        const transactionId = await fcl.mutate({
          cadence: `${setupAccount}`
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


export const createNewSet = async (name) => {
  try {
      const transactionId = await fcl.mutate({
        cadence: `${createSet}`,
        args: (arg, t) => [
          arg(name, types.String)
        ],
      })
      console.log("Set created now with transaction ID", transactionId);
      const transaction = await fcl.tx(transactionId).onceSealed();
      console.log("Testnet explorer link: ", `https://testnet.flowscan.org/transaction/${transactionId}`);
      console.log(transaction);
      alert("Set has been created successfully!")
    } catch (error) {
      console.log(error);
      alert("Error creating set, please check the console for error details!")
    }
}