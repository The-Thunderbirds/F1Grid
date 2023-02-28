import React, { useState, useEffect } from "react";

import { NFTStorage } from "nft.storage";

import { Container, Row, Col, Spinner } from "reactstrap";
import CommonSection from "@/components/ui/Common-section/CommonSection";
import NftCard from "@/components/ui/Nft-card/NftCard";
import PlayCard from "@/components/ui/Nft-card/PlayCard";
import img from "@/assets/images/cars/ferrari.png";
import avatar from "@/assets/images/ava-01.png";
import styles from "@/styles/Series.module.css";
import Image from "next/image";
import { createNewPlay } from "@/fcl/transactions";
import { getAllPlays } from "@/fcl/scripts";
import { getImageFromTokenId } from "@/utility";
import { NFT__DATA } from "@/assets/data/data";
import PageLoader from "@/components/ui/PageLoader";

const Play = () => {
  const [pageLoading, setPageLoading] = useState(true);

  let item = {
    id: "01",
    title: "Guard",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam adipisci cupiditate officia, nostrum et deleniti vero corrupti facilis minima laborum nesciunt nulla error natus saepe illum quasi ratione suscipit tempore dolores. Recusandae, similique modi voluptates dolore repellat eum earum sint.",
    imgUrl: img,
    creator: "Trista Francis",
    creatorImg: avatar,
    currentBid: 7.89,
  };

  const [preview, setPreview] = useState(item);

  const dataURItoBlob = (dataURI) => {
    var byteString = atob(dataURI.split(",")[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    var bb = new Blob([ab], { type: "image/*" });
    return bb;
  };

  const fileToDataUri = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.readAsDataURL(file);
    });

  const [dataUri, setDataUri] = useState("");

  const handleFile = (e) => {
    const file = e.target.files[0];
    const newItem = {
      ...item,
      imgUrl: { src: URL.createObjectURL(file), width: 500, height: 150 },
    };
    setPreview(newItem);

    fileToDataUri(file).then((uri: any) => {
      setDataUri(uri);
    });
  };
  const [loading, setLoading] = useState(false);

  const uploadOnIPFS = async () => {
    setLoading(true);
    try {
      var image = dataURItoBlob(dataUri);
      const client = new NFTStorage({
        token: process.env.NEXT_PUBLIC_NFT_STORAGE,
      });
      const nft = { name, description: desc, image: image };
      const metadata = await client.store(nft);

      var storageUrl = metadata.url;
      const ipfslink = await getImageFromTokenId(storageUrl);
      setLoading(false);
      window.alert("Successfully stored on IPFS");
      // const ipfslink = "https://bafybeif52s3h2prjfd2awb2vjaxdi5kvg2jhh54cq3ihlkivws3h6fdmpe.ipfs.nftstorage.link/blob";
      return ipfslink;
    } catch (err) {
      console.log(err);
      setLoading(false);
      window.alert("an error has occured, try again!");
    }
  };

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [driver, setDriver] = useState("");
  const [team, setTeam] = useState("");
  const [track, setTrack] = useState("");
  const [date, setDate] = useState("");
  const [allPlays, setAllPlays] = useState([]);

  useEffect(() => {
    setPageLoading(true);
    getAllPlays().then((res) => {
      setAllPlays(() => res);
      setPageLoading(false);
    });
  }, []);

  const handleSubmit = async () => {
    const ipfs = await uploadOnIPFS();

    let metadata = [
      { key: "name", value: name },
      { key: "description", value: desc },
      { key: "thumbnail", value: ipfs },
      { key: "driver", value: driver },
      { key: "team", value: team },
      { key: "track", value: track },
      { key: "date", value: date }
    ];
    setLoading(true);
    const res = await createNewPlay(metadata);
    setLoading(false);
    if (res) {
      window.alert("Successfully created");
      setModal(false);
      window.location.reload();
    } else {
      window.alert("an error has occured, try again!");
    }
  };

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <>
      <CommonSection title="Create Play" />
      <section>
        <Container>
          {modal && (
            <div className="modal__wrapper">
              <div
                className="single__modal"
                style={{ width: "1200px", height: "600px" }}
              >
                <span className="close__modal">
                  <i
                    className="ri-close-line"
                    onClick={() => setModal(false)}
                  ></i>
                </span>
                <Row>
                  <Col lg="6" md="4" sm="6">
                    <h5 className="mb-4 text-light">Preview Item</h5>
                    <div className="single__nft__card">
                      <div className="nft__img">
                        <Image src={preview.imgUrl} alt="" width={450} />
                      </div>
                    </div>
                    <button
                      className="bid__btn w-50 mt-3"
                      onClick={handleSubmit}
                      style={{ marginLeft: "20%" }}
                    >
                      {!loading && <span>Create Play</span>}
                      <Spinner
                        color="primary"
                        style={{
                          display: loading ? "block" : "none",
                          marginLeft: "42%",
                        }}
                      />
                    </button>
                    <div className="form__input">
                          <label htmlFor="">Upload File</label>
                          <input
                            type="file"
                            className="upload__input"
                            onChange={handleFile}
                          />
                        </div>

                  </Col>

                  <Col lg="6" md="8" sm="6">
                    <div className="create__item">
                      <form>


                        <div className="form__input">
                          <label htmlFor="">Title</label>
                          <input
                            type="text"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        
                        <div
                          style={{ display: "flex", justifyContent: "space-between" }}
                        >
                          <div className="form__input" style={{width:"45%"}}>
                            <label htmlFor="">Driver</label>
                            <input
                              type="text"
                              placeholder="Enter Driver"
                              value={driver}
                              onChange={(e) => setDriver(e.target.value)}
                            />
                          </div>
                          <div className="form__input" style={{width:"45%"}}>
                            <label htmlFor="">Team</label>
                            <input
                              type="text"
                              placeholder="Enter Team"
                              value={team}
                              onChange={(e) => setTeam(e.target.value)}
                            />
                          </div>
                        </div>
                        <div
                          style={{ display: "flex", justifyContent: "space-between", }}
                        >
                          <div className="form__input" style={{width:"45%"}}>
                            <label htmlFor="">Track</label>
                            <input
                              type="text"
                              placeholder="Enter Track"
                              value={track}
                              onChange={(e) => setTrack(e.target.value)}
                            />
                          </div>
                          <div className="form__input" style={{width:"45%"}}>
                            <label htmlFor="">Date</label>
                            <input
                              type="date"
                              placeholder="Enter Date"
                              value={date}
                              onChange={(e) => setDate(e.target.value)}
                            />
                          </div>
                          
                        </div>  
                        <div className="form__input">
                          <label htmlFor="">Description</label>
                          <textarea
                            name=""
                            id=""
                            rows={10}
                            placeholder="Enter description"
                            className="w-100"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                          ></textarea>
                        </div>
                        {/* <div className="form__input">
                        <label htmlFor="">Price</label>
                        <input
                          type="number"
                          placeholder="Enter price for one item"
                        />
                      </div> */}
                      </form>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          )}
          <div style={{display:"flex", justifyContent:"space-between", marginBottom:"10px"}}>
            <h4 className={styles.label}>List of Created Plays</h4>
            <button
              className="bid__btn d-flex align-items-center gap-1"
              onClick={toggleModal}
            >
              Create Play
            </button>
          </div>
          <Row className="mt-4" style={{ justifyContent: "space-around" }}>
            {allPlays &&
              allPlays.map((item, index) => (
                <Col lg="5" md="5" sm="6" className="mb-4" key={index}>
                  <PlayCard
                    item={{
                      ...NFT__DATA[0],
                      id: index + 1,
                      title: item.name,
                      desc: item.description,
                      imgUrl: {
                        src: !item.thumbnail ? img.src : item.thumbnail,
                        width: 500,
                        height: 150,
                      },
                    }}
                    nopurchase={true}
                  />
                </Col>
              ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Play;
