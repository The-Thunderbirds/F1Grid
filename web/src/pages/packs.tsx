import React, { useEffect, useState } from "react";

import { Container, Row, Col, Form, FormGroup, Label, Input, Spinner } from "reactstrap";
import CommonSection from "@/components/ui/Common-section/CommonSection";
import styles from "@/styles/Series.module.css";
import { NFT__DATA } from "@/assets/data/data.js";
import NftCard from "@/components/ui/Nft-card/NftCard";
import PackDisplayCard from "@/components/ui/Nft-card/PackDisplayCard";

import { _startSale } from "@/fcl/transactions";
import { getAllPackIDs, getPackProofsByAddr } from "@/fcl/scripts";

import { useFlowUser } from "@/hooks/userFlowUser"
import { useRouter } from "next/router";

const Mint = () => {

  const flowUser = useFlowUser()
  const router = useRouter();

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  const [allPackProofs, setAllPackProofs] = useState([]);

  useEffect(() => {
    if (flowUser?.addr) {
      getPackProofsByAddr(flowUser.addr).then((res) => {
        setAllPackProofs(() => res);
      })
    }
  }, [flowUser])

  const [createdPacks, setAllCreatedPack] = useState([]);

  useEffect(() => {
    getAllPackIDs().then((res) => {
      const temp = res.find((item) => item?.owner == flowUser?.addr)
      console.log(res)
      setAllCreatedPack(() => res);
    })
  }, [flowUser])

  const [loading, setLoading] = useState(false);

  const [giftAddress, setGiftAddress] = useState("")
  const [addSaleloading, setAddSaleloading] = useState(false);

  const handleOpenPack = () => { alert("TEMPORARY: Pack has been opened, and moments are now in your collection") }
  const handleGiftPack = () => { }
  return (
    <>
      <CommonSection title="Mint Moment" />

      <section>
        <Container>
          <button
            className="bid__btn d-flex align-items-center gap-1"
            onClick={() => { router.push("/create-pack") }}
            style={{ marginLeft: "47%" }}
          >
            Create Pack
          </button>
          <Row className="mt-4" style={{ justifyContent: "space-between" }}>
            <h4 className={styles.label} >Your Purchased Packs</h4>
            {allPackProofs?.map((item, index) => (
              <Col lg="5" md="5" sm="6" className="mb-4" key={index}>
                <PackDisplayCard item={{
                  ...NFT__DATA[0],
                  id: item.packID,
                  title: item.packID,
                  creator: item.owner,
                  currentBid: item.price,
                  imgUrl: { src: !item.thumbnail ? NFT__DATA[0].imgUrl.src : item.thumbnail, width: 500, height: 150 },
                }}
                nopurchase={true} 
                />
                <div className="d-flex mt-2" style={{ justifyContent: "space-evenly" }}>
                  <button
                    className="bid__btn d-flex align-items-center gap-1"
                    onClick={handleOpenPack}
                  >
                    Open Pack
                  </button>
                </div>
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
                                <label htmlFor="">Gifting Address</label>
                                <input type="text" placeholder="Enter address"
                                  value={giftAddress}
                                  onChange={(e) => setGiftAddress(e.target.value)}
                                />
                              </div>
                            </form>
                            <button
                              className="bid__btn w-100 mt-3"
                              onClick={() => { handleGiftPack() }}
                              style={{ textAlign: "center" }}
                            >
                              {!addSaleloading && <span> Gift Pack </span>}
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

            <h4 className={styles.label} >Your Created Packs</h4>
            {createdPacks?.map((item, index) => (
              <Col lg="5" md="5" sm="6" className="mb-4" key={index}>
                <PackDisplayCard item={{
                  ...NFT__DATA[0],
                  id: item.packID,
                  title: item.packID,
                  creator: flowUser?.addr,
                  currentBid: item.price,
                  imgUrl: { src: !item.thumbnail ? NFT__DATA[0].imgUrl.src : item.thumbnail, width: 500, height: 150 },
                }}
                nopurchase={true} 
                />
                <div className="d-flex mt-2" style={{ justifyContent: "space-evenly" }}>
                  <button
                    className="bid__btn d-flex align-items-center gap-1"
                    onClick={toggleModal}
                  >
                    Gift Pack
                  </button>
                </div>
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
                                <label htmlFor="">Gifting Address</label>
                                <input type="text" placeholder="Enter address"
                                  value={giftAddress}
                                  onChange={(e) => setGiftAddress(e.target.value)}
                                />
                              </div>
                            </form>
                            <button
                              className="bid__btn w-100 mt-3"
                              onClick={() => { handleGiftPack() }}
                              style={{ textAlign: "center" }}
                            >
                              {!addSaleloading && <span> Gift Pack </span>}
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
