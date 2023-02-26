import React, { useEffect, useState } from "react";

import { Container, Row, Col, Form, FormGroup, Label, Input, Spinner } from "reactstrap";
import CommonSection from "@/components/ui/Common-section/CommonSection";
import styles from "@/styles/Series.module.css";
import { NFT__DATA } from "@/assets/data/data.js";
import NftCard from "@/components/ui/Nft-card/NftCard";

import { mintMoment, _startSale } from "@/fcl/transactions";
import { getAllSets, getAllPlays, getAllCollections } from "@/fcl/scripts";

import { useFlowUser } from "@/hooks/userFlowUser"

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
    if (flowUser?.addr) {
      getAllCollections(flowUser.addr).then((res) => {
        setAllCollections(() => res);
      })
    }
  }, [flowUser])

  const [loading, setLoading] = useState(false);

  const handleMint = async () => {
    setLoading(true)
    const result = await mintMoment(selectSetId, selectPlayId, flowUser?.addr)
    if (result) {
      alert("Set created successfully")
      setLoading(false)
      window.location.reload();
    }
    else {
      alert("Something went wrong")
      setLoading(false)

    }
  }

  const [addSaleloading, setAddSaleloading] = useState(false);

  const handleAddToSale = async (momentId, price) => {
    setAddSaleloading(true)
    const result = await _startSale(momentId, price)
    if (result) {
      alert("Moment Added to Marketplace successfully")
      setAddSaleloading(false)
      window.location.reload();
    }
    else {
      alert("Something went wrong")
      setAddSaleloading(false)
    }
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
                className="bid__btn w-25 mt-3"
                onClick={handleMint}
              >
                {!loading && <span> Mint Moment </span>}
                <Spinner color="primary" style={{ display: loading ? "block" : "none", marginLeft: "42%" }} />

              </button>

            </Col>
          </Row>
          <Row className="mt-4" style={{ justifyContent: "space-between" }}>
            <h4 className={styles.label} >List of Remaining Minted Moments</h4>
            {allCollections && allCollections.map((item, index) => (
              <Col lg="5" md="5" sm="6" className="mb-4" key={index}>
                <h1>{item.id}</h1>
                <NftCard item={{ ...NFT__DATA[0], title: item.name, desc: item.description, imgUrl: { src: !item.thumbnail ? NFT__DATA[0].imgUrl.src : item.thumbnail, width: 500, height: 150 } }} nopurchase={true} />
                <button
                  className="bid__btn d-flex align-items-center gap-1"
                  onClick={() => {handleAddToSale(item.id, 10)}}
                  style={{ marginLeft: "40%", marginTop: "5px" }}
                >
                  {!addSaleloading && <span> Add to Sale </span>}
                  <Spinner color="primary" style={{ display: addSaleloading  ? "block" : "none" }} />                                    
                </button>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Mint;
