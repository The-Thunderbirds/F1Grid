import FormulaOne from 0xf8d6e0586b0a20c7

transaction(packID: UInt64) {

    execute {

        // Create a play with the specified metadata
        FormulaOne.createPack(moments: moments, numItems: numItems)
    }

    post {
        
        FormulaOne.getPackMoments(packID: self.currPackID) != nil:
            "packID doesnt exist"
    }

}