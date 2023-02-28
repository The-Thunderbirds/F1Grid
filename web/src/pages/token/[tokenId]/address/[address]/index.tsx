import React, { useEffect, useState } from "react";

import CommonSection from "@/components/ui/Common-section/CommonSection";
import { Container, Row, Col, Spinner } from "reactstrap";
import { NFT__DATA } from "@/assets/data/data";
import Link from "next/link";
import Image from "next/image"
import { useRouter } from 'next/router'
import ReactStars from 'react-stars'
import { getSaleItemByAddrID } from "@/fcl/scripts";
import { _purchaseMoment } from "@/fcl/transactions";
import { AdminAccountAddress } from "@/constants"
import styles from "@/styles/Token.module.css"
import PageLoader from "@/components/ui/PageLoader";


const SaleNFTDetails = () => {
    const router = useRouter();

    const { tokenId, address } = router.query;

    const [pageLoading, setPageLoading] = useState(true)

    const [singleNft, setSingleNft] = useState(NFT__DATA[0]);
    const [rating, setRating] = useState(3.5);

    useEffect(() => {
        setPageLoading(true)
        getSaleItemByAddrID(address, tokenId).then((res) => {
            setSingleNft({ ...NFT__DATA[0], ...res });
            setPageLoading(false)
        })
    }, [])

    const [loading, setLoading] = useState(false);

    const traits = {
        Season: 2022,
        Driver: "Charles Leclerc",
        Team: "Ferrari"
    }

    const transferEvents =
        [
            {
                "eventName": "Transfer",
                "data": {
                    "from": "0xb371d1C5629C70ACd726B20a045D197c256E1054",
                    "to": "0xbADADCDD3AF1406a3985B2Ad667caDaac8Bc9326",
                    "tokenId": {
                        "type": "BigNumber",
                        "hex": "0x00"
                    }
                },
                "transaction": {
                    "blockNumber": 32295165,
                    "blockHash": "0x33aba48e1cebd8809e92e8271615502c7bb9436998df242e92d504053578c46d",
                    "transactionIndex": 9,
                    "removed": false,
                    "address": "0xFfd9bAddF3f6e427EfAa1A4AEC99131078C1d683",
                    "data": "0x",
                    "topics": [
                        "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                        "0x000000000000000000000000b371d1c5629c70acd726b20a045d197c256e1054",
                        "0x000000000000000000000000badadcdd3af1406a3985b2ad667cadaac8bc9326",
                        "0x0000000000000000000000000000000000000000000000000000000000000000"
                    ],
                    "transactionHash": "0xef8240196047a7d30090b04a9b73edee5ff3900964a90d31d9148449ae2d2664",
                    "logIndex": 29,
                    "event": "Transfer",
                    "eventSignature": "Transfer(address,address,uint256)"
                }
            },
            {
                "eventName": "Transfer",
                "data": {
                    "from": "0x0000000000000000000000000000000000000000",
                    "to": "0xb371d1C5629C70ACd726B20a045D197c256E1054",
                    "tokenId": {
                        "type": "BigNumber",
                        "hex": "0x00"
                    }
                },
                "transaction": {
                    "blockNumber": 31682662,
                    "blockHash": "0x27254a064da9b4994871e1790344b277f0da4edc4dcfada2185389dcb5e46ef2",
                    "transactionIndex": 5,
                    "removed": false,
                    "address": "0xFfd9bAddF3f6e427EfAa1A4AEC99131078C1d683",
                    "data": "0x",
                    "topics": [
                        "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                        "0x0000000000000000000000000000000000000000000000000000000000000000",
                        "0x000000000000000000000000b371d1c5629c70acd726b20a045d197c256e1054",
                        "0x0000000000000000000000000000000000000000000000000000000000000000"
                    ],
                    "transactionHash": "0x98c73b397a920480345c94b9bdf8f56558890fffc29636c1e675e79fe668949b",
                    "logIndex": 27,
                    "event": "Transfer",
                    "eventSignature": "Transfer(address,address,uint256)"
                }
            }
        ]

    const handlePurchase = async (addr, momentId, price) => {
        console.log(price)
        setLoading(true)
        const result = await _purchaseMoment(addr, momentId, price)
        if (result) {
            alert("Moment purchased successfully")
            setLoading(false)
            router.push({
                pathname: '/collection',
            })
        }
        else {
            alert("Something went wrong")
            setLoading(false)
        }
    }

    if(pageLoading) {
        return (
          <PageLoader/>
        )
    }
        
    return (
        <>
            <CommonSection title={singleNft.name} />

            <section>
                <Container>
                    <Row>
                        <Col lg="6" md="6" sm="6">
                            <Image
                                src={{ src: singleNft.thumbnail, width: 432, height: 128 }}
                                alt=""
                                className="single__nft-img"
                            />

                            <h3 className={styles.descriptionTitle}>Traits</h3>

                            <div className={styles.traitsContainer}>
                                {Object.entries(traits || {}).map(
                                    ([key, value]) => (
                                        <div className={styles.traitContainer} key={key}>
                                            <p className={styles.traitName}>{key}</p>
                                            <p className={styles.traitValue}>
                                                {value?.toString() || ""}
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>

                            <h3 className={styles.descriptionTitle}>History</h3>

                            <div className={styles.traitsContainer}>
                                {transferEvents?.map((event, index) => (
                                    <div
                                        key={event.transaction.transactionHash}
                                        className={styles.eventsContainer}
                                    >
                                        <div className={styles.eventContainer}>
                                            <p className={styles.traitName}>Event</p>
                                            <p className={styles.traitValue}>
                                                {
                                                    // if last event in array, then it's a mint
                                                    index === transferEvents.length - 1
                                                        ? "Mint"
                                                        : "Transfer"
                                                }
                                            </p>
                                        </div>

                                        <div className={styles.eventContainer}>
                                            <p className={styles.traitName}>From</p>
                                            <p className={styles.traitValue}>
                                                {event.data.from?.slice(0, 4)}...
                                                {event.data.from?.slice(-2)}
                                            </p>
                                        </div>

                                        <div className={styles.eventContainer}>
                                            <p className={styles.traitName}>To</p>
                                            <p className={styles.traitValue}>
                                                {event.data.to?.slice(0, 4)}...
                                                {event.data.to?.slice(-2)}
                                            </p>
                                        </div>

                                        <div className={styles.eventContainer}>
                                            <Link
                                                className={styles.txHashArrow}
                                                href={`https://mumbai.polygonscan.com/tx/${event.transaction.transactionHash}`}
                                                target="_blank"
                                            >
                                                ↗
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Col>

                        <Col lg="6" md="6" sm="6">
                            <div className="single__nft__content">
                                <h2>{singleNft.name} #{singleNft.sno}</h2>
                                <h4>{singleNft.set?.name} (Set {singleNft.set?.setID}, Series {singleNft.set?.series})</h4>

                                <div className=" d-flex align-items-center justify-content-between mt-4 mb-4">
                                    <div className=" d-flex align-items-center gap-4 single__nft-seen">
                                        <span>
                                            <i className="ri-eye-line"></i> 234
                                        </span>
                                        <span>
                                            <i className="ri-heart-line"></i> 123
                                        </span>
                                        <ReactStars
                                            count={5}
                                            value={3.5}
                                            edit={false}
                                            size={24}
                                            color2={'#ffd700'} />
                                    </div>

                                    <div className=" d-flex align-items-center gap-2 single__nft-more">
                                        <span>
                                            <i className="ri-send-plane-line"></i>
                                        </span>
                                        <span>
                                            <i className="ri-more-2-line"></i>
                                        </span>
                                    </div>
                                </div>

                                <div className="nft__creator d-flex gap-3 align-items-center">
                                    <div className="creator__img">
                                        <Image src={singleNft.creatorImg} alt="" width="40" />
                                    </div>

                                    <div className="creator__detail">
                                        <p>Seller </p>
                                        <h6>{address}</h6>
                                    </div>
                                </div>

                                <p className="my-4">Description: {singleNft.description}</p>
                                <p className="my-4">Price: {Math.round(singleNft.price * 10) / 10} FLOW</p>
                                <button className="singleNft-btn d-flex align-items-center gap-2 w-100" onClick={() => handlePurchase(singleNft.address, singleNft.id, singleNft.price)}>
                                    {!loading && <span><i className="ri-shopping-bag-line" />Purchase  </span>}
                                    <Spinner color="primary" style={{ display: loading ? "block" : "none" }} />
                                </button>

                            </div>
                            <div className="d-flex mt-3 " style={{ width: "40%", justifyContent: "space-between" }}>
                                <p className="mt-2">Your Rating:</p>
                                <ReactStars
                                    count={5}
                                    value={rating}
                                    onChange={(val) => { setRating(val) }}
                                    size={24}
                                    color2={'#ffd700'} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

        </>
    );
};

export default SaleNFTDetails;
