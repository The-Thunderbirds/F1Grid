import FormulaOne from 0xf8d6e0586b0a20c7

transaction(moments: [UInt64], numItems: UInt64) {

    let currPackID: UInt64

    prepare(acct: AuthAccount) {

        // borrow a reference to the admin resource
        self.currPackID = FormulaOne.nextPackID;
    }


    execute {

        // Create a play with the specified metadata
        FormulaOne.createPack(moments: moments, numItems: numItems)
    }

    post {
        
        FormulaOne.getPackMoments(packID: self.currPackID) != nil:
            "packID doesnt exist"
    }

}