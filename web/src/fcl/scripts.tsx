import * as fcl from "@onflow/fcl"
import * as types from "@onflow/types";

import { accountIsSetup } from "@/cadence/scripts/user/account_is_setup";
import { readAllSeries } from "@/cadence/scripts/admin/series/read_all_series";

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

export const getAllSeries = async () => {
    try {
        const result = await fcl.query({
            cadence: `${readAllSeries}`
        })
        return result;
    } catch (error) {
        console.log(error);
    }

}