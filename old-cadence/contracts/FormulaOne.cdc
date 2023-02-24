import NonFungibleToken from "./utility/NonFungibleToken.cdc"
import FungibleToken from "./utility/FungibleToken.cdc"
import MetadataViews from "./utility/MetadataViews.cdc"

pub contract FormulaOne: NonFungibleToken {

    pub event ContractInitialized()

    pub event Withdraw(id: UInt64, from: Address?)
    pub event Deposit(id: UInt64, to: Address?)

    pub event SeriesCreated(id: UInt64, name: String)
    pub event SeriesClosed(id: UInt64)

    pub event SetCreated(id: UInt64, name: String)

    pub event PlayCreated(id: UInt64, classification: String, metadata: {String: String})

    pub event EditionCreated(
        id: UInt64, 
        seriesID: UInt64, 
        setID: UInt64, 
        playID: UInt64, 
        maxMintSize: UInt64?,
        tier: String,
    )
    pub event EditionClosed(id: UInt64)

    pub event MomentNFTMinted(id: UInt64, editionID: UInt64, serialNumber: UInt64)
    pub event MomentNFTBurned(id: UInt64)


    pub let CollectionStoragePath:  StoragePath
    pub let CollectionPublicPath:   PublicPath
    pub let AdminStoragePath:       StoragePath
    pub let MinterPrivatePath:      PrivatePath

    pub var totalSupply:        UInt64
    pub var nextSeriesID:       UInt64
    pub var nextSetID:          UInt64
    pub var nextPlayID:         UInt64
    pub var nextEditionID:      UInt64

    access(self) let seriesIDByName:    {String: UInt64}
    access(self) let seriesByID:        @{UInt64: Series}
    access(self) let setIDByName:       {String: UInt64}
    access(self) let setByID:           @{UInt64: Set}
    access(self) let playByID:          @{UInt64: Play}
    access(self) let editionByID:       @{UInt64: Edition}


    pub struct SeriesData {
        pub let id: UInt64
        pub let name: String
        pub let active: Bool

        init (id: UInt64) {
            if let series = &FormulaOne.seriesByID[id] as &FormulaOne.Series? {
                self.id = series.id
                self.name = series.name
                self.active = series.active
            } else {
                panic("series does not exist")
            }
        }
    }

    pub resource Series {
        pub let id: UInt64
        pub let name: String
        pub var active: Bool

        pub fun close() {
            pre {
                self.active == true: "not active"
            }
            self.active = false
            emit SeriesClosed(id: self.id)
        }

        init (name: String) {
            pre {
                !FormulaOne.seriesIDByName.containsKey(name): "A Series with that name already exists"
            }
            self.id = FormulaOne.nextSeriesID
            self.name = name
            self.active = true   
            FormulaOne.seriesIDByName[name] = self.id
            FormulaOne.nextSeriesID = self.id + 1 as UInt64
            emit SeriesCreated(id: self.id, name: self.name)
        }
    }

    pub fun getSeriesData(id: UInt64): FormulaOne.SeriesData {
        pre {
            FormulaOne.seriesByID[id] != nil: "Cannot borrow series, no such id"
        }
        return FormulaOne.SeriesData(id: id)
    }

    pub fun getSeriesDataByName(name: String): FormulaOne.SeriesData {
        pre {
            FormulaOne.seriesIDByName[name] != nil: "Cannot borrow series, no such name"
        }
        let id = FormulaOne.seriesIDByName[name]!
        return FormulaOne.SeriesData(id: id)
    }

    pub fun getAllSeriesNames(): [String] {
        return FormulaOne.seriesIDByName.keys
    }

    pub fun getSeriesIDByName(name: String): UInt64? {
        return FormulaOne.seriesIDByName[name]
    }


    pub struct SetData {
        pub let id: UInt64
        pub let name: String
        pub var setPlaysInEditions: {UInt64: Bool}

        pub fun setPlayExistsInEdition(playID: UInt64): Bool {
           return self.setPlaysInEditions.containsKey(playID)
        }

        init (id: UInt64) {
            if let set = &FormulaOne.setByID[id] as &FormulaOne.Set? {
            self.id = id
            self.name = set.name
            self.setPlaysInEditions = set.setPlaysInEditions
            } else {
               panic("set does not exist")
            }
        }
    }

    pub resource Set {
        pub let id: UInt64
        pub let name: String
        pub var setPlaysInEditions: {UInt64: Bool}

        pub fun insertNewPlay(playID: UInt64) {
            self.setPlaysInEditions[playID] = true
        }

        init (name: String) {
            pre {
                !FormulaOne.setIDByName.containsKey(name): "A Set with that name already exists"
            }
            self.id = FormulaOne.nextSetID
            self.name = name
            self.setPlaysInEditions = {}
            FormulaOne.setIDByName[name] = self.id
            FormulaOne.nextSetID = self.id + 1 as UInt64
            emit SetCreated(id: self.id, name: self.name)
        }
    }

    pub fun getSetData(id: UInt64): FormulaOne.SetData {
        pre {
            FormulaOne.setByID[id] != nil: "Cannot borrow set, no such id"
        }
        return FormulaOne.SetData(id: id)
    }

    pub fun getSetDataByName(name: String): FormulaOne.SetData {
        pre {
            FormulaOne.setIDByName[name] != nil: "Cannot borrow set, no such name"
        }
        let id = FormulaOne.setIDByName[name]!
        return FormulaOne.SetData(id: id)
    }

    pub fun getAllSetNames(): [String] {
        return FormulaOne.setIDByName.keys
    }


    pub struct PlayData {
        pub let id: UInt64
        pub let classification: String
        pub let metadata: {String: String}
        init (id: UInt64) {
            if let play = &FormulaOne.playByID[id] as &FormulaOne.Play? {
            self.id = id
            self.classification = play.classification
            self.metadata = play.metadata
            } else {
                panic("play does not exist")
            }
        }
    }

    pub resource Play {
        pub let id: UInt64
        pub let classification: String
        pub let metadata: {String: String}
        init (classification: String, metadata: {String: String}) {
            self.id = FormulaOne.nextPlayID
            self.classification = classification
            self.metadata = metadata
            FormulaOne.nextPlayID = self.id + 1 as UInt64
            emit PlayCreated(id: self.id, classification: self.classification, metadata: self.metadata)
        }
        access(contract) fun updateDescription(description: String) {
            self.metadata["description"] = description
        }
    }

    pub fun getPlayData(id: UInt64): FormulaOne.PlayData {
        pre {
            FormulaOne.playByID[id] != nil: "Cannot borrow play, no such id"
        }
        return FormulaOne.PlayData(id: id)
    }


    pub struct EditionData {
        pub let id: UInt64
        pub let seriesID: UInt64
        pub let setID: UInt64
        pub let playID: UInt64
        pub var maxMintSize: UInt64?
        pub let tier: String
        pub var numMinted: UInt64

        pub fun maxEditionMintSizeReached(): Bool {
            return self.numMinted == self.maxMintSize 
        }

        init (id: UInt64) {
           if let edition = &FormulaOne.editionByID[id] as &FormulaOne.Edition? {
            self.id = id
            self.seriesID = edition.seriesID
            self.playID = edition.playID
            self.setID = edition.setID
            self.maxMintSize = edition.maxMintSize
            self.tier = edition.tier
            self.numMinted = edition.numMinted
           } else {
               panic("edition does not exist")
           }
        }
    }

    pub resource Edition {
        pub let id: UInt64
        pub let seriesID: UInt64
        pub let setID: UInt64
        pub let playID: UInt64
        pub let tier: String
        pub var maxMintSize: UInt64?
        pub var numMinted: UInt64

        access(contract) fun close() {
            pre {
                self.numMinted != self.maxMintSize: "max number of minted moments has already been reached"
            }
            self.maxMintSize = self.numMinted
            emit EditionClosed(id: self.id)
        }

        pub fun mint(): @FormulaOne.NFT {
            pre {
                self.numMinted != self.maxMintSize: "max number of minted moments has been reached"
            }
            let momentNFT <- create NFT(
                id: FormulaOne.totalSupply + 1,
                editionID: self.id,
                serialNumber: self.numMinted + 1
            )
            FormulaOne.totalSupply = FormulaOne.totalSupply + 1
            self.numMinted = self.numMinted + 1 as UInt64
            return <- momentNFT
        }

        init (
            seriesID: UInt64,
            setID: UInt64,
            playID: UInt64,
            maxMintSize: UInt64?,
            tier: String,
        ) {
            pre {
                maxMintSize != 0: "max mint size is zero, must either be null or greater than 0"
                FormulaOne.seriesByID.containsKey(seriesID): "seriesID does not exist"
                FormulaOne.setByID.containsKey(setID): "setID does not exist"
                FormulaOne.playByID.containsKey(playID): "playID does not exist"
                SeriesData(id: seriesID).active == true: "cannot create an Edition with a closed Series"
                SetData(id: setID).setPlayExistsInEdition(playID: playID) != true: "set play combination already exists in an edition"
            }

            self.id = FormulaOne.nextEditionID
            self.seriesID = seriesID
            self.setID = setID
            self.playID = playID

            if maxMintSize == 0 {
                self.maxMintSize = nil
            } else {
                self.maxMintSize = maxMintSize
            }
            self.tier = tier
            self.numMinted = 0 as UInt64
            FormulaOne.nextEditionID = FormulaOne.nextEditionID + 1 as UInt64
            FormulaOne.setByID[setID]?.insertNewPlay(playID: playID)

            emit EditionCreated(
                id: self.id,
                seriesID: self.seriesID,
                setID: self.setID,
                playID: self.playID,
                maxMintSize: self.maxMintSize,
                tier: self.tier,
            )
        }
    }

    pub fun getEditionData(id: UInt64): EditionData {
        pre {
            FormulaOne.editionByID[id] != nil: "Cannot borrow edition, no such id"
        }

        return FormulaOne.EditionData(id: id)
    }


    pub resource NFT: NonFungibleToken.INFT, MetadataViews.Resolver {
        pub let id: UInt64
        pub let editionID: UInt64
        pub let serialNumber: UInt64
        pub let mintingDate: UFix64

        destroy() {
            emit MomentNFTBurned(id: self.id)
        }

        init(
            id: UInt64,
            editionID: UInt64,
            serialNumber: UInt64
        ) {
            pre {
                FormulaOne.editionByID[editionID] != nil: "no such editionID"
                EditionData(id: editionID).maxEditionMintSizeReached() != true: "max edition size already reached"
            }

            self.id = id
            self.editionID = editionID
            self.serialNumber = serialNumber
            self.mintingDate = getCurrentBlock().timestamp

            emit MomentNFTMinted(id: self.id, editionID: self.editionID, serialNumber: self.serialNumber)
        }

        pub fun getViews(): [Type] {
            return [
                Type<MetadataViews.Display>(),
                Type<MetadataViews.Editions>(),
                Type<MetadataViews.ExternalURL>(),
                Type<MetadataViews.Medias>(),
                Type<MetadataViews.NFTCollectionData>(),
                Type<MetadataViews.NFTCollectionDisplay>(),
                Type<MetadataViews.Royalties>(),
                Type<MetadataViews.Serial>(),
                Type<MetadataViews.Traits>()
            ]
        }

        pub fun resolveView(_ view: Type): AnyStruct? {
            switch view {
                case Type<MetadataViews.Display>():
                    return MetadataViews.Display(
                        name: self.getName(),
                        description: self.getDescription(),
                        thumbnail: MetadataViews.HTTPFile(url: self.getImage(imageType: "image", format: "jpeg", width: 256))
                    )
                case Type<MetadataViews.Editions>():
                    let editionList: [MetadataViews.Edition] = [self.getEditionInfo()]
                    return MetadataViews.Editions(
                        editionList
                    )
                case Type<MetadataViews.ExternalURL>():
                    return MetadataViews.ExternalURL("https://formulaone.com/moments/".concat(self.id.toString()))
                case Type<MetadataViews.Medias>():
                    return MetadataViews.Medias(
                        items: [
                            MetadataViews.Media(
                                file: MetadataViews.HTTPFile(url: self.getImage(imageType: "image", format: "jpeg", width: 512)),
                                mediaType: "image/jpeg"
                            ),
                            MetadataViews.Media(
                                file: MetadataViews.HTTPFile(url: self.getImage(imageType: "image-details", format: "jpeg", width: 512)),
                                mediaType: "image/jpeg"
                            ),
                            MetadataViews.Media(
                                file: MetadataViews.HTTPFile(url: self.getImage(imageType: "image-logo", format: "jpeg", width: 512)),
                                mediaType: "image/jpeg"
                            ),
                            MetadataViews.Media(
                                file: MetadataViews.HTTPFile(url: self.getImage(imageType: "image-legal", format: "jpeg", width: 512)),
                                mediaType: "image/jpeg"
                            ),
                            MetadataViews.Media(
                                file: MetadataViews.HTTPFile(url: self.getImage(imageType: "image-player", format: "jpeg", width: 512)),
                                mediaType: "image/jpeg"
                            ),
                            MetadataViews.Media(
                                file: MetadataViews.HTTPFile(url: self.getImage(imageType: "image-scores", format: "jpeg", width: 512)),
                                mediaType: "image/jpeg"
                            ),
                            MetadataViews.Media(
                                file: MetadataViews.HTTPFile(url: self.getVideo(videoType: "video")),
                                mediaType: "video/mp4"
                            ),
                            MetadataViews.Media(
                                file: MetadataViews.HTTPFile(url: self.getVideo(videoType: "video-idle")),
                                mediaType: "video/mp4"
                            )
                        ]
                    )
                case Type<MetadataViews.NFTCollectionData>():
                    return MetadataViews.NFTCollectionData(
                        storagePath: /storage/FormulaOneNFTCollection,
                        publicPath: /public/FormulaOneNFTCollection,
                        providerPath: /private/FormulaOneNFTCollection,
                        publicCollection: Type<&FormulaOne.Collection{FormulaOne.MomentNFTCollectionPublic}>(),
                        publicLinkedType: Type<&FormulaOne.Collection{FormulaOne.MomentNFTCollectionPublic,NonFungibleToken.Receiver,NonFungibleToken.CollectionPublic,MetadataViews.ResolverCollection}>(),
                        providerLinkedType: Type<&FormulaOne.Collection{NonFungibleToken.Provider,FormulaOne.MomentNFTCollectionPublic,NonFungibleToken.Receiver,NonFungibleToken.CollectionPublic,MetadataViews.ResolverCollection}>(),
                        createEmptyCollectionFunction: (fun (): @NonFungibleToken.Collection {
                            return <-FormulaOne.createEmptyCollection()
                        })
                    )
                case Type<MetadataViews.NFTCollectionDisplay>():
                    let bannerImage = MetadataViews.Media(
                        file: MetadataViews.HTTPFile(
                            url: "https://assets.formulaone.com/flow/catalogue/AD_BANNER.png"
                        ),
                        mediaType: "image/png"
                    )
                    let squareImage = MetadataViews.Media(
                        file: MetadataViews.HTTPFile(
                            url: "https://assets.formulaone.com/flow/catalogue/AD_SQUARE.png"
                        ),
                        mediaType: "image/png"
                    )
                    return MetadataViews.NFTCollectionDisplay(
                        name: "Formula One",
                        description: "Officially Licensed Digital Collectibles Featuring the Formula One's Best Highlights. Buy, Sell and Collect Your Favorite Formula One Moments",
                        externalURL: MetadataViews.ExternalURL("https://formulaone.com/"),
                        squareImage: squareImage,
                        bannerImage: bannerImage,
                        socials: {
                            "instagram": MetadataViews.ExternalURL("https://www.instagram.com/_gsri30_/"),
                            "twitter": MetadataViews.ExternalURL("https://twitter.com/SriHarshaG6"),
                            "discord": MetadataViews.ExternalURL("https://discord.com/")
                        }
                    )
                case Type<MetadataViews.Royalties>():
                    let royaltyReceiver: Capability<&{FungibleToken.Receiver}> =
                        getAccount(0xf8d6e0586b0a20c7).getCapability<&AnyResource{FungibleToken.Receiver}>(MetadataViews.getRoyaltyReceiverPublicPath())
                    return MetadataViews.Royalties(
                        royalties: [
                            MetadataViews.Royalty(
                                receiver: royaltyReceiver,
                                cut: 0.05,
                                description: "Formula One marketplace royalty"
                            )
                        ]
                    )
                case Type<MetadataViews.Serial>():
                    return MetadataViews.Serial(self.serialNumber)
                case Type<MetadataViews.Traits>():
                    let excludedNames: [String] = []
                    let fullDictionary = self.getTraits()
                    return MetadataViews.dictToTraits(dict: fullDictionary, excludedNames: excludedNames)
            }
            return nil
        }

        pub fun getName(): String {
            let edition: EditionData = FormulaOne.getEditionData(id: self.editionID)
            let play: PlayData = FormulaOne.getPlayData(id: edition.playID)
            let firstName: String = play.metadata["playerFirstName"] ?? ""
            let lastName: String = play.metadata["playerLastName"] ?? ""
            let playType: String = play.metadata["playType"] ?? ""
            return firstName.concat(" ").concat(lastName).concat(" ").concat(playType)
        }

        pub fun getDescription(): String {
            let edition: EditionData = FormulaOne.getEditionData(id: self.editionID)
            let play: PlayData = FormulaOne.getPlayData(id: edition.playID)
            let description: String = play.metadata["description"] ?? ""
            if description != "" {
                return description
            }

            let series: SeriesData = FormulaOne.getSeriesData(id: edition.seriesID)
            let set: SetData = FormulaOne.getSetData(id: edition.setID)
            return series.name.concat(" ").concat(set.name).concat(" moment with serial number ").concat(self.serialNumber.toString())
        }

        pub fun assetPath(): String {
            return "https://media.formulaone.com/editions/".concat(self.editionID.toString()).concat("/media/")
        }

        pub fun getImage(imageType: String, format: String, width: Int): String {
            return self.assetPath().concat(imageType).concat("?format=").concat(format).concat("&width=").concat(width.toString())
        }

        pub fun getVideo(videoType: String): String {
            return self.assetPath().concat(videoType)
        }

        pub fun getMomentURL(): String {
            return "https://formulaone.com/moments/".concat(self.id.toString())
        }

         pub fun getEditionInfo() : MetadataViews.Edition {
            let edition: EditionData = FormulaOne.getEditionData(id: self.editionID)
            let set: SetData = FormulaOne.getSetData(id: edition.setID)
            let name: String = set.name.concat(": #").concat(edition.playID.toString())

            return MetadataViews.Edition(name: name, number: UInt64(self.serialNumber), max: edition.maxMintSize ?? nil)
        }

        pub fun getTraits() : {String: AnyStruct} {
            let edition: EditionData = FormulaOne.getEditionData(id: self.editionID)
            let play: PlayData = FormulaOne.getPlayData(id: edition.playID)
            let series: SeriesData = FormulaOne.getSeriesData(id: edition.seriesID)
            let set: SetData = FormulaOne.getSetData(id: edition.setID)

            let traitDictionary: {String: AnyStruct} = {
                "editionTier": edition.tier,
                "seriesName": series.name,
                "setName": set.name,
                "serialNumber": self.serialNumber
            }

            for name in play.metadata.keys {
                let value = play.metadata[name] ?? ""
                if value != "" {
                    traitDictionary.insert(key: name, value)
                }
            }
            return traitDictionary
        }
    }


    pub resource interface MomentNFTCollectionPublic {
        pub fun deposit(token: @NonFungibleToken.NFT)
        pub fun batchDeposit(tokens: @NonFungibleToken.Collection)
        pub fun getIDs(): [UInt64]
        pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT
        pub fun borrowMomentNFT(id: UInt64): &FormulaOne.NFT? {
            post {
                (result == nil) || (result?.id == id): 
                    "Cannot borrow Moment NFT reference: The ID of the returned reference is incorrect"
            }
        }
    }

    pub resource Collection:
        NonFungibleToken.Provider,
        NonFungibleToken.Receiver,
        NonFungibleToken.CollectionPublic,
        MomentNFTCollectionPublic,
        MetadataViews.ResolverCollection
    {
        pub var ownedNFTs: @{UInt64: NonFungibleToken.NFT}

        pub fun withdraw(withdrawID: UInt64): @NonFungibleToken.NFT {
            let token <- self.ownedNFTs.remove(key: withdrawID) ?? panic("missing NFT")

            emit Withdraw(id: token.id, from: self.owner?.address)

            return <-token
        }

        pub fun deposit(token: @NonFungibleToken.NFT) {
            let token <- token as! @FormulaOne.NFT
            let id: UInt64 = token.id
            let oldToken <- self.ownedNFTs[id] <- token

            emit Deposit(id: id, to: self.owner?.address)

            destroy oldToken
        }

        pub fun batchDeposit(tokens: @NonFungibleToken.Collection) {
            let keys = tokens.getIDs()
            for key in keys {
                self.deposit(token: <-tokens.withdraw(withdrawID: key))
            }
            destroy tokens
        }

        pub fun getIDs(): [UInt64] {
            return self.ownedNFTs.keys
        }

        pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT {
            pre {
                self.ownedNFTs[id] != nil: "Cannot borrow NFT, no such id"
            }

            return (&self.ownedNFTs[id] as &NonFungibleToken.NFT?)!
        }

        pub fun borrowMomentNFT(id: UInt64): &FormulaOne.NFT? {
            if self.ownedNFTs[id] != nil {
                if let ref = &self.ownedNFTs[id] as auth &NonFungibleToken.NFT? {
                    return ref! as! &FormulaOne.NFT
                }
                return nil
            } else {
                return nil
            }
        }

        pub fun borrowViewResolver(id: UInt64): &AnyResource{MetadataViews.Resolver} {
            let nft = (&self.ownedNFTs[id] as auth &NonFungibleToken.NFT?)!
            let FormulaOneNFT = nft as! &FormulaOne.NFT
            return FormulaOneNFT as &AnyResource{MetadataViews.Resolver}
        }

        destroy() {
            destroy self.ownedNFTs
        }

        init() {
            self.ownedNFTs <- {}
        }
    }

    pub fun createEmptyCollection(): @NonFungibleToken.Collection {
        return <- create Collection()
    }

    
    pub resource interface NFTMinter {
        pub fun mintNFT(editionID: UInt64): @FormulaOne.NFT
    }

    pub resource Admin: NFTMinter {
        pub fun borrowSeries(id: UInt64): &FormulaOne.Series {
            pre {
                FormulaOne.seriesByID[id] != nil: "Cannot borrow series, no such id"
            }

            return (&FormulaOne.seriesByID[id] as &FormulaOne.Series?)!
        }

        pub fun borrowSet(id: UInt64): &FormulaOne.Set {
            pre {
                FormulaOne.setByID[id] != nil: "Cannot borrow Set, no such id"
            }

            return (&FormulaOne.setByID[id] as &FormulaOne.Set?)!
        }

        pub fun borrowPlay(id: UInt64): &FormulaOne.Play {
            pre {
                FormulaOne.playByID[id] != nil: "Cannot borrow Play, no such id"
            }

            return (&FormulaOne.playByID[id] as &FormulaOne.Play?)!
        }

        pub fun borrowEdition(id: UInt64): &FormulaOne.Edition {
            pre {
                FormulaOne.editionByID[id] != nil: "Cannot borrow edition, no such id"
            }

            return (&FormulaOne.editionByID[id] as &FormulaOne.Edition?)!
        }

        pub fun createSeries(name: String): UInt64 {
            let series <- create FormulaOne.Series(
                name: name,
            )
            let seriesID = series.id
            FormulaOne.seriesByID[series.id] <-! series
            return seriesID
        }
        
        pub fun closeSeries(id: UInt64): UInt64 {
            if let series = &FormulaOne.seriesByID[id] as &FormulaOne.Series? {
                series.close()
                return series.id
            }
            panic("series does not exist")
        }

        pub fun createSet(name: String): UInt64 {
            let set <- create FormulaOne.Set(
                name: name,
            )
            let setID = set.id
            FormulaOne.setByID[set.id] <-! set
            return setID
        }

        pub fun createPlay(classification: String, metadata: {String: String}): UInt64 {
            let play <- create FormulaOne.Play(
                classification: classification,
                metadata: metadata,
            )
            let playID = play.id
            FormulaOne.playByID[play.id] <-! play
            return playID
        }

        pub fun updatePlayDescription(playID: UInt64, description: String): Bool {
            if let play = &FormulaOne.playByID[playID] as &FormulaOne.Play? {
                play.updateDescription(description: description)
            } else {
                panic("play does not exist")
            }
            return true
        }

        pub fun createEdition(            
            seriesID: UInt64,
            setID: UInt64,
            playID: UInt64,
            maxMintSize: UInt64?,
            tier: String): UInt64 {
            let edition <- create Edition(
                seriesID: seriesID,
                setID: setID,
                playID: playID,
                maxMintSize: maxMintSize,
                tier: tier,
            )
            let editionID = edition.id
            FormulaOne.editionByID[edition.id] <-! edition

            return editionID
        }

        pub fun closeEdition(id: UInt64): UInt64 {
            if let edition = &FormulaOne.editionByID[id] as &FormulaOne.Edition? {
                edition.close()
                return edition.id
            }
            panic("edition does not exist")
        }

        pub fun mintNFT(editionID: UInt64): @FormulaOne.NFT {
            pre {
                FormulaOne.editionByID.containsKey(editionID): "No such EditionID"
            }
            return <- self.borrowEdition(id: editionID).mint()
        }
    }

    init() {
        self.CollectionStoragePath = /storage/FormulaOneNFTCollection
        self.CollectionPublicPath = /public/FormulaOneNFTCollection
        self.AdminStoragePath = /storage/FormulaOneAdmin
        self.MinterPrivatePath = /private/FormulaOneMinter

        self.totalSupply = 0
        self.nextSeriesID = 1
        self.nextSetID = 1
        self.nextPlayID = 1
        self.nextEditionID = 1

        self.seriesByID <- {}
        self.seriesIDByName = {}
        self.setIDByName = {}
        self.setByID <- {}
        self.playByID <- {}
        self.editionByID <- {}

        let admin <- create Admin()
        self.account.save(<-admin, to: self.AdminStoragePath)
        self.account.link<&FormulaOne.Admin{FormulaOne.NFTMinter}>(
            self.MinterPrivatePath,
            target: self.AdminStoragePath
        )
        emit ContractInitialized()
    }
}
 