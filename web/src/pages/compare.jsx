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
            <h2 style={{textAlign:"center", marginBottom:"15px"}}>Compare Sale Items</h2>
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
                <>
              <Image
                src={{ src: NFTs[0].thumbnail, width: 500, height: 150 }}
                alt=""
                className="single__nft-img mt-4"
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



              <div className="single__nft__content mt-4">
                <h2>{NFTs[0].name}</h2>

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
                    <Image src={NFTs[0].creatorImg} alt="" width="40" />
                  </div>

                  <div className="creator__detail">
                    <p>Created By</p>
                    <h6>{NFTs[0].creator}</h6>
                  </div>
                </div>

                <p className="my-4">Description: {NFTs[0].description}</p>
                <p className="my-4">Price: {Math.round(NFTs[0].price * 10) / 10}</p>
                <button className="singleNft-btn d-flex align-items-center gap-2 w-100" onClick={() => handlePurchase(NFTs[0].id, NFTs[0].price)}>
                  {!loading && <span><i className="ri-shopping-bag-line" />Purchase  </span>}
                  <Spinner color="primary" style={{ display: loading ? "block" : "none" }} />
                </button>

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
              <div className="d-flex mt-3 " style={{ width: "50%", justifyContent: "space-between" }}>
                <p className="mt-2">Your Rating:</p>
                <ReactStars
                  count={5}
                  value={rating}
                  onChange={(val) => { setRating(val) }}
                  size={24}
                  color2={'#ffd700'} />
              </div>
              </>
            )}
            {!NFTs[0] && ( <h4 className="d-flex justify-content-center align-items-center" style={{color:"white"}}>
                Select an item to view
                </h4>)}
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
                <>
              <Image
                src={{ src: NFTs[1].thumbnail, width: 500, height: 150 }}
                alt=""
                className="single__nft-img mt-4"
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

              
              <div className="single__nft__content mt-4">
                <h2>{NFTs[1].name}</h2>

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
                    <Image src={NFTs[1].creatorImg} alt="" width="40" />
                  </div>

                  <div className="creator__detail">
                    <p>Created By</p>
                    <h6>{NFTs[1].creator}</h6>
                  </div>
                </div>

                <p className="my-4">Description: {NFTs[1].description}</p>
                <p className="my-4">Price: {Math.round(NFTs[1].price * 10) / 10}</p>
                <button className="singleNft-btn d-flex align-items-center gap-2 w-100" onClick={() => handlePurchase(NFTs[1].id, NFTs[1].price)}>
                  {!loading && <span><i className="ri-shopping-bag-line" />Purchase  </span>}
                  <Spinner color="primary" style={{ display: loading ? "block" : "none" }} />
                </button>

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
              <div className="d-flex mt-3 " style={{ width: "50%", justifyContent: "space-between" }}>
                <p className="mt-2">Your Rating:</p>
                <ReactStars
                  count={5}
                  value={rating}
                  onChange={(val) => { setRating(val) }}
                  size={24}
                  color2={'#ffd700'} />
              </div>

              </>
            )}
            </Col>
          </Row>
        </Container>
      </section>

    </>
  );
};

export default NftDetails;
