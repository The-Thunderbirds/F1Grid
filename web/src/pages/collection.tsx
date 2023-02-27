import React, { useEffect, useState } from "react";

import { Container, Row, Col, Form, FormGroup, Label, Input, Spinner } from "reactstrap";
import CommonSection from "@/components/ui/Common-section/CommonSection";
import { NFT__DATA } from "@/assets/data/data.js";
import NFTDisplayCard from "@/components/ui/Nft-card/NFTDisplayCard";

import { _startSale } from "@/fcl/transactions";
import { getAllCollections } from "@/fcl/scripts";

import { useFlowUser } from "@/hooks/userFlowUser"
import { useRouter } from "next/router";

const Collection = () => {

  const flowUser = useFlowUser()
  const router = useRouter();

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  const [allCollections, setAllCollections] = useState([]);

  useEffect(() => {
    if (flowUser?.addr) {
      getAllCollections(flowUser.addr).then((res) => {
        setAllCollections(() => res);
      })
    }
  }, [flowUser])

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

      <section className="p-3">
        <Container>

          <Row className="mt-4" style={{ justifyContent: "space-between" }}>
            <h2 className="pb-4" style={{ textAlign: "center" }}>
              Your Moments
            </h2>
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

export default Collection;
