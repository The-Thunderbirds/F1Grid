import React, { useEffect, useState } from "react";

import CommonSection from "@/components/ui/Common-section/CommonSection";
import { Container, Row, Col, Spinner } from "reactstrap";
import { NFT__DATA } from "@/assets/data/data";
import Image from "next/image"
import { useRouter } from 'next/router'
import ReactStars from 'react-stars'
import { getPackWithMomentsById } from "@/fcl/scripts";
import { _purchasePack } from "@/fcl/transactions";
import { useFlowUser } from "@/hooks/userFlowUser"
import NFTDisplayCard from "@/components/ui/Nft-card/NFTDisplayCard";
import PageLoader from "@/components/ui/PageLoader";


const PackDetails = () => {
  const router = useRouter();
  const flowUser = useFlowUser()

  const { packId } = router.query;

  const [pageLoading, setPageLoading] = useState(true)

  const [singleNft, setSingleNft] = useState(NFT__DATA[0]);
  const [rating, setRating] = useState(3.5);

  useEffect(() => {
    setPageLoading(true)
    getPackWithMomentsById(packId).then((res) => {
      setSingleNft({ ...NFT__DATA[0], ...res });
      setPageLoading(false)
    })
  }, [])

  const [loading, setLoading] = useState(false);

  const handlePurchase = async (seller, packID, price) => {
    setLoading(true)
    const result = await _purchasePack(seller, packID, price)
    if (result) {
      alert("Pack purchased successfully")
      setLoading(false)
      router.push({
        "pathname": "/packs"
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

            <h2>Possible Moments from Pack</h2>
            {singleNft && singleNft.momentDetails?.map((item, index) => (
                <NFTDisplayCard item={{ ...NFT__DATA[0], 
                  id: item.id,  
                  title: item.name, 
                  desc: item.description, 
                  creator: flowUser?.addr,
                  currentBid: 0,
                  imgUrl: { src: !item.thumbnail ? NFT__DATA[0].imgUrl.src : item.thumbnail, width: 432, height: 128 },
                  sno: item.sno
                }}
                  nopurchase={true}
                />
            ))
            }


            </Col>

            <Col lg="6" md="6" sm="6">
              <div className="single__nft__content">
                <h2>Pack #{singleNft.packID}</h2>

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
                    <p>Created By</p>
                    <h6>{singleNft.owner}</h6>
                  </div>
                </div>

                <p className="my-4">Description: Specially Curated Moments Pack for F1 racing lovers</p>
                <p className="my-4">Number of moments: You will get {singleNft.momentsPerPack} moments from this pack pool</p>
                <p className="my-4">Price: {Math.round(singleNft.price * 10) / 10} FLOW</p>
                <button className="singleNft-btn d-flex align-items-center gap-2 w-100" onClick={() => handlePurchase(singleNft.owner, singleNft.packID, singleNft.price)}>
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

export default PackDetails;
