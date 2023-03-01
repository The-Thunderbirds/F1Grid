import React, { useState, useEffect } from "react";

import CommonSection from "../components/ui/Common-section/CommonSection";

import NFTDisplayCard from "../components/ui/Nft-card/NFTDisplayCard";
import PackDisplayCard from "../components/ui/Nft-card/PackDisplayCard";
import MembershipNftCard from "../components/ui/Nft-card/MembershipNftCard";
import { NFT__DATA } from "../assets/data/data";

import { Container, Row, Col } from "reactstrap";

import { getAllSaleItems, getAllPackIDs } from "@/fcl/scripts";
import { _purchaseMoment } from "@/fcl/transactions";
import { AdminAccountAddress } from "@/constants"
import PageLoader from "@/components/ui/PageLoader";
import packImg from "../assets/images/multipack_4_2.png"
import packImg2 from "../assets/images/value_pack_front_1_.png"
import { useRouter } from "next/router";
const Market = () => {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(true)

  const [data, setData] = useState(NFT__DATA);

  const [allSaleItems, setAllSaleItems] = useState([]);

  useEffect(() => {
    setPageLoading(true)
    getAllSaleItems().then((res) => {
      setAllSaleItems(() => res);
      setPageLoading(false)
    })
  }, [])

  const [allPackItems, setAllPackItems] = useState([]);

  useEffect(() => {
    setPageLoading(true)
    getAllPackIDs().then((res) => {
      setAllPackItems(() => res);
      setPageLoading(false)
    })
  }, [])

  const handleCategory = () => { };

  const handleItems = () => { };

  // ====== SORTING DATA BY HIGH, MID, LOW RATE =========
  const handleSort = (e) => {
    const filterValue = e.target.value;

    if (filterValue === "high") {
      const filterData = NFT__DATA.filter((item) => item.currentBid >= 6);

      setData(filterData);
    }

    if (filterValue === "mid") {
      const filterData = NFT__DATA.filter(
        (item) => item.currentBid >= 5.5 && item.currentBid < 6
      );

      setData(filterData);
    }

    if (filterValue === "low") {
      const filterData = NFT__DATA.filter(
        (item) => item.currentBid >= 4.89 && item.currentBid < 5.5
      );

      setData(filterData);
    }
  };

  if(pageLoading) {
    return (
      <PageLoader/>
    )
  }

  return (
    <>
      <CommonSection title={"MarketPlace"} />

      <section>
        <Container>
          <h2 style={{ textAlign: "center" }}>
            Memberships List
          </h2>
          <Row style={{ justifyContent: "space-around" }}>

            {allSaleItems?.map((item) => (
              <Col lg="5" md="4" sm="6" className="mb-4" key={item.id} >
                <MembershipNftCard item={{
                  ...NFT__DATA[0],
                  id: item.id,
                  title: item.name,
                  desc: item.description,
                  creator: item.address,
                  imgUrl: { src: !item.thumbnail ? NFT__DATA[0].imgUrl.src : item.thumbnail, width: 432, height: 128 },
                }}
                // nopurchase={true} 
                />
              </Col>
            ))}

          </Row>
        </Container>
      </section>
    </>
  );
};

export default Market;