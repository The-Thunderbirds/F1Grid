import FormulaOneMarketPlaceUsers from 0xf8d6e0586b0a20c7

transaction(membershipDropID: UInt64) {

    prepare(acct: AuthAccount) {
        FormulaOneMarketPlaceUsers.closeMembershipDrop(membershipDropID: membershipDropID)
    }
}