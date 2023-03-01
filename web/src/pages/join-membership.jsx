import React, { useState, useEffect } from "react";

import CommonSection from "../components/ui/Common-section/CommonSection";

import NFTDisplayCard from "../components/ui/Nft-card/NFTDisplayCard";
import PackDisplayCard from "../components/ui/Nft-card/PackDisplayCard";
import MembershipNftCard from "../components/ui/Nft-card/MembershipNftCard";
import { NFT__DATA } from "../assets/data/data";

import { Container, Row, Col } from "reactstrap";

import { getAllSaleItems, _getDropWaitlist, _getDrops } from "@/fcl/scripts";
import { _purchaseMoment } from "@/fcl/transactions";
import { AdminAccountAddress } from "@/constants"
import PageLoader from "@/components/ui/PageLoader";
import packImg from "../assets/images/multipack_4_2.png"
import packImg2 from "../assets/images/value_pack_front_1_.png"
import { useRouter } from "next/router";
import { useFlowUser } from "@/hooks/userFlowUser"

const Market = () => {
  const router = useRouter();
  const flowUser = useFlowUser()
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

  const [allDrops, setAllDrops] = useState([]);

  useEffect(() => {
    setPageLoading(true);
    _getDrops().then((res) => {
      
      const drops = []
      for (var key in res) {
        if (res.hasOwnProperty(key)) {
          drops.push( res[key] );
        }
      }

      const finalDrops = []
      let len = drops.length
      for(let i = 0; i < len; i++) {
        const drop = drops[i]
        _getDropWaitlist(drop.id).then((res) => {          
          if(res.includes(flowUser?.addr)) {
            drop["opted"] = true
          }
          finalDrops.push(drop)
        })

      }

      console.log(finalDrops)
      setAllDrops(() => finalDrops);
      setPageLoading(false);
    });
  }, []);


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

            {allDrops?.map((item) => (
              <Col lg="5" md="4" sm="6" className="mb-4" key={item.id} >
                <MembershipNftCard item={{
                  ...NFT__DATA[0],
                  id: item.id,
                  title: item.name,
                  desc: item.description,
                  creator: item.address,
                  imgUrl: { src: !item.thumbnail ? NFT__DATA[0].imgUrl.src : item.thumbnail, width: 432, height: 128 },
                }}
                nopurchase={item.opted} 
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
