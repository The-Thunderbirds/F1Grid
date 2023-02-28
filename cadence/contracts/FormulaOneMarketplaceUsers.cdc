pub contract FormulaOneMarketPlaceUsers {
    pub var currentUsers: [Address]
    pub var membershipDrop: {UInt64: Drop}
    pub var membershipWaitlist: {UInt64: [Address]}
    pub var nextDropID: UInt64

    init() {
        self.currentUsers = []
        self.membershipDrop = {}
        self.membershipWaitlist = {}
        self.nextDropID = 0
    }

    pub struct Drop {
        pub let id: UInt64
        pub let tier: String
        pub let deltaDeadline: UInt64
        pub let membersLimit: UInt64
        pub var isActive: Bool
        pub let metadata: {String: String}

        init(tier: String, deltaDeadline: UInt64, membersLimit: UInt64, metadata: {String: String}){
            pre {
                membersLimit > 0: "Limit should be a positive input"
            }
            self.id = FormulaOneMarketPlaceUsers.nextDropID
            self.tier = tier
            self.deltaDeadline = deltaDeadline
            self.membersLimit = membersLimit
            self.isActive = true
            self.metadata = metadata
            FormulaOneMarketPlaceUsers.nextDropID = FormulaOneMarketPlaceUsers.nextDropID + 1
        }

        pub fun close(){
            self.isActive = false
        }
    }

    pub fun addUser(addr: Address) {
        self.currentUsers.append(addr)
    }

    pub fun getAllUsers() : [Address] {
        return self.currentUsers
    }

    pub fun addMembershipDrop(tier: String, deltaDeadline: UInt64, membersLimit: UInt64, metadata: {String: String}) {
        let drop: Drop = Drop(
            tier: tier,
            deltaDeadline: deltaDeadline,
            membersLimit: membersLimit,
            metadata: metadata
        )
        self.membershipDrop[drop.id] = drop
        self.membershipWaitlist[drop.id] = []
    }

    pub fun closeMembershipDrop(membershipDropID: UInt64){
        pre {
            self.membershipDrop[membershipDropID] != nil: "No drop with the mentioned id"
        }

        self.membershipDrop[membershipDropID]?.close()
    }

    pub fun addUserToWaitlist(membershipDropID: UInt64, address: Address) {
        pre {
            self.membershipDrop[membershipDropID] != nil: "No drop with the mentioned id"
        }
        self.membershipWaitlist[membershipDropID]?.append(address)
    }

    pub fun getDrops(): {UInt64: FormulaOneMarketPlaceUsers.Drop} {
        return self.membershipDrop
    }

    pub fun getDrop(id: UInt64): FormulaOneMarketPlaceUsers.Drop? {
        pre {
            self.membershipDrop[id] != nil: "No drop with the mentioned id"
        }
        return self.membershipDrop[id]
    }

    pub fun getDropWaitlists(): {UInt64: [Address]} {
        return self.membershipWaitlist
    }

    pub fun getDropWaitlist(id: UInt64): [Address]? {
        pre {
            self.membershipWaitlist[id] != nil: "No drop waitlist with the mentioned id"
        }
        return self.membershipWaitlist[id]
    }

    pub fun getTotalDrops(): UInt64 {
        return self.nextDropID
    }
}
 