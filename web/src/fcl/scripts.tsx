import * as fcl from "@onflow/fcl"
import * as types from "@onflow/types";

import { accountIsSetup } from "@/cadence/scripts/user/account_is_setup";
import { getNextSetID } from "@/cadence/scripts/admin/set/get_nextSetID";
import { getSetData } from "@/cadence/scripts/admin/set/get_set_data";
import { getNextPlayID } from "@/cadence/scripts/admin/plays/get_nextPlayID";
import { getPlayMetadata } from "@/cadence/scripts/admin/plays/get_play_metadata";
import { getCollectionIDs } from "@/cadence/scripts/admin/moments/get_collection_ids";
import { getMomentMetadata } from "@/cadence/scripts/admin/moments/get_metadata";

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

// GET ALL SETS
export const getAllSets = async () => {
    try {        
        const num = await fcl.query({
            cadence: `${getNextSetID}`
        })

        const setDataList = []

        for(let i = 1; i < num; i++) {
            const result = await fcl.query({
                cadence: `${getSetData}`,
                args: (arg, t) => [
                    arg(i, types.UInt32),
                ],    
            })

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


// GET ALL COLLECTIONS
export const getAllCollections = async (addr) => {
    try {        
        const moments = await getAllCollectionIDs(addr);
        const len = moments.length;
        const momentMetadataList = []

        for(let i = 0; i < len; i++) {
            const result = await fcl.query({
                cadence: `${getMomentMetadata}`,
                args: (arg, t) => [
                    arg(addr, types.Address),
                    arg(moments[i], types.UInt64),
                ],    
            })
            momentMetadataList.push(result);
        }

        return momentMetadataList;
    } catch (error) {
        console.log(error);
    }
}