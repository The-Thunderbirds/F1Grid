import * as fcl from "@onflow/fcl"
import * as types from "@onflow/types";

/**** CONSTANTS ****/
import { AdminAccountAddress } from "@/constants";

import { setupAccount } from "@/cadence/transactions/user/setup_account";
import { createSet } from "@/cadence/transactions/admin/set/create_set"
import { addPlayToSetTX } from "@/cadence/transactions/admin/set/add_play_to_set"
import { createPlay } from "@/cadence/transactions/admin/plays/create_play"
import { mintMomentTX } from "@/cadence/transactions/admin/moment/mint_moment"

/**** MARKET ****/
import { createSaleCollection } from "@/cadence/transactions/market/create_sale_collection"
import { startSale } from "@/cadence/transactions/market/start_sale"
import { purchaseMoment } from "@/cadence/transactions/market/purchase_moment"


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

// MINT MOMENT
export const mintMoment = async (setID, playID, addr) => {
  try {
      const transactionId = await fcl.mutate({
        cadence: `${mintMomentTX}`,
        args: (arg, t) => [
          arg(setID, types.UInt32),
          arg(playID, types.UInt32),
          arg(addr, types.Address),
        ],  
      })
      console.log("Moment created now with transaction ID", transactionId);
      const transaction = await fcl.tx(transactionId).onceSealed();
      console.log("Testnet explorer link: ", `https://testnet.flowscan.org/transaction/${transactionId}`);
      console.log(transaction);
      alert("Moment has been created successfully!")
    } catch (error) {
      console.log(error);
      alert("Error creating moment, please check the console for error details!")
    }
}

// CREATE SALE COLLECTION
export const _createSaleCollection = async (beneficiaryAccount=AdminAccountAddress, cutPercentage=0.15) => {
  try {
      const tokenReceiverPath = 
      {
        domain: "public",  // public | private | storage
        identifier: "/public/dapperUtilityCoinReceiver"
      }

      const transactionId = await fcl.mutate({
        cadence: `${createSaleCollection}`,
        args: (arg, t) => [
          arg(tokenReceiverPath, types.Path),
          arg(beneficiaryAccount, types.Address),
          arg(cutPercentage, types.UFix64),
        ],
      })
      console.log("Sale Collection created now with transaction ID", transactionId);
      const transaction = await fcl.tx(transactionId).onceSealed();
      console.log("Testnet explorer link: ", `https://testnet.flowscan.org/transaction/${transactionId}`);
      console.log(transaction);
      alert("Sale Collection has been created successfully!")
    } catch (error) {
      console.log(error);
      alert("Error creating sale collection, please check the console for error details!")
    }
}

// START SALE
export const _startSale = async (momentID, price) => {
  try {
      const transactionId = await fcl.mutate({
        cadence: `${startSale}`,
        args: (arg, t) => [
          arg(momentID, types.UInt64),
          arg(price, types.UFix64)
        ], 
      })
      console.log("Sale created now with transaction ID", transactionId);
      const transaction = await fcl.tx(transactionId).onceSealed();
      console.log("Testnet explorer link: ", `https://testnet.flowscan.org/transaction/${transactionId}`);
      console.log(transaction);
      alert("Sale has been created successfully!")
    } catch (error) {
      console.log(error);
      alert("Error creating sale, please check the console for error details!")
    }
}

// PURCHASE MOMENT
export const _purchaseMoment = async (sellerAddress, tokenID, purchaseAmount) => {
  try {
      const transactionId = await fcl.mutate({
        cadence: `${purchaseMoment}`,
        args: (arg, t) => [
          arg(sellerAddress, types.Address),
          arg(tokenID, types.UInt64),
          arg(purchaseAmount, types.UFix64),
        ], 
      })
      console.log("Purchase transaction created now with transaction ID", transactionId);
      const transaction = await fcl.tx(transactionId).onceSealed();
      console.log("Testnet explorer link: ", `https://testnet.flowscan.org/transaction/${transactionId}`);
      console.log(transaction);
      alert("Purchase transaction has been created successfully!")
    } catch (error) {
      console.log(error);
      alert("Error creating purchase transaction, please check the console for error details!")
    }
}
 