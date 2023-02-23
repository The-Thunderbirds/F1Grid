import FormulaOne from 0xf8d6e0586b0a20c7

transaction(
    name: String,
    metadata: {String: String}
   ) {
    let admin: &FormulaOne.Admin

    prepare(signer: AuthAccount) {
        self.admin = signer.borrow<&FormulaOne.Admin>(from: FormulaOne.AdminStoragePath)
            ?? panic("Could not borrow a reference to the FormulaOne Admin capability")
    }

    execute {
        let id = self.admin.createPlay(
            classification: name,
            metadata: metadata
        )

        log("====================================")
        log("New Play:")
        log("PlayID: ".concat(id.toString()))
        log("====================================")
    }
}