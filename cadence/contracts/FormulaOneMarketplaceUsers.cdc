pub contract FormulaOneMarketPlaceUsers {
    pub var currentUsers: [Address]

    init() {
        self.currentUsers = []
    }

    pub fun addUser(addr: Address) {
        self.currentUsers.append(addr)
    }

    pub fun getAllUsers() : [Address] {
        return self.currentUsers
    }
}
