import React, { useEffect, useState } from "react";

import { Container, Row, Col, Spinner } from "reactstrap";
import CommonSection from "@/components/ui/Common-section/CommonSection";
import styles from "@/styles/Series.module.css";
import { NFT__DATA } from "@/assets/data/data.js";
import PackDisplayCard from "@/components/ui/Nft-card/PackDisplayCard";
import { Grid } from "react-loader-spinner"

import { openPack, _giftPack } from "@/fcl/transactions";
import { getAllPackIDs, getPackProofsByAddr } from "@/fcl/scripts";

import { useFlowUser } from "@/hooks/userFlowUser"
import { useRouter } from "next/router";
import PageLoader from "@/components/ui/PageLoader";
import packImg from "../assets/images/multipack_4_2.png"
import packImg2 from "../assets/images/value_pack_front_1_.png"
import { getAddrByName } from "@/api/flowns";
const Mint = () => {

  const flowUser = useFlowUser()
  const router = useRouter();

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  const [openModal, setOpenModal] = useState(false);
  const toggleOpenModal = () => setOpenModal(!openModal);

  const [pageLoading, setPageLoading] = useState(true)

  const [allPackProofs, setAllPackProofs] = useState([]);

  useEffect(() => {
    if (flowUser?.addr) {
      setPageLoading(true)
      getPackProofsByAddr(flowUser.addr).then((res) => {
        setAllPackProofs(() => res);
        setPageLoading(false)
      })
    }
  }, [flowUser])

  const [createdPacks, setAllCreatedPack] = useState([]);

  useEffect(() => {
    if (flowUser?.addr) {
      setPageLoading(true)
      getAllPackIDs().then((res) => {
        const temp = res.filter((item) => item.owner === flowUser?.addr)
        setAllCreatedPack(() => temp);
        setPageLoading(false)
      })
    }
  }, [flowUser])

  const [loading, setLoading] = useState(false);

  const [giftAddress, setGiftAddress] = useState("")
  const [fns, setFns] = useState("")
  const [giftLoading, setGiftLoading] = useState(false);

  const [recievedMoments, setReceievedMoments] = useState(null); //TODO: DIVYAM

  const handleOpenPack = async (seller, packId) => { 
    setOpenModal(true)
    setLoading(true)
    const result = await openPack(seller, packId);
    if (result) {
      alert("Pack opened successfully")      
      setLoading(false)
      setReceievedMoments(result)
      // router.push({
      //   "pathname": "/collection"
      // })
    }
    else {
      alert("Something went wrong")
      setLoading(false)
    }
  }

  const handleFnsChange = async (e) => {
    setFns(e.target.value);
    const res = await getAddrByName(e.target.value);
    setGiftAddress(res);
  }
  const handleGiftPack = async (packId, addr) => { 
    setGiftLoading(true)
    const result = await _giftPack(packId, addr);
    if (result) {
      alert("Gift sent successfully")
      setGiftLoading(false)
      window.location.reload()
    }
    else {
      alert("Something went wrong")
      setGiftLoading(false)
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
                  imgUrl: Math.floor((Math.random() * 2) + 1) == 1?packImg:packImg2
                }}
                  nopurchase={true}
                />
                <div className="d-flex mt-2" style={{ justifyContent: "space-evenly" }}>
                  <button
                    className="bid__btn d-flex align-items-center gap-1"
                    onClick={() => {handleOpenPack(item.owner, item.packID)}}
                  >
                    Open Pack
                    {/* {!loading && <span> Open Pack </span>}
                    <Spinner color="primary" style={{ display: loading ? "block" : "none" }} />                     */}
                  </button>
                </div>
              </Col>
            ))}
            {openModal && (
                  <div className="modal__wrapper">
                    <div
                      className="single__modal"
                      style={{
                        width: "1200px",
                        height: "700px",
                        borderRadius: "15px",
                      }}
                    >
                      <span className="close__modal">
                        <i className="ri-close-line" onClick={() => setOpenModal(false)}></i>
                      </span>
                      <Row className="mb-5">
                        <Col>
                        <h4 className={styles.label} >Moments You Recieved</h4>
                        {!recievedMoments && 
                        <div style={{textAlign:"center"}}>
                        <div style={{display:"flex", justifyContent:"center", marginTop:"20%"}}>
                          <Grid
                          height="80"
                          width="80"
                          color="#cb2d3e"
                          ariaLabel="grid-loading"
                          radius="12.5"
                          wrapperStyle={{}}
                          wrapperClass=""
                          visible={true}
                          />
                          </div>
                      <h4 style={{color:"white", marginTop:"20px"}}> Opening the Pack</h4>                        
                      </div>
                    }
                    {recievedMoments &&(
                            allPackProofs?.map((item, index) => (
                              <Col lg="5" md="5" sm="6" className="mb-4" key={index}>
                                <PackDisplayCard item={{
                                  ...NFT__DATA[0],
                                  id: item.packID,
                                  title: item.packID,
                                  creator: item.owner,
                                  currentBid: item.price,
                                  imgUrl: Math.floor((Math.random() * 2) + 1) == 1?packImg:packImg2
                                }}
                                  nopurchase={true}
                                />
                              </Col>
                            ))
                            )}
                        </Col>
                      </Row>
                    </div>
                  </div>
                )}
            <h4 className={styles.label} >Your Created Packs</h4>            
            {createdPacks?.map((item, index) => (
              !item.soldComplete &&
              <Col lg="5" md="5" sm="6" className="mb-4" key={index}>
                <PackDisplayCard item={{
                  ...NFT__DATA[0],
                  id: item.packID,
                  title: item.packID,
                  creator: flowUser?.addr,
                  currentBid: item.price,
                  imgUrl: Math.floor((Math.random() * 2) + 1) == 1?packImg:packImg2
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
                        height: "300px",
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
                                <label htmlFor="">Flowns</label>
                                <input type="text" placeholder="Enter flowns"
                                  value={fns}
                                  onChange={handleFnsChange}
                                />
                              </div>
                              <p style={{color:"white", textAlign:"center"}}>(or)</p>
                              <div className="form__input">
                                <label htmlFor="">Wallet Address</label>
                                <input type="text" placeholder="Enter wallet address"
                                  value={giftAddress}
                                  onChange={(e) => setGiftAddress(e.target.value)}
                                />
                              </div>
                            </form>
                            <button
                              className="bid__btn w-100 mt-3"
                              onClick={() => { handleGiftPack(item.packID, giftAddress) }}
                              style={{ textAlign: "center" }}
                            >
                              {!giftLoading && <span> <i className="ri-gift-line"></i> Gift Pack </span>}
                              <Spinner color="primary" style={{ display: giftLoading ? "block" : "none", marginLeft: "45%" }} />
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
