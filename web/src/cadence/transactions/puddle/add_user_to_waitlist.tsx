import { NonFungibleToken, FormulaOne, MetadataViews, FormulaOneMarket, FormulaOnePacks, FormulaOneMarketPlaceUsers, PuddleV1 } from "src/constants";

export const addUserToWaitlist =
`
import FormulaOneMarketPlaceUsers from ${FormulaOneMarketPlaceUsers}

transaction(membershipDropID: UInt64, address: Address) {

    prepare(acct: AuthAccount) {
        FormulaOneMarketPlaceUsers.addUserToWaitlist(membershipDropID: membershipDropID, address: address)
    }
}
`