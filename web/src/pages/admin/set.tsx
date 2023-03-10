import React, { useState, useEffect } from "react";

import { Container, Row, Col, FormGroup, Label, Input, Spinner } from "reactstrap";
import CommonSection from "@/components/ui/Common-section/CommonSection";
import styles from "@/styles/Series.module.css";
import { NFT__DATA } from "@/assets/data/data.js";
import PlayCard from "@/components/ui/Nft-card/PlayCard";

import { createNewSet, addPlayToSet } from "@/fcl/transactions";
import { getAllSets, getAllPlays } from "@/fcl/scripts";
import PageLoader from "@/components/ui/PageLoader";

const Set = () => {

  const [pageLoading, setPageLoading] = useState(true)

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  const [addPlayModal, setAddPlayModal] = useState(false);
  const [addPlayModalSetId, setAddPlayModalSetId] = useState("0");
  const [addPlayModalPlayId, setAddPlayModalPlayId] = useState("1");
  const toggleAddPlayModal = (val) => {
    setAddPlayModal(!modal);
    setAddPlayModalSetId(val)
  }

  const [name, setName] = useState('')

  const [allSets, setAllSets] = useState([]);

  useEffect(() => {
    setPageLoading(true)
    getAllSets().then((res) => {
      setAllSets(() => res);
      console.log(res)
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

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true)
    const result = await createNewSet(name);
    if (result) {
      alert("Set created successfully")
      setLoading(false)
      setModal(false)
      window.location.reload();
    }
    else {
      alert("Something went wrong")
      setLoading(false)

    }

  }

  const handleAddPlaySubmit = async (setId, playId) => {
    setLoading(true)
    const res = await addPlayToSet(setId, playId)
    if (res) {
      alert("Play added successfully")
      setLoading(false)
      setAddPlayModal(false)
      window.location.reload();
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
      <CommonSection title="Create Set" />

      <section>
        <Container>

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
                          <label htmlFor="">Name</label>
                          <input type="text" placeholder="Enter set name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </form>
                      <button
                        className="bid__btn w-100 mt-3"
                        onClick={handleSubmit}
                      >
                        {!loading && <span> Create Set </span>}
                        <Spinner color="primary" style={{ display: loading ? "block" : "none", marginLeft: "42%" }} />

                      </button>

                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          )}

          {addPlayModal && (
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
                  <i className="ri-close-line" onClick={() => setAddPlayModal(false)}></i>
                </span>
                <Row className="mb-5">
                  <Col>
                    <div className="create__item">
                      <form>
                        <div className="form__input">
                          <label htmlFor="">Set ID</label>
                          <input type="text"
                            value={addPlayModalSetId}
                            className="bg-dark"
                            onChange={(e) => setAddPlayModalSetId(e.target.value)}
                          />
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
                              onChange={(e) => setAddPlayModalPlayId(e.target.value)}
                            >
                              {allPlays.map((item, index) => (
                                <option key={index} value={index + 1}>
                                  {item.name}
                                </option>
                              )
                              )}
                            </Input>
                          </FormGroup>
                        </div>
                      </form>
                      <button
                        className="bid__btn w-100 mt-3"
                        onClick={() => { handleAddPlaySubmit(addPlayModalSetId, addPlayModalPlayId) }}
                      >
                        {!loading && <span>Add Play</span>}
                        <Spinner color="primary" style={{ display: loading ? "block" : "none", marginLeft: "42%" }} />
                      </button>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          )}


          <div style={{display:"flex", justifyContent:"space-between", marginBottom:"15px"}}>
            <h4 className={styles.label}>List of Created Sets</h4>
            <button
            className="bid__btn d-flex align-items-center gap-1"
            onClick={toggleModal}
          >
            Create Set
          </button>
          </div>
          <Row className="mt-4">
            {allSets && allSets.map((item, index) => (
              <div className={styles.pricingContainer} key={index}>
                <div className={styles.pricingInfo} style={{ display: "flex" }}>
                  <div className={styles.pricingValue}>
                    {item.name} (Set {item.setID}, Series {item.series})
                  </div>
                  <button
                    className="bid__btn"
                    onClick={() => toggleAddPlayModal(item.setID)}
                  >
                    Add Play
                  </button>
                </div>
                <Row style={{ justifyContent: "space-around" }}>
                  {item.playMetadata.map((play, playIdx) => (
                    <Col lg="5" md="5" sm="6" className="mb-4" key={playIdx}>
                      <PlayCard
                        item={{
                          ...NFT__DATA[0],
                          id: item.plays[playIdx],
                          title: play.name,
                          desc: play.description,
                          imgUrl: {
                            src: !play.thumbnail
                              ? NFT__DATA[0].imgUrl.src
                              : play.thumbnail,
                            width: 432,
                            height: 128,
                          },
                          minted: item.numberMintedPerPlay[item.plays[playIdx]]
                        }}
                        nopurchase={true}
                      />

                    </Col>
                  ))}
                </Row>
              </div>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Set;
