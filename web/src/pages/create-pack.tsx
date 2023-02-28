import React, { useEffect, useState } from "react";

import { Container, Row, Col, Form, FormGroup, Label, Input, Spinner } from "reactstrap";
import CommonSection from "@/components/ui/Common-section/CommonSection";
import styles from "@/styles/Series.module.css";
import { NFT__DATA } from "@/assets/data/data.js";

import {  _createPack, } from "@/fcl/transactions";
import { getAllCollections } from "@/fcl/scripts";

import { useFlowUser } from "@/hooks/userFlowUser"
import NFTDisplayCard from "@/components/ui/Nft-card/NFTDisplayCard";
import { useRouter } from "next/router";
import PageLoader from "@/components/ui/PageLoader";

const CreatePack = () => {
  const router = useRouter();
  const flowUser = useFlowUser()

  const [pageLoading, setPageLoading] = useState(true)

  const [allCollections, setAllCollections] = useState([]);
  const [packs, setPacks] = useState([]);
  const [numPacks, setNumPacks] = useState(0);
  const [salePrice, setSalePrice] = useState(10)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (flowUser?.addr) {
      setPageLoading(true)
      getAllCollections(flowUser.addr).then((res) => {
        setAllCollections(() => res);
        setPageLoading(false)
      })
    }
  }, [flowUser])

  const handleCreatePack = async () => {
    if(packs.length == 0) {
      alert("Please select Moments from your collection to add in packs")
      return
    }
    setLoading(true)
    const result = await _createPack(packs, numPacks, salePrice, flowUser.addr)
    if (result) {
      alert("Pack Added to Marketplace successfully")
      setLoading(false)
      router.push({
        pathname: '/market'
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
      <CommonSection title="Mint Moment" />

      <section>
        <Container>

          <Row className="mb-5">
            <Col>
              <Form >
                <FormGroup>
                  <Label for="exampleSelect" style={{ color: "white" }}>
                    Enter Number of Moments Per Pack
                  </Label>
                  <Input
                    id="exampleSelect"
                    name="select"
                    type="number"
                    className="bg-dark"
                    style={{ color: "white", border: "none" }}
                    onChange={(e) => setNumPacks(parseInt(e.target.value))}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleSelect" style={{ color: "white" }}>
                    Enter Price Per Pack (in FLOW)
                  </Label>
                  <Input
                    id="exampleSelect"
                    name="select"
                    type="number"
                    className="bg-dark"
                    style={{ color: "white", border: "none" }}
                    onChange={(e) => setSalePrice(parseInt(e.target.value))}
                  />
                </FormGroup>
              </Form>
              <button
                className="bid__btn w-25 mt-3"
                onClick={handleCreatePack}
              >
                {!loading && <span> Create Pack </span>}
                <Spinner color="primary" style={{ display: loading ? "block" : "none", marginLeft: "42%" }} />

              </button>

            </Col>
          </Row>
          <Row className="mt-4" style={{ justifyContent: "space-between" }}>
            <h4 className={styles.label} >Choose Your Moments</h4>
            {allCollections && allCollections.map((item, index) => (
              <Col lg="5" md="5" sm="6" className="mb-4" key={index}>

                <NFTDisplayCard item={{ ...NFT__DATA[0], 
                  id: item.id,  
                  title: item.name, 
                  desc: item.description, 
                  creator: flowUser?.addr,
                  currentBid: 0,
                  imgUrl: { src: !item.thumbnail ? NFT__DATA[0].imgUrl.src : item.thumbnail, width: 500, height: 150 },
                  sno: item.sno
                }}
                  nopurchase={true}
                />

                <button
                  className="bid__btn d-flex align-items-center gap-1"
                  onClick={() => { setPacks([...packs, item.id]) }}
                  style={{ marginLeft: "35%", marginTop: "5px" }}
                  disabled={packs.includes(item.id)}
                >
                  {!packs.includes(item.id) ? <span>Add to Packs Pool</span> : <span>Added</span>}
                </button>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default CreatePack;
