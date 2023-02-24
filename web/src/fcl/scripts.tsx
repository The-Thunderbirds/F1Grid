import * as fcl from "@onflow/fcl"
import * as types from "@onflow/types";

import { accountIsSetup } from "@/cadence/scripts/user/account_is_setup";
import { getNextSetID } from "@/cadence/scripts/admin/set/get_nextSetID";
import { getSetData } from "@/cadence/scripts/admin/set/get_set_data";
import { getNextPlayID } from "@/cadence/scripts/admin/plays/get_nextPlayID";
import { getPlayMetadata } from "@/cadence/scripts/admin/plays/get_play_metadata";

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

export const getAllSets = async () => {
    try {        
        const num = await fcl.query({
            cadence: `${getNextSetID}`
        })
        console.log(num)

        const setDataList = []

        for(let i = 1; i < num; i++) {
            const result = await fcl.query({
                cadence: `${getSetData}`,
                args: (arg, t) => [
                    arg(i, types.UInt32),
                ],    
            })
            setDataList.push(result);
        }

        return setDataList;
    } catch (error) {
        console.log(error);
    }

}

export const getAllPlays = async () => {
    try {        
        const num = await fcl.query({
            cadence: `${getNextPlayID}`
        })
        console.log(num)

        const playMetadataList = []

        for(let i = 1; i < num; i++) {
            const result = await fcl.query({
                cadence: `${getPlayMetadata}`,
                args: (arg, t) => [
                    arg(i, types.UInt32),
                ],    
            })
            playMetadataList.push(result);
        }

        return playMetadataList;
    } catch (error) {
        console.log(error);
    }

}