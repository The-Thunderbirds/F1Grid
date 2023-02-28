import FormulaOneMarketPlaceUsers from 0xf8d6e0586b0a20c7

transaction(tier: String, deltaDeadline: UInt64, membersLimit: UInt64, metadata: {String: String}) {

    prepare(acct: AuthAccount) {
        FormulaOneMarketPlaceUsers.addMembershipDrop(tier: tier, deltaDeadline: deltaDeadline, membersLimit: membersLimit, metadata: metadata)
    }
}
 