import PuddleV1 from 0xf8d6e0586b0a20c7

// Check to see if an account looks like it has been set up to hold PuddleV1 Collection.
pub fun main(address: Address): Bool {
    let account = getAccount(address)
    return account.getCapability(/public/PuddleV1Collection).borrow<&{PuddleV1.PuddleV1CollectionPublic}>() != nil
}