/*
    FormulaOnePacks.cdc

    Description: Contract definitions for users to sell their moments as packs

    FormulaOnePacks is where users can create a pack collection that they
    store in their account storage. In the pack collection, 
    they can put their NFTs up for sale in a pack with a price and publish a 
    reference so that others can see the sale.

    If another user sees a Pack that they want to buy,
    they can send fungible tokens that equal or exceed the buy price
    to buy the Pack. The Pack Proof is transferred to them when
    they make the purchase.
    Now user can use send this Pack proof any time back to unveil their random NFTs.
    The Moments are transferred to them when they unveil the pack.

    Each user who wants to sell packs will have a pack collection 
    instance in their account that holds the tokens that they are putting up for sale

    They can give a reference to this collection to a central contract
    so that it can list the sales in a central place
*/

import FungibleToken from "./utility/FungibleToken.cdc"
import NonFungibleToken from "./utility/NonFungibleToken.cdc"
import FormulaOne from "./FormulaOne.cdc"
import PRNG from "./utility/PRNG.cdc"

pub contract FormulaOnePacks {

    // -----------------------------------------------------------------------
    // FormulaOne Packs contract 
    // -----------------------------------------------------------------------

    // Variable size dictionary of Pack structs
    access(self) var packDatas: {UInt64: Pack}

    // Variable size dictionary of Pack structs
    access(self) var packProofDatas: @{UInt64: PackProof}

    // The ID that is used to create Packs 
    // Every time a Pack is created, packID is assigned 
    // to the new Pack's ID and then is incremented by 1.
    pub var nextPackID: UInt64

    // The ID that is used to create Pack Proofs 
    // Every time a Pack Proof is created, packProofID is assigned 
    // to the new PackProof's ID and then is incremented by 1.
    pub var nextPackProofID: UInt64

    pub struct Pack {
        // The unique ID for the Pack
        pub let packID: UInt64
        // Stores all the potential moment ids
        pub var moments: [UInt64]
        // Number of items to unpack while unveiling
        pub let momentsPerPack: UInt64
        // Number of Moments sold
        pub var momentsSold: UInt64
        // Number of Moments while pack creation
        pub var totalMoments: UInt64
        // Number of Moments sold
        pub var soldComplete: Bool
        // Pack Owner
        pub let owner: Address

        pub let seedBlock: UInt64

        init(moments: [UInt64], momentsPerPack: UInt64, owner: Address) {
            self.packID = FormulaOnePacks.nextPackID
            self.moments = moments
            self.totalMoments = UInt64(moments.length)
            self.momentsPerPack = momentsPerPack
            self.seedBlock = getCurrentBlock().height + 1
            self.momentsSold = 0
            self.soldComplete = false
            self.owner = owner
        }

        pub fun removeMoment(idx: UInt64) {
            self.moments.remove(at: idx)
        }

        pub fun sellOnePack() {
            pre {
                !self.soldComplete :
                    "Maximum number of packs sold already"
            }
            self.momentsSold = self.momentsSold + self.momentsPerPack
            if(self.momentsSold >= self.totalMoments) {
                self.soldComplete = true
            }
        }
    }

    pub fun getPackMoments(packID: UInt64): [UInt64]? {
        return self.packDatas[packID]?.moments
    }

    pub fun getMomentsPerPackByID(packID: UInt64): UInt64? {
        return self.packDatas[packID]?.momentsPerPack
    }

    // getAllPacks returns all the packs in FormulaOnePacks
    //
    // Returns: An array of all the packs that have been created
    pub fun getAllPacks(): [FormulaOnePacks.Pack] {
        return FormulaOnePacks.packDatas.values
    }

    // PacksPublic 
    //
    // The interface that a user can publish a capability to their packs
    // to allow others to access their packs
    pub resource interface PacksPublic {
        pub fun unveilPack(packID: UInt64, packProof: @FormulaOnePacks.PackProof): @[FormulaOne.NFT]
        pub fun purchase(packID: UInt64, buyTokens: @FungibleToken.Vault): @FormulaOnePacks.PackProof
        pub fun getPrice(packID: UInt64): UFix64?
        pub fun getIDs(): [UInt64]
        pub fun borrowMoment(id: UInt64): &FormulaOne.NFT? {
            // If the result isn't nil, the id of the returned reference
            // should be the same as the argument to the function
            post {
                (result == nil) || (result?.id == id): 
                    "Cannot borrow Moment reference: The ID of the returned reference is incorrect"
            }
        }
    }

    // PacksCollection
    //
    // This is the main resource that token sellers will store in their account
    // to manage the NFTs that they are selling. The SaleCollection
    // holds a FormulaOne Collection resource to store the moments that are for sale.
    // The SaleCollection also keeps track of the price of each token.
    // 
    // When a token is purchased, a cut is taken from the tokens
    // and sent to the beneficiary, then the rest are sent to the seller.
    //
    // The seller chooses who the beneficiary is and what percentage
    // of the tokens gets taken from the purchase
    pub resource PacksCollection: PacksPublic {

        // A collection of the moments that the user has for sale
        access(self) var forSale: @FormulaOne.Collection

        // Dictionary of the low low prices for each NFT by ID
        access(self) var prices: {UInt64: UFix64}

        // The fungible token vault of the seller
        // so that when someone buys a token, the tokens are deposited
        // to this Vault
        access(self) var ownerCapability: Capability


        init (ownerCapability: Capability) {
            pre {
                // Check that capabilities are for fungible token Vault receivers
                ownerCapability.borrow<&{FungibleToken.Receiver}>() != nil: 
                    "Owner's Receiver Capability is invalid!"
            }
            
            // create an empty collection to store the moments that are for sale
            self.forSale <- FormulaOne.createEmptyCollection() as! @FormulaOne.Collection
            self.ownerCapability = ownerCapability
            // prices are initially empty because there are no moments for sale
            self.prices = {}
        }

        pub fun createPack(tokens: @FormulaOne.Collection, momentsPerPack: UInt64, price: UFix64, owner: Address): UInt64 {
            let keys = tokens.getIDs()

            let newPack = Pack(moments: keys, momentsPerPack: momentsPerPack, owner: owner)
            let packID = newPack.packID
            FormulaOnePacks.nextPackID = FormulaOnePacks.nextPackID + 1

            FormulaOnePacks.packDatas[packID] = newPack
            // Store it in the contract storage
            // Set the pack's price
            self.prices[packID] = price

            // Deposit the token into the sale collection
            self.forSale.batchDeposit(tokens: <-tokens)
            return packID
        }

        pub fun unveilPack(packID: UInt64, packProof: @FormulaOnePacks.PackProof): @[FormulaOne.NFT] {
            pre {
                // Check that capabilities are for fungible token Vault receivers
                packProof.packID == packID: 
                    "Pack Proof does not match with pack id"
            }
            destroy packProof

            let pack = FormulaOnePacks.packDatas.remove(key: packID) ??
                panic("No Pack With the gived Id exists")

            let numItems = pack.momentsPerPack

            var i: UInt64 = 0
            let tokens: @[FormulaOne.NFT] <- []

            let rng <- PRNG.createFrom(blockHeight: pack.seedBlock, uuid: packID)
            while i < numItems {
                let weights: [UInt256] = []
                let length: UInt64 = UInt64(pack.moments.length)
                var j: UInt64 = 0
                while j < length {
                    weights.append(100)
                    j = j + 1
                }

                let tokenID = (rng.pickWeighted(
                            pack.moments,
                            weights
                ) as! UInt64)
                let token <- self.forSale.withdraw(withdrawID: tokenID) as! @FormulaOne.NFT
                tokens.append(<-token) 

                var idx: UInt64 = 0
                while idx < length {
                    if(pack.moments[idx] == tokenID) {
                        pack.removeMoment(idx: idx)
                        break
                    }
                    idx = idx + 1
                }

                i = i + 1
            }
            destroy rng

            FormulaOnePacks.packDatas.insert(key: packID, pack)

            // Return the withdrawn tokens
            return <-tokens
        }

        // purchase lets a user send tokens to purchase a Pack that is for sale
        // the purchased Pack proof is returned to the transaction context that called it
        //
        // Parameters: packID: the ID of the pack to purchase
        //             buyTokens: the fungible tokens that are used to buy the NFT
        //
        // Returns: @FormulaOnePacks.PackProof: proof of the purchased pack
        pub fun purchase(packID: UInt64, buyTokens: @FungibleToken.Vault): @FormulaOnePacks.PackProof {
            pre {
                self.prices[packID] != nil:
                    "No pack matching this ID for sale!"           
                buyTokens.balance == (self.prices[packID] ?? UFix64(0)):
                    "Not enough tokens to buy the Pack!"
                FormulaOnePacks.packDatas[packID] != nil:
                    "No pack matching this ID for sale!" 
            }

            // Read the price for the token
            let price = self.prices[packID]!

            // Deposit the tokens into the owners vault
            self.ownerCapability.borrow<&{FungibleToken.Receiver}>()!
                .deposit(from: <-buyTokens)

            FormulaOnePacks.packDatas[packID]?.sellOnePack()

            return <- create PackProof(packID: packID)
       }

        pub fun gift(packID: UInt64): @FormulaOnePacks.PackProof {
            pre {
                self.prices[packID] != nil:
                    "No pack matching this ID for sale!"           
                FormulaOnePacks.packDatas[packID] != nil:
                    "No pack matching this ID for sale!"           
            }

            FormulaOnePacks.packDatas[packID]?.sellOnePack()

            return <- create PackProof(packID: packID)
       }

        // getPrice returns the price of a specific pack in the sale
        // 
        // Parameters: packID: The ID of the Pack whose price to get
        //
        // Returns: UFix64: The price of the pack
        pub fun getPrice(packID: UInt64): UFix64? {
            return self.prices[packID]
        }

        // getIDs returns an array of token IDs that are in packs
        pub fun getIDs(): [UInt64] {
            return self.forSale.getIDs()
        }

        // borrowMoment Returns a borrowed reference to a Moment in the collection
        // so that the caller can read data from it
        //
        // Parameters: id: The ID of the moment to borrow a reference to
        //
        // Returns: &FormulaOne.NFT? Optional reference to a moment for sale 
        //                        so that the caller can read its data
        //
        pub fun borrowMoment(id: UInt64): &FormulaOne.NFT? {
            let ref = self.forSale.borrowMoment(id: id)
            return ref
        }

        // If the pack collection is destroyed, 
        // destroy the tokens that are for sale inside of it
        destroy() {
            destroy self.forSale
        }
    }

    // createPacksCollection returns a new packs collection resource to the caller
    pub fun createPacksCollection(ownerCapability: Capability): @PacksCollection {
        return <- create PacksCollection(ownerCapability: ownerCapability)
    }


    pub resource interface PackProofPublic {
        pub fun getIDs(): [UInt64]
        pub fun deposit(token: @FormulaOnePacks.PackProof)
        pub fun borrowPackProof(id: UInt64): &FormulaOnePacks.PackProof
    }

    pub resource PackProofCollection: PackProofPublic {
        pub var ownedPackProofs: @{UInt64: PackProof}

        init() {
            self.ownedPackProofs <- {}
        }

        // getIDs returns an array of the IDs that are in the Pack Proof Collection
        pub fun getIDs(): [UInt64] {
            return self.ownedPackProofs.keys
        }

        pub fun deposit(token: @FormulaOnePacks.PackProof) {
            let id = token.id
            self.ownedPackProofs[id] <-! token
        }

        pub fun withdraw(withdrawID: UInt64): @FormulaOnePacks.PackProof {
            // Remove the pack proof from the Collection
            let token <- self.ownedPackProofs.remove(key: withdrawID) 
                ?? panic("Cannot withdraw: Pack Proof does not exist in the collection")
            
            // Return the withdrawn token
            return <-token
        }


        pub fun borrowPackProof(id: UInt64): &FormulaOnePacks.PackProof {
            return (&self.ownedPackProofs[id] as &FormulaOnePacks.PackProof?)!
        }

        destroy () {
            destroy self.ownedPackProofs
        }
    }

    pub resource PackProof {
        pub let id: UInt64
        pub let packID: UInt64
        
        init(packID: UInt64) {
            self.id = FormulaOnePacks.nextPackProofID
            FormulaOnePacks.nextPackProofID = FormulaOnePacks.nextPackProofID + 1
            self.packID = packID
        }
    }

    pub fun createPackProofCollection(): @PackProofCollection {
        return <- create PackProofCollection()
    }

    // -----------------------------------------------------------------------
    // FormulaOnePacks initialization function
    // -----------------------------------------------------------------------
    //
    init() {
        // Initialize contract fields
        self.packDatas = {}
        self.nextPackID = 1
        self.nextPackProofID = 1
        self.packProofDatas <- {}
    }

}
 