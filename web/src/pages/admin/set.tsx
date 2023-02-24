import React, { useState, useEffect } from "react";

import { Container, Row, Col } from "reactstrap";
import CommonSection from "@/components/ui/Common-section/CommonSection";
import styles from "@/styles/Series.module.css";
import { NFT__DATA } from "@/assets/data/data.js";
import NftCard from "@/components/ui/Nft-card/NftCard";

import { createNewSet } from "@/fcl/transactions";
import { getAllSets } from "@/fcl/scripts";

//create an array of set
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
const Set = () => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  const [name, setName] = useState('')

  const [allSets, setAllSets] = useState([]);

  useEffect(() => {
    getAllSets().then((res) => {
      console.log(res)
      setAllSets(() => res);
    })
  }, [])


  const handleSubmit = async () => {
    await createNewSet(name);
  }


  return (
    <>
      <CommonSection title="Create Set" />

      <section>
        <Container>
          <button className="btn btn-primary" onClick={toggleModal} style={{position:"relative", left:"50%", top:"50%"}}>
            Create Set
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
                          <label htmlFor="">Name</label>
                          <input type="text" placeholder="Enter set name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </form>
                      <button className="btn btn-primary w-100 mt-3"
                      onClick={handleSubmit}
                      >
                        Create Item
                      </button>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          )}
          <Row className="mt-4">
            <h4 className={styles.label}>List of Created Sets</h4>
            {allSets.map((item, index) => (
              <div className={styles.pricingContainer} key={index}>
                {/* {console.log(item)} */}
                {/* Pricing information */}
                <div className={styles.pricingInfo} style={{ display: "flex" }}>
                  <div className={styles.pricingValue}>
                    Set Id - {item.setID}
                    Set Name -{item.name}
                    Series Id - {item.series}  
                  </div>
                  <button className="btn btn-primary">Add Play</button>
                </div>
                <Row>
                  {/* item.plays will come here */}
                  {NFT__DATA.sort(() => 0.5 - Math.random())
                    .slice(0, Math.floor(1 + Math.random() * 3))
                    .map((item) => (
                      <Col lg="3" md="4" sm="6" className="mb-4" key={item.id}>
                        <NftCard item={item} nopurchase={true} />
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
