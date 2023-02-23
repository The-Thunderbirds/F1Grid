import FormulaOne from 0xf8d6e0586b0a20c7

transaction(playID: UInt64, description: String) {
    let admin: &FormulaOne.Admin

    prepare(signer: AuthAccount) {
        self.admin = signer.borrow<&FormulaOne.Admin>(from: FormulaOne.AdminStoragePath)
            ?? panic("Could not borrow a reference to the FormulaOne Admin capability")
    }
    
    execute {
        let id = self.admin.updatePlayDescription(
            playID: playID,
            description: description
        )
    }

    post {
        FormulaOne.getPlayData(id: playID).metadata["description"] == description :
            "play description update failed"
    }
}