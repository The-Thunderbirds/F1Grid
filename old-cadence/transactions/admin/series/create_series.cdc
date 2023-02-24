import FormulaOne from 0x0337ac00e069d20a

transaction(name: String) {
    let admin: &FormulaOne.Admin

    prepare(signer: AuthAccount) {
        self.admin = signer.borrow<&FormulaOne.Admin>(from: FormulaOne.AdminStoragePath)
            ?? panic("Could not borrow a reference to the FormulaOne Admin capability")
    }

    execute {
        let id = self.admin.createSeries(
            name: name,
        )

        log("====================================")
        log("New Series: ".concat(name))
        log("SeriesID: ".concat(id.toString()))
        log("====================================")
    }
}