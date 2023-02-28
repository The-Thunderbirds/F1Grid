import PuddleV1 from 0xf8d6e0586b0a20c7

pub fun main(account: Address): [UInt64] {

    let collectionRef = getAccount(account).getCapability(/public/PuddleV1Collection).borrow<&{PuddleV1.PuddleV1CollectionPublic}>() ?? panic("Could not borrow a referrence to the PuddleV1 collection resource")

    log(collectionRef.getIDs())

    return collectionRef.getIDs()
}