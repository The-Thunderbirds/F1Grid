import * as fcl from "@onflow/fcl"
import * as types from "@onflow/types";


import { accountIsSetup } from "@/cadence/scripts/user/account_is_setup";
import { getAllUsers } from "@/cadence/scripts/user/get_all_user_addr";
import { getNextSetID } from "@/cadence/scripts/admin/set/get_nextSetID";
import { getSetData } from "@/cadence/scripts/admin/set/get_set_data";
import { getNextPlayID } from "@/cadence/scripts/admin/plays/get_nextPlayID";
import { getPlayMetadata } from "@/cadence/scripts/admin/plays/get_play_metadata";
import { getCollectionIDs } from "@/cadence/scripts/admin/moments/get_collection_ids";
import { getMomentMetadata } from "@/cadence/scripts/admin/moments/get_metadata";
import { getMomentSerialNum } from "@/cadence/scripts/admin/moments/get_moment_serialNum";
import { getMomentSetID } from "@/cadence/scripts/admin/moments/get_moment_setID";
import { getFlowBalance } from "@/cadence/scripts/user/get_flow_balance";

/**** MARKET ****/
import { getSalePrice } from "@/cadence/scripts/market/get_sale_price";
import { getSaleMomentIds } from "@/cadence/scripts/market/get_sale_moment_ids";
import { getSaleMomentSetID } from "@/cadence/scripts/market/get_sale_moment_set_id";
import { getSaleMomentSNo } from "@/cadence/scripts/market/get_sale_moment_serialNum";
import { getSaleMomentIdMetadata } from "@/cadence/scripts/market/get_sale_moment_id_metadata";

/**** PACKS ****/
import { getAllPacks } from "@/cadence/scripts/packs/get_all_packs";
import { getPackPrice } from "@/cadence/scripts/packs/get_pack_price";
import { getPackProofs } from "@/cadence/scripts/packs/get_pack_proofs";

import { AdminAccountAddress } from "@/constants";

// Flow Balance
export const flow_balance = async (addr="0x4e616c1e361b69d2") => {
    try {
        const result = await fcl.query({
            cadence: `${getFlowBalance}`,
            args: (arg, t) => [
                arg(addr, types.Address),
            ],
        })
        console.log(`Balance is : ${result}`);
        return result;
    } catch (error) {
        console.log(error);
    }
}

// GET ALL USERS
export const getAllUsersAddr = async () => {
    try {
        const result = await fcl.query({
            cadence: `${getAllUsers}`
        })
        return result;
    } catch (error) {
        console.log(error);
    }
}


// IS ACCOUNT SETUP
export const isAccountSetup = async (addr) => {
    try {
        const result = await fcl.query({
            cadence: `${accountIsSetup}`,
            args: (arg, t) => [
                arg(addr, types.Address),
            ],
        })
        return result;
    } catch (error) {
        console.log(error);
    }
}

export const getSetDataByID = async (id) => {
    try {
        const result = await fcl.query({
            cadence: `${getSetData}`,
            args: (arg, t) => [
                arg(id, types.UInt32),
            ],    
        })
        return result
    }
    catch (error) {
        console.log(error)
    }
}


// GET ALL SETS
export const getAllSets = async () => {
    try {        
        const num = await fcl.query({
            cadence: `${getNextSetID}`
        })

        const setDataList = []

        for(let i = 1; i < num; i++) {
            const result = await getSetDataByID(i)

            const playLen = result.plays.length;

            result["playMetadata"] = []

            for(let j = 0; j < playLen; j++) {
                const play = await getPlayMetadataById(result.plays[j]);
                result.playMetadata.push(play)
            }

            setDataList.push(result);
        }

        return setDataList;
    } catch (error) {
        console.log(error);
    }

}

// GET NEXT PLAY ID
export const getNextPlayId = async () => {
    try {        
        const num = await fcl.query({
            cadence: `${getNextPlayID}`
        })

        return num;
    } catch (error) {
        console.log(error);
    }

}

// GET PLAY METADATA BY ID
export const getPlayMetadataById = async (id) => {
    try {        
        const result = await fcl.query({
            cadence: `${getPlayMetadata}`,
            args: (arg, t) => [
                arg(id, types.UInt32),
            ],    
        })
        return result;
    } catch (error) {
        console.log(error);
    }
}

// GET ALL PLAYS
export const getAllPlays = async () => {
    try {        
        const num = await getNextPlayId();
        const playMetadataList = []

        for(let i = 1; i < num; i++) {
            const result = await getPlayMetadataById(i);
            playMetadataList.push(result);
        }

        return playMetadataList;
    } catch (error) {
        console.log(error);
    }
}

// GET ALL COLLECTION IDs
export const getAllCollectionIDs = async (addr) => {
    try {        
        const result = await fcl.query({
            cadence: `${getCollectionIDs}`,
            args: (arg, t) => [
                arg(addr, types.Address),
            ],
        })
        return result;
    } catch (error) {
        console.log(error);
    }
}

// GET MOMENT SET ID BY ID AND ADDRESS
export const getMomentSetIDByAddrID = async (addr, id, code = getMomentSetID) => {
    try {        
        const result = await fcl.query({
            cadence: `${code}`,
            args: (arg, t) => [
                arg(addr, types.Address),
                arg(id, types.UInt64),
            ],    
        })
        return result;
    } catch (error) {
        console.log(error);
    }
}


// GET MOMENT SERIAL NUM BY ID AND ADDRESS
export const getMomentSNumByAddrID = async (addr, id, code=getMomentSerialNum) => {
    try {        
        const result = await fcl.query({
            cadence: `${code}`,
            args: (arg, t) => [
                arg(addr, types.Address),
                arg(id, types.UInt64),
            ],    
        })
        return result;
    } catch (error) {
        console.log(error);
    }
}

// GET MOMENT METADATA BY ID AND ADDRESS
export const getMomentByAddrID = async (addr, id) => {
    try {        
        const result = await fcl.query({
            cadence: `${getMomentMetadata}`,
            args: (arg, t) => [
                arg(addr, types.Address),
                arg(id, types.UInt64),
            ],    
        })
        const sno = await getMomentSNumByAddrID(addr, id)
        result["sno"] = sno

        const setid = await getMomentSetIDByAddrID(addr, id)
        const set = await getSetDataByID(setid)
        result["set"] = set

        result["id"] = id
        console.log(result)
        return result;
    } catch (error) {
        console.log(error);
    }
}


// GET ALL COLLECTIONS
export const getAllCollections = async (addr) => {
    try {        
        const moments = await getAllCollectionIDs(addr);
        const len = moments.length;
        const momentMetadataList = []

        for(let i = 0; i < len; i++) {
            const result = await getMomentByAddrID(addr, moments[i])
            momentMetadataList.push(result);
        }

        return momentMetadataList;
    } catch (error) {
        console.log(error);
    }
}


// GET SALE ITEM DETAILS BY MOMENT ID
export const getSaleItemByAddrID = async (addr, id) => {
    try {        
        const result = await fcl.query({
            cadence: `${getSaleMomentIdMetadata}`,
            args: (arg, t) => [
                arg(addr, types.Address),
                arg(id, types.UInt64),
            ],    
        })

        const price = await getSalePriceById(addr, id);
        result["price"] = price

        const sno = await getMomentSNumByAddrID(addr, id, getSaleMomentSNo)
        result["sno"] = sno

        const setid = await getMomentSetIDByAddrID(addr, id, getSaleMomentSetID)
        const set = await getSetDataByID(setid)
        result["set"] = set

        result["id"] = id
        result["address"] = addr

        return result;
    } catch (error) {
        console.log(error);
    }
}


// GET SALE ITEMS BY ADDRESS
export const getSaleItemsByAddr = async (addr) => {
    try {        
        const momentIds = await fcl.query({
            cadence: `${getSaleMomentIds}`,
            args: (arg, t) => [
                arg(addr, types.Address),
            ],    
        })

        const len = momentIds.length;
        const momentMetadataList = []

        for(let i = 0; i < len; i++) {
            const result = await getSaleItemByAddrID(addr, momentIds[i])
            momentMetadataList.push(result);
        }

        return momentMetadataList;
    } catch (error) {
        console.log(error);
    }
}


// GET ALL SALE ITEMS 
export const getAllSaleItems = async () => {
    try {        
        const users = await getAllUsersAddr()
        const momentMetadataList = []

        let usrLen = users.length
        for(let user = 0; user < usrLen; user++) {
            const addr = users[user]

            const momentIds = await fcl.query({
                cadence: `${getSaleMomentIds}`,
                args: (arg, t) => [
                    arg(addr, types.Address),
                ],    
            })
    
            const len = momentIds.length;

            for(let i = 0; i < len; i++) {
                const result = await getSaleItemByAddrID(addr, momentIds[i])
                result["address"] = addr
                momentMetadataList.push(result);
            }
        }

        return momentMetadataList;
    } catch (error) {
        console.log(error);
    }
}


// GET SALE PRICE OF A MOMENT
export const getSalePriceById = async (sellerAddress="0x4e616c1e361b69d2", momentID=1) => {
    try {
        const result = await fcl.query({
            cadence: `${getSalePrice}`,
            args: (arg, t) => [
                arg(sellerAddress, types.Address),
                arg(momentID, types.UInt64)
            ],
        })
        return result;
    } catch (error) {
        console.log(error);
    }
}


// GET ALL PACKS
export const getAllPackIDs = async () => {
    try {
        const result = await fcl.query({
            cadence: `${getAllPacks}`
        })
        const len = result.length
        for(var i = 0; i < len; i++) {
            const obj = result[i]
            const packID = obj["packID"]
            const price = await getPackPriceById(AdminAccountAddress, packID)
            obj["price"] = price
        }
        return result;
    } catch (error) {
        console.log(error);
    }
}


// GET SALE PRICE OF A PACK
export const getPackPriceById = async (sellerAddress, packID) => {
    try {
        console.log(packID)
        const result = await fcl.query({
            cadence: `${getPackPrice}`,
            args: (arg, t) => [
                arg(sellerAddress, types.Address),
                arg(packID, types.UInt64)
            ],
        })
        return result;
    } catch (error) {
        console.log(error);
    }
}

// GET PACK PROOFS OF ADDR
export const getPackProofsByAddr = async (addr) => {
    try {
        const result = await fcl.query({
            cadence: `${getPackProofs}`,
            args: (arg, t) => [
                arg(addr, types.Address),
            ],
        })
        return result;
    } catch (error) {
        console.log(error);
    }
}