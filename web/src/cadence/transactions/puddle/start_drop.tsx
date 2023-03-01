import { FormulaOneMarketPlaceUsers } from "src/constants";

export const startDrop =
`
import FormulaOneMarketPlaceUsers from ${FormulaOneMarketPlaceUsers}

transaction(tier: String, deltaDeadline: UInt64, membersLimit: UInt64, metadata: {String: String}) {

    prepare(acct: AuthAccount) {
        FormulaOneMarketPlaceUsers.addMembershipDrop(tier: tier, deltaDeadline: deltaDeadline, membersLimit: membersLimit, metadata: metadata)
    }
}
`