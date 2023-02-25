import React, {useEffect} from "react";

import CommonSection from "@/components/ui/Common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { NFT__DATA } from "../../assets/data/data";
import LiveAuction from "@/components/ui/Live-auction/LiveAuction";
import Link from "next/link";
import Image from "next/image"
import { useRouter } from 'next/router'

const NftDetails = () => {
  const router = useRouter();

  const { tokenId } = router.query;
  const singleNft = NFT__DATA.find((item) => item.id == tokenId);

  console.log(NFT__DATA,singleNft)
  return (
    <>
      <CommonSection title={singleNft.title} />

      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <Image
                src={singleNft.imgUrl}
                alt=""
                className="single__nft-img"
              />
            </Col>

            <Col lg="6" md="6" sm="6">
              <div className="single__nft__content">
                <h2>{singleNft.title}</h2>

                <div className=" d-flex align-items-center justify-content-between mt-4 mb-4">
                  <div className=" d-flex align-items-center gap-4 single__nft-seen">
                    <span>
                      <i className="ri-eye-line"></i> 234
                    </span>
                    <span>
                      <i className="ri-heart-line"></i> 123
                    </span>
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
                    <Image src={singleNft.creatorImg} alt=""  width="40" />
                  </div>

                  <div className="creator__detail">
                    <p>Created By</p>
                    <h6>{singleNft.creator}</h6>
                  </div>
                </div>

                <p className="my-4">{singleNft.desc}</p>
                <button className="singleNft-btn d-flex align-items-center gap-2 w-100">
                  <i className="ri-shopping-bag-line"></i>
                  <Link href="/wallet">Place a Bid</Link>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <LiveAuction />
    </>
  );
};

export default NftDetails;
