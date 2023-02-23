import FormulaOne from 0xf8d6e0586b0a20c7

transaction(
    seriesID: UInt64,
    setID: UInt64,
    playID: UInt64,
    tier: String,
    maxMintSize: UInt64?,
   ) {
    let admin: &FormulaOne.Admin

    prepare(signer: AuthAccount) {
        self.admin = signer.borrow<&FormulaOne.Admin>(from: FormulaOne.AdminStoragePath)
            ?? panic("Could not borrow a reference to the FormulaOne Admin capability")
    }

    execute {
        let id = self.admin.createEdition(
            seriesID: seriesID,
            setID: setID,
            playID: playID,
            maxMintSize: maxMintSize,
            tier: tier,
        )

        log("====================================")
        log("New Edition:")
        log("EditionID: ".concat(id.toString()))
        log("====================================")
    }
}