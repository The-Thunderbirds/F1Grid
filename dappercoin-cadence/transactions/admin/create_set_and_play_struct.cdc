import FormulaOne from 0xf8d6e0586b0a20c7

transaction() {
    
    prepare(acct: AuthAccount) {

        let metadata: {String: String} = {"PlayType": "Shoe becomes untied"}

        let newPlay = FormulaOne.Play(metadata: metadata)

        let newSet = FormulaOne.SetData(name: "Sneaky Sneakers")
    }
}