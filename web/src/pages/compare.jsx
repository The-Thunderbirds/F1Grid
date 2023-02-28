import React, { useEffect, useState } from "react";

import CommonSection from "@/components/ui/Common-section/CommonSection";
import { Container, Row, Col, Form, FormGroup, Input, Label } from "reactstrap";
import { NFT__DATA } from "@/assets/data/data";
import { getSaleItemsByAddr } from "@/fcl/scripts";
import { _purchaseMoment } from "@/fcl/transactions";
import { AdminAccountAddress } from "@/constants"

import ComparatorNFTDetails from "@/components/ui/ComparatorNFTDetails"
import PageLoader from "@/components/ui/PageLoader";

const MomentComparator = () => {

  const [pageLoading, setPageLoading] = useState(true)

  const [saleItems, setSaleItems] = useState([]);
  useEffect(() => {
    setPageLoading(true)
    getSaleItemsByAddr(AdminAccountAddress).then((res) => {
        setSaleItems(res);
        setPageLoading(false)
      })
  }, [])

  const [NFTs, setNFTs] = useState([false,false]);

  if(pageLoading) {
    return (
      <PageLoader/>
    )
  }

  return (
    <>
      <CommonSection title={NFTs[0].name} />

      <section>
        <Container>
            <h2 style={{textAlign:"center", marginBottom:"15px"}}>Compare Sale Moments</h2>
          <Row style={{justifyContent:"space-between"}} >
          
            <Col lg="5" md="6" sm="6" >
            <Form >
                <FormGroup>
                  <Label for="exampleSelect" style={{ color: "transparent" }}>
                    Select Item
                  </Label>
                  <Input
                    id="exampleSelect"
                    name="select"
                    type="select"
                    className="bg-dark"
                    style={{ color: "white", border: "none" }}
                    onChange={(e) => { if(e.target.value) setNFTs([{...NFT__DATA[0], ...saleItems.find(item => item.id === e.target.value)}, NFTs[1]])}}
                  > 
                  <option value="">Select Moment</option>
                    {saleItems && saleItems.map((item, index) => (
                      <option value={item.id}>
                        {item.name} #{item.sno}
                      </option>
                    )
                    )}
                  </Input>
                </FormGroup>
            </Form>
            {NFTs[0] && (              
              <ComparatorNFTDetails tokenId={NFTs[0].id} address={NFTs[0].address}/>
            )}
            </Col>
            <Col lg="5  " md="6" sm="6">
            <Form >
                <FormGroup>
                  <Label for="exampleSelect" style={{ color: "transparent" }}>
                    Select Item
                  </Label>
                  <Input
                    id="exampleSelect"
                    name="select"
                    type="select"
                    className="bg-dark"
                    style={{ color: "white", border: "none" }}
                    onChange={(e) => {if(e.target.value) setNFTs([NFTs[0], {...NFT__DATA[1], ...saleItems.find(item => item.id === e.target.value)}])}}
                  > 
                  <option value="">Select Moment</option>
                    {saleItems && saleItems.map((item, index) => (
                      <option value={item.id}>
                        {item.name} #{item.sno}
                      </option>
                    )
                    )}
                  </Input>
                </FormGroup>
            </Form>
            {NFTs[1] && (
              <ComparatorNFTDetails tokenId={NFTs[1].id} address={NFTs[1].address}/>
            )}
            </Col>
          </Row>
        </Container>
      </section>

    </>
  );
};

export default MomentComparator;
