import React, { useEffect, useState } from "react";

import CommonSection from "@/components/ui/Common-section/CommonSection";
import { Container, Row, Col, Spinner, Form, FormGroup, Input, Label } from "reactstrap";
import { NFT__DATA } from "@/assets/data/data";
import Link from "next/link";
import Image from "next/image"
import { useRouter } from 'next/router'
import ReactStars from 'react-stars'
import { getSaleItemsByAddr } from "@/fcl/scripts";
import { _purchaseMoment } from "@/fcl/transactions";
import { AdminAccountAddress } from "@/constants"
import styles from "@/styles/Token.module.css"

import ComparatorNFTDetails from "@/components/ui/ComparatorNFTDetails"

const NftDetails = () => {


  const [saleItems, setSaleItems] = useState([]);
  useEffect(() => {
    getSaleItemsByAddr(AdminAccountAddress).then((res) => {
        console.log(res);
        console.log(res[0]);
        console.log(res[1]);
        setSaleItems(res);
    })
  }, [])

  const [Ids, setIds] = useState([]);
  const [NFTs, setNFTs] = useState([false,false]);
  const [rating, setRating] = useState(3.5);

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
  const [loading, setLoading] = useState(false);
  const traits = {
    Season: 2022,
    Driver: "Charles Leclerc",
    Team: "Ferrari"
  }
  
  const handlePurchase = async (momentId, price) => {
    setLoading(true)
    const result = await _purchaseMoment(AdminAccountAddress, momentId, price)
    if (result) {
      alert("Sale Collection created successfully")
      setLoading(false)
      window.location.reload();
    }
    else {
      alert("Something went wrong")
      setLoading(false)
    }
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
                        {item.name}
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
                        {item.name}
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

export default NftDetails;
