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
import { setupFlowTokenAccount } from "@/cadence/transactions/market/setup_flow_account"

/**** PACKS ****/
import { createPack } from "@/cadence/transactions/packs/create_pack"
import { purchasePack } from "@/cadence/transactions/packs/purchase_pack"
import { packUnveil } from "@/cadence/transactions/packs/pack_unveil"
import { giftPack } from "@/cadence/transactions/packs/gift_pack"

/**** PUDDLE ****/
import { createPuddleCollection } from "@/cadence/transactions/puddle/create_collection"
import { startDrop } from "@/cadence/transactions/puddle/start_drop"
import { stopDrop } from "@/cadence/transactions/puddle/stop_drop"
import { addUserToWaitlist } from "@/cadence/transactions/puddle/add_user_to_waitlist"

// CREATE COLLECTION
export const _setupAccount = async () => {
    try {
        const transactionId = await fcl.mutate({
          cadence: `${setupAccount}`
        })
        console.log("Collection created now with transaction ID", transactionId);
        const transaction = await fcl.tx(transactionId).onceSealed();
        console.log("Testnet explorer link: ", `https://testnet.flowscan.org/transaction/${transactionId}`);
        console.log(transaction);
        return transaction;
        // alert("Collection has been created successfully!")
      } catch (error) {
        console.log(error);
        return false
        // alert("Error creating collection, please check the console for error details!")
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
      return transaction;
      // alert("Set has been created successfully!")
    } catch (error) {
      console.log(error);
      return false
      // alert("Error creating set, please check the console for error details!")
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
      return transaction;
      // alert("Play has been created successfully!")
    } catch (error) {
      console.log(error);
      return false
      // alert("Error creating play, please check the console for error details!")
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
      return transaction;
      // alert("Play has been added to set successfully!")
    } catch (error) {
      console.log(error);
      return false
      // alert("Error adding play to set, please check the console for error details!")
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
      return transaction;
      // alert("Moment has been created successfully!")
    } catch (error) {
      console.log(error);
      return false
      // alert("Error creating moment, please check the console for error details!")
    }
}

// CREATE SALE COLLECTION
export const _createSaleCollection = async (beneficiaryAccount=AdminAccountAddress, cutPercentage=0.15) => {
  try {
      // const tokenReceiverPath = 
      // {
      //   domain: "public",  // public | private | storage
      //   identifier: "/public/flowTokenReceiver"
      // }

      const transactionId = await fcl.mutate({
        cadence: `${createSaleCollection}`,
        args: (arg, t) => [
          // arg(tokenReceiverPath, types.Path),
          arg(beneficiaryAccount, types.Address),
          arg(cutPercentage, types.UFix64),
        ],
      })
      console.log("Sale Collection created now with transaction ID", transactionId);
      const transaction = await fcl.tx(transactionId).onceSealed();
      console.log("Testnet explorer link: ", `https://testnet.flowscan.org/transaction/${transactionId}`);
      console.log(transaction);
      return transaction;
      // alert("Sale Collection has been created successfully!")
    } catch (error) {
      console.log(error);
      return false
      // alert("Error creating sale collection, please check the console for error details!")
    }
}

// START SALE
export const _startSale = async (momentID=1, price=10.0) => {
  try {
      const transactionId = await fcl.mutate({
        cadence: `${startSale}`,
        args: (arg, t) => [
          arg(momentID, types.UInt64),
          arg(price.toFixed(2), types.UFix64)
        ], 
      })
      console.log("Sale created now with transaction ID", transactionId);
      const transaction = await fcl.tx(transactionId).onceSealed();
      console.log("Testnet explorer link: ", `https://testnet.flowscan.org/transaction/${transactionId}`);
      console.log(transaction);
      return transaction;
      // alert("Sale has been created successfully!")
    } catch (error) {
      console.log(error);
      return false
      // alert("Error creating sale, please check the console for error details!")
    }
}

// PURCHASE MOMENT
export const _purchaseMoment = async (sellerAddress=AdminAccountAddress, tokenID=1, purchaseAmount) => {
  try {
      const transactionId = await fcl.mutate({
        cadence: `${purchaseMoment}`,
        args: (arg, t) => [
          arg(sellerAddress, types.Address),
          arg(tokenID, types.UInt64),
          arg(parseFloat(purchaseAmount).toFixed(2), types.UFix64),
        ], 
      })
      console.log("Purchase transaction created now with transaction ID", transactionId);
      const transaction = await fcl.tx(transactionId).onceSealed();
      console.log("Testnet explorer link: ", `https://testnet.flowscan.org/transaction/${transactionId}`);
      console.log(transaction);
      return transaction;
      // alert("Purchase transaction has been created successfully!")
    } catch (error) {
      console.log(error);
      return false
      // alert("Error creating purchase transaction, please check the console for error details!")
    }
}
 

// CREATE PACK
export const _createPack = async (momentIDs, momentsPerPack, price=10.0, owner) => {
  try {
      console.log(momentIDs, momentsPerPack, price, owner)
      const transactionId = await fcl.mutate({
        cadence: `${createPack}`,
        args: (arg, t) => [
          arg(momentIDs, types.Array(types.UInt64)),
          arg(momentsPerPack, types.UInt64),
          arg(price.toFixed(2), types.UFix64),
          arg(owner, types.Address),
        ], 
      })
      console.log("Pack created now with transaction ID", transactionId);
      const transaction = await fcl.tx(transactionId).onceSealed();
      console.log("Testnet explorer link: ", `https://testnet.flowscan.org/transaction/${transactionId}`);
      console.log(transaction);
      return transaction;
    } catch (error) {
      console.log(error);
      return false
    }
}


// PURCHASE PACK
export const _purchasePack = async (sellerAddress, packID, purchaseAmount) => {
  try {
      const transactionId = await fcl.mutate({
        cadence: `${purchasePack}`,
        args: (arg, t) => [
          arg(sellerAddress, types.Address),
          arg(packID, types.UInt64),
          arg(parseFloat(purchaseAmount).toFixed(2), types.UFix64),
        ], 
      })
      console.log("Purchase transaction created now with transaction ID", transactionId);
      const transaction = await fcl.tx(transactionId).onceSealed();
      console.log("Testnet explorer link: ", `https://testnet.flowscan.org/transaction/${transactionId}`);
      console.log(transaction);
      return transaction;
      // alert("Purchase transaction has been created successfully!")
    } catch (error) {
      console.log(error);
      return false
      // alert("Error creating purchase transaction, please check the console for error details!")
    }
}


// OPEN PACK
export const openPack = async (sellerAddress, packID) => {
  try {
      const transactionId = await fcl.mutate({
        cadence: `${packUnveil}`,
        args: (arg, t) => [
          arg(sellerAddress, types.Address),
          arg(packID, types.UInt64),
        ], 
      })
      console.log("Open pack transaction created now with transaction ID", transactionId);
      const transaction = await fcl.tx(transactionId).onceSealed();
      console.log("Testnet explorer link: ", `https://testnet.flowscan.org/transaction/${transactionId}`);
      console.log(transaction);
      return transaction;
    } catch (error) {
      console.log(error);
      return false
    }
}


// GIFT PACK
export const _giftPack = async (packID, addr) => {
  try {
      const transactionId = await fcl.mutate({
        cadence: `${giftPack}`,
        args: (arg, t) => [
          arg(packID, types.UInt64),
          arg(addr, types.Address),
        ], 
      })
      console.log("Gift Pack transaction created now with transaction ID", transactionId);
      const transaction = await fcl.tx(transactionId).onceSealed();
      console.log("Testnet explorer link: ", `https://testnet.flowscan.org/transaction/${transactionId}`);
      console.log(transaction);
      return transaction;
    } catch (error) {
      console.log(error);
      return false
    }
}


// SETUP FLOW ACCOUNT --- IGNORE
export const createVault = async () => {
  try {
      const transactionId = await fcl.mutate({
        cadence: `${setupFlowTokenAccount}`
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

export const _cratePuddleCollection = async () => {
  try {
      const transactionId = await fcl.mutate({
        cadence: `${createPuddleCollection}`
      })
      console.log("Create Puddle Collection transaction created now with transaction ID", transactionId);
      const transaction = await fcl.tx(transactionId).onceSealed();
      console.log("Testnet explorer link: ", `https://testnet.flowscan.org/transaction/${transactionId}`);
      console.log(transaction);
      return transaction;
    } catch (error) {
      console.log(error);
      return false
    }
}

export const _startDrop = async (tier, deltaDeadline, membersLimit, metadata) => {
  try {
      const transactionId = await fcl.mutate({
        cadence: `${startDrop}`,
        args: (arg, t) => [
          arg(tier, types.String),
          arg(deltaDeadline, types.UInt64),
          arg(membersLimit, types.UInt64),
          arg(metadata, types.Dictionary({key: types.String, value: types.String}))
        ], 
      })
      console.log("Start Drop transaction created now with transaction ID", transactionId);
      const transaction = await fcl.tx(transactionId).onceSealed();
      console.log("Testnet explorer link: ", `https://testnet.flowscan.org/transaction/${transactionId}`);
      console.log(transaction);
      return transaction;
    } catch (error) {
      console.log(error);
      return false
    }
}

export const _stopDrop = async (membershipDropID) => {
  try {
      const transactionId = await fcl.mutate({
        cadence: `${stopDrop}`,
        args: (arg, t) => [
          arg(membershipDropID, types.UInt64),
        ], 
      })
      console.log("Stop Drop transaction created now with transaction ID", transactionId);
      const transaction = await fcl.tx(transactionId).onceSealed();
      console.log("Testnet explorer link: ", `https://testnet.flowscan.org/transaction/${transactionId}`);
      console.log(transaction);
      return transaction;
    } catch (error) {
      console.log(error);
      return false
    }
}

export const _addUserToWaitlist = async (membershipDropID, address) => {
  try {
      const transactionId = await fcl.mutate({
        cadence: `${addUserToWaitlist}`,
        args: (arg, t) => [
          arg(membershipDropID, types.UInt64),
          arg(address, types.Address),
        ], 
      })
      console.log("Add user to waitlist transaction created now with transaction ID", transactionId);
      const transaction = await fcl.tx(transactionId).onceSealed();
      console.log("Testnet explorer link: ", `https://testnet.flowscan.org/transaction/${transactionId}`);
      console.log(transaction);
      return transaction;
    } catch (error) {
      console.log(error);
      return false
    }
}

