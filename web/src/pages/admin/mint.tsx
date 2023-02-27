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
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
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
  const [salePrice, setSalePrice] = useState(10)
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
                <NftCard item={{ ...NFT__DATA[0], title: item.name, desc: item.description, imgUrl: { src: !item.thumbnail ? NFT__DATA[0].imgUrl.src : item.thumbnail, width: 500, height: 150 } }} nopurchase={true} />
                <button
                  className="bid__btn d-flex align-items-center gap-1"
                  onClick={toggleModal}
                  style={{ marginLeft: "40%", marginTop: "5px" }}
                >
                  Add to Sale
                </button>

          {modal && (
            <div className="modal__wrapper">
              <div
                className="single__modal"
                style={{
                  width: "400px",
                  height: "250px",
                  borderRadius: "15px",
                }}
              >

                <span className="close__modal">
                  <i className="ri-close-line" onClick={() => setModal(false)}></i>
                </span>
                <Row className="mb-5">
                  <Col>
                    <div className="create__item">
                      <form>
                        <div className="form__input">
                          <label htmlFor="">Price</label>
                          <input type="number" placeholder="Enter set name"
                            value={salePrice}
                            onChange={(e) => setSalePrice(parseInt(e.target.value))}
                          />
                        </div>
                      </form>
                      <button
                      className="bid__btn w-100 mt-3"
                      onClick={() => {handleAddToSale(item.id, salePrice)}}
                      style={{textAlign:"center"}}
                    >
                    {!addSaleloading && <span> Add to Sale </span>}
                    <Spinner color="primary" style={{ display: addSaleloading  ? "block" : "none", marginLeft:"45%" }} />
                    </button>

                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          )}

              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Mint;
