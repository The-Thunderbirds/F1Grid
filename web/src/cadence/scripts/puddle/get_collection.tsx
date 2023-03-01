import {FormulaOneMarket, FormulaOneMarketPlaceUsers, PuddleV1} from "@/constants";

export const getPuddleCollection = 
`
import PuddleV1 from ${PuddleV1}

pub fun main(account: Address): [UInt64] {

    let collectionRef = getAccount(account).getCapability(/public/PuddleV1Collection).borrow<&{PuddleV1.PuddleV1CollectionPublic}>() ?? panic("Could not borrow a referrence to the PuddleV1 collection resource")

    return collectionRef.getIDs()
}
`