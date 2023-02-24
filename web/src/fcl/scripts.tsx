import * as fcl from "@onflow/fcl"
import * as types from "@onflow/types";

import { accountIsSetup } from "@/cadence/scripts/user/account_is_setup";
import { getNextSetID } from "@/cadence/scripts/admin/set/get_nextSetID";
import { getSetData } from "@/cadence/scripts/admin/set/get_set_data";

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