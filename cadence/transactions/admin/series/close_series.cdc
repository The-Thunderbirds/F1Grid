import FormulaOne from 0xf8d6e0586b0a20c7

transaction(seriesID: UInt64) {
    let admin: &FormulaOne.Admin

    prepare(signer: AuthAccount) {
        self.admin = signer.borrow<&FormulaOne.Admin>(from: FormulaOne.AdminStoragePath)
            ?? panic("Could not borrow a reference to the FormulaOne Admin capability")
    }

    execute {
        let id = self.admin.closeSeries(id: seriesID)

        log("====================================")
        log("Closed Series:")
        log("SeriesID: ".concat(id.toString()))
        log("====================================")
    }
}
