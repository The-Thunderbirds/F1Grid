import React, { useEffect, useState } from "react";

import { Container, Row, Col, Form, FormGroup, Label, Input, Spinner } from "reactstrap";
import CommonSection from "@/components/ui/Common-section/CommonSection";
import styles from "@/styles/Series.module.css";
import { NFT__DATA } from "@/assets/data/data.js";
import NFTDisplayCard from "@/components/ui/Nft-card/NFTDisplayCard";

import { mintMoment, _startSale } from "@/fcl/transactions";
import { getAllSets, getAllPlays, getAllCollections } from "@/fcl/scripts";

import { useFlowUser } from "@/hooks/userFlowUser"
import PageLoader from "@/components/ui/PageLoader";
import Image from "next/image";

const Mint = () => {

  const flowUser = useFlowUser()

  const [pageLoading, setPageLoading] = useState(true)

  const [selectSetId, setSelectSetId] = useState("1");
  const [selectPlayId, setSelectPlayId] = useState("1");
  
  const [modal, setModal] = useState(false);
  const [addSaleModal, setAddSaleModal] = useState(false);
  const toggleSaleModal = () => setAddSaleModal(!addSaleModal);
  const toggleModal = () => setModal(!modal);
  
  const [allSets, setAllSets] = useState([]);

  useEffect(() => {
    setPageLoading(true)
    getAllSets().then((res) => {
      setAllSets(() => res);
      setPageLoading(false)
    })
  }, [])

  const [allPlays, setAllPlays] = useState([]);

  useEffect(() => {
    setPageLoading(true)
    getAllPlays().then((res) => {
      setAllPlays(() => res);
      setPageLoading(false)
    })
  }, [])

  const [allCollections, setAllCollections] = useState([]);

  useEffect(() => {
    if (flowUser?.addr) {
      setPageLoading(true)
      getAllCollections(flowUser.addr).then((res) => {
        setAllCollections(() => res);
        setPageLoading(false)
      })
    }
  }, [flowUser])

  const [loading, setLoading] = useState(false);

  const handleMint = async () => {
    setLoading(true)
    const result = await mintMoment(selectSetId, selectPlayId, flowUser?.addr)
    if (result) {
      alert("Minted moment successfully")
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
        {modal && (
            <div className="modal__wrapper">
              <div
                className="single__modal"
                style={{ width: "1200px", height: "650px" }}
              >
                <span className="close__modal">
                  <i
                    className="ri-close-line"
                    onClick={() => setModal(false)}
                  ></i>
                </span>
        <Row className="mb-5">
                  <Col lg="6" md="4" sm="6">
                    <h5 className="mb-4 text-light">Preview Item</h5>
                    <div className="single__nft__card">
                    <div className="nft__img">
                      <Image src={{src:allPlays[parseInt(selectPlayId)-1].thumbnail, width:432, height: 128}} alt=""  width={450} />
                    </div>  
                  </div>
                    <button
                      className="bid__btn w-50 mt-3"
                      onClick={handleMint }
                      style={{ marginLeft: "20%" }}
                    >
                      {!loading && <span>
                       Mint Moment</span>}
                      <Spinner color="primary" style={{ display: loading ? "block" : "none", marginLeft:"42%" }} />
                    </button>
                  </Col>

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
                        {item.name} (Set {item.setID}, Series {item.series})
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

            </Col>
                </Row>
              </div>
            </div>
          )}

          <div style={{display:"flex", justifyContent:"space-between", marginBottom:"10px"}}>
            <h4 className={styles.label}>List of Remaining Minted Moments</h4>
            <button
            className="bid__btn d-flex align-items-center gap-1"
            onClick={toggleModal}
          >
            Mint Moment
          </button>
          </div>
          <Row className="mt-4" style={{ justifyContent: "space-between" }}>
            {allCollections && allCollections.map((item, index) => (
              <Col lg="5" md="5" sm="6" className="mb-4" key={index}>
                <NFTDisplayCard item={{ ...NFT__DATA[0], 
                  id: item.id,  
                  title: item.name, 
                  desc: item.description, 
                  creator: flowUser?.addr,
                  currentBid: 0,
                  imgUrl: { src: !item.thumbnail ? NFT__DATA[0].imgUrl.src : item.thumbnail, width: 432, height: 128 },
                  sno: item.sno
                }}
                  nopurchase={true}
                />
                <button
                  className="bid__btn d-flex align-items-center gap-1"
                  onClick={toggleSaleModal}
                  style={{ marginLeft: "40%", marginTop: "5px" }}
                >
                  Add to Sale
                </button>

                {addSaleModal && (
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
                        <i className="ri-close-line" onClick={() => setAddSaleModal(false)}></i>
                      </span>
                      <Row className="mb-5">
                        <Col>
                          <div className="create__item">
                            <form>
                              <div className="form__input">
                                <label htmlFor="">Price</label>
                                <input type="number" placeholder="Enter price"
                                  value={salePrice}
                                  onChange={(e) => setSalePrice(parseInt(e.target.value))}
                                />
                              </div>
                            </form>
                            <button
                              className="bid__btn w-100 mt-3"
                              onClick={() => { handleAddToSale(item.id, salePrice) }}
                              style={{ textAlign: "center" }}
                            >
                              {!addSaleloading && <span> Add to Sale </span>}
                              <Spinner color="primary" style={{ display: addSaleloading ? "block" : "none", marginLeft: "45%" }} />
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
