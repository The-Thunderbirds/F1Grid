import React, { useEffect, useState } from "react";

import { Container, Row, Col, Form, FormGroup, Label, Input } from "reactstrap";
import CommonSection from "@/components/ui/Common-section/CommonSection";
import styles from "@/styles/Series.module.css";
import { NFT__DATA } from "@/assets/data/data.js";
import NftCard from "@/components/ui/Nft-card/NftCard";

import { mintMoment } from "@/fcl/transactions";
import { getAllSets, getAllPlays, getAllCollections } from "@/fcl/scripts";

import { useFlowUser } from "@/hooks/userFlowUser"

//create an array of series 
const series = [
  {
    title: "Series 1",
  },
  {
    title: "Series 2",
  },
  {
    title: "Series 3",
  },
];
const set = [
  {
    title: "Set 1",
  },
  {
    title: "Set 2",
  },
  {
    title: "Set 3",
  },
];

const Mint = () => {

  const flowUser = useFlowUser()

  const [selectSetId, setSelectSetId] = useState("1");
  const [selectPlayId, setSelectPlayId] = useState("1");

  const [allSets, setAllSets] = useState([]);

  useEffect(() => {
    getAllSets().then((res) => {
      setAllSets(() => res);
    })
  }, [])

  const [allPlays, setAllPlays] = useState([]);

  useEffect(() => {
    getAllPlays().then((res) => {
      setAllPlays(() => res);
    })
  }, [])

  const [allCollections, setAllCollections] = useState([]);

  useEffect(() => {
    if(flowUser?.addr) {
      getAllCollections(flowUser.addr).then((res) => {
        setAllCollections(() => res);
      })
    }
  }, [flowUser])

  const handleMint = async () => {
    await mintMoment(selectSetId, selectPlayId, flowUser?.addr)
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
                    Select Set
                  </Label>
                  <Input
                    id="exampleSelect"
                    name="select"
                    type="select"
                    className="bg-dark"
                    style={{ color: "white", border: "none" }}
                    onChange={(e) => setSelectSetId(e.target.value)}
                  >
                    {allSets && allSets.map((item, index) => (
                      <option value={index + 1}>
                        {item.name}
                      </option>
                    )
                    )}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleSelect" style={{ color: "white" }}>
                    Select Play
                  </Label>
                  <Input
                    id="exampleSelect"
                    name="select"
                    type="select"
                    className="bg-dark"
                    style={{ color: "white", border: "none" }}
                    onChange={(e) => setSelectPlayId(e.target.value)}
                  >
                    {allPlays && allPlays.map((item, index) => (
                      <option value={index + 1}>
                        {item.name}
                      </option>
                    )
                    )}
                  </Input>
                </FormGroup>

              </Form>
              <button
                className="bid__btn d-flex align-items-center gap-1"
                onClick={handleMint}
              >
                Create Edition
              </button>

            </Col>
          </Row>
          <Row className="mt-4">
            <h4 className={styles.label} >List of Minted Moments</h4>
            {allCollections && allCollections.map((item, index) => (
              <Col lg="3" md="4" sm="6" className="mb-4" key={index}>
                <h1>{item.name}</h1>
                <h1>{item.description}</h1>
                <h1>{item.thumbnail}</h1>
                {/* <NftCard item={item} nopurchase={true} /> */}
              </Col>
            ))}
            {/* {NFT__DATA.map((item) => (
              <Col lg="3" md="4" sm="6" className="mb-4" key={item.id}>
                <NftCard item={item} nopurchase={true} />
              </Col>
            ))} */}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Mint;
