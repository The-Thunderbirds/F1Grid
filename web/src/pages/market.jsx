import React, { useState, useEffect } from "react";

import CommonSection from "../components/ui/Common-section/CommonSection";

import NFTDisplayCard from "../components/ui/Nft-card/NFTDisplayCard";
import PackDisplayCard from "../components/ui/Nft-card/PackDisplayCard";

import { NFT__DATA } from "../assets/data/data";

import { Container, Row, Col } from "reactstrap";

import { getAllSaleItems, getAllPackIDs } from "@/fcl/scripts";
import { _purchaseMoment } from "@/fcl/transactions";
import { AdminAccountAddress } from "@/constants"
import PageLoader from "@/components/ui/PageLoader";

const Market = () => {

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
            Marketplace
          </h2>
          <Row style={{ justifyContent: "space-around" }}>
            <Col lg="12" className="mb-5">
              <div className="market__product__filter d-flex align-items-center justify-content-between">
                <div className="filter__left d-flex align-items-center gap-5">
                  <div className="all__category__filter">
                    <select onChange={handleCategory}>
                      <option>All Categories</option>
                      <option value="art">Art</option>
                      <option value="music">Music</option>
                      <option value="domain-name">Domain Name</option>
                      <option value="virtual-world">Virtual World</option>
                      <option value="trending-card">Trending Cards</option>
                    </select>
                  </div>

                  <div className="all__items__filter">
                    <select onChange={handleItems}>
                      <option>All Items</option>
                      <option value="single-item">Single Item</option>
                      <option value="bundle">Bundle</option>
                    </select>
                  </div>
                </div>

                <div className="filter__right">
                  <select onChange={handleSort}>
                    <option>Sort By</option>
                    <option value="high">High Rate</option>
                    <option value="mid">Mid Rate</option>
                    <option value="low">Low Rate</option>
                  </select>
                </div>
              </div>
            </Col>

            {allSaleItems?.map((item) => (
              <Col lg="5" md="4" sm="6" className="mb-4" key={item.id} >
                <NFTDisplayCard item={{
                  ...NFT__DATA[0],
                  id: item.id,
                  title: item.name,
                  desc: item.description,
                  creator: item.address,
                  currentBid: item.price,
                  imgUrl: { src: !item.thumbnail ? NFT__DATA[0].imgUrl.src : item.thumbnail, width: 500, height: 150 },
                  sno: item.sno
                }}
                // nopurchase={true} 
                />
              </Col>
            ))}

            <h1>Packs</h1>
            {allPackItems?.map((item) => (
                !item.soldComplete &&
                <Col lg="5" md="4" sm="6" className="mb-4" key={item.id} >
                <PackDisplayCard item={{
                  ...NFT__DATA[0],
                  id: item.packID,
                  title: item.packID,
                  creator: AdminAccountAddress,
                  currentBid: item.price,
                  imgUrl: { src: !item.thumbnail ? NFT__DATA[0].imgUrl.src : item.thumbnail, width: 500, height: 150 },
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
