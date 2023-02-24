import * as fcl from "@onflow/fcl"
import * as types from "@onflow/types";

import { setupAccount } from "@/cadence/transactions/user/setup_account";
import { createSet } from "@/cadence/transactions/admin/set/create_set"
import { addPlayToSetTX } from "@/cadence/transactions/admin/set/add_play_to_set"
import { createPlay } from "@/cadence/transactions/admin/plays/create_play"

// CREATE COLLECTION
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


// CREATE SET
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


// CREATE PLAY
export const createNewPlay = async (metadata) => {
  try {
    console.log(metadata)
      const transactionId = await fcl.mutate({
        cadence: `${createPlay}`,
        args: (arg, t) => [
          arg(metadata, types.Dictionary({key: types.String, value: types.String}))
        ],  
      })
      console.log("Play created now with transaction ID", transactionId);
      const transaction = await fcl.tx(transactionId).onceSealed();
      console.log("Testnet explorer link: ", `https://testnet.flowscan.org/transaction/${transactionId}`);
      console.log(transaction);
      alert("Play has been created successfully!")
    } catch (error) {
      console.log(error);
      alert("Error creating play, please check the console for error details!")
    }
}


// ADD PLAY TO SET
export const addPlayToSet = async (setID, playID) => {
  try {
    console.log(setID, playID)
      const transactionId = await fcl.mutate({
        cadence: `${addPlayToSetTX}`,
        args: (arg, t) => [
          arg(setID, types.UInt32),
          arg(playID, types.UInt32)
        ],  
      })
      console.log("Play added to set now with transaction ID", transactionId);
      const transaction = await fcl.tx(transactionId).onceSealed();
      console.log("Testnet explorer link: ", `https://testnet.flowscan.org/transaction/${transactionId}`);
      console.log(transaction);
      alert("Play has been added to set successfully!")
    } catch (error) {
      console.log(error);
      alert("Error adding play to set, please check the console for error details!")
    }
}