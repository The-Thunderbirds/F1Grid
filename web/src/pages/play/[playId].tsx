import React, { useEffect, useState } from "react";

import CommonSection from "@/components/ui/Common-section/CommonSection";
import { Container, Row, Col, Spinner } from "reactstrap";
import { NFT__DATA } from "@/assets/data/data";
import Image from "next/image"
import { useRouter } from 'next/router'
import ReactStars from 'react-stars'
import { getPlayMetadataById } from "@/fcl/scripts";
import styles from "@/styles/Token.module.css"
import { AdminAccountAddress } from "@/constants";
import PageLoader from "@/components/ui/PageLoader";


const PlayDetails = () => {
    const router = useRouter();

    const { playId } = router.query;

    const [pageLoading, setPageLoading] = useState(true)

    const [singleNft, setSingleNft] = useState(NFT__DATA[0]);
    const [rating, setRating] = useState(3.5);

    useEffect(() => {
        setPageLoading(true)
        getPlayMetadataById(playId).then((res) => {
            setSingleNft({ ...NFT__DATA[0], ...res });
            setTraits({
                Driver: res.driver,
                Team: res.team,
                Track: res.track
            }
            )
            setPageLoading(false)
        })
    }, [])

    const traits_ex = {
        Driver: "Charles Leclerc",
        Team: "Ferrari",
        Track: "Ferrari"
    }

    const [traits, setTraits] = useState(traits_ex)

    if(pageLoading) {
        return (
          <PageLoader/>
        )
    }
    
    
    return (
        <>
            {console.log(traits)}
            <CommonSection title={singleNft.name} />

            <section>
                <Container>
                    <Row>
                        <Col lg="6" md="6" sm="6">
                        <div className="single__nft__card">
                      <div className="nft__img">
                        <Image src={singleNft.thumbnail} fill alt=""  />
                      </div>
                    </div>
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

                        </Col>

                        <Col lg="6" md="6" sm="6">
                            <div className="single__nft__content">
                                <h2>{singleNft.name}</h2>

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
                                        <p>Owner </p>
                                        <h6>{AdminAccountAddress}</h6>
                                    </div>
                                </div>

                                <p className="my-4">Description: {singleNft.description}</p>

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

export default PlayDetails;
