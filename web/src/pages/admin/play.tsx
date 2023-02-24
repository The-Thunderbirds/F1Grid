import React, { useState, useEffect } from "react";

import { Container, Row, Col, Button } from "reactstrap";
import CommonSection from "@/components/ui/Common-section/CommonSection";
import NftCard from "@/components/ui/Nft-card/NftCard";
import img from "@/assets/images/img-01.jpg";
import avatar from "@/assets/images/ava-01.png";
import styles from "@/styles/Series.module.css";
import Image from "next/image";
import { NFT__DATA } from "@/assets/data/data.js";

import { createNewPlay } from "@/fcl/transactions";
import { getAllPlays } from "@/fcl/scripts";

const Play = () => {
  let item = {
    id: "01",
    title: "Guard",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam adipisci cupiditate officia, nostrum et deleniti vero corrupti facilis minima laborum nesciunt nulla error natus saepe illum quasi ratione suscipit tempore dolores. Recusandae, similique modi voluptates dolore repellat eum earum sint.",
    imgUrl: img,
    creator: "Trista Francis",
    creatorImg: avatar,
    currentBid: 7.89,
  };

  // write code to take in photo and preview it in the NFT card
  const [preview, setPreview] = useState(item);
  //write code to take in photo and pass it in the NFT card
  const handleFile = (e) => {
    const file = e.target.files[0];
    const newItem = {
      ...item,
      imgUrl: { src: URL.createObjectURL(file), width: 4000, height: 4000 },
    };
    console.log(item, newItem);
    setPreview(newItem);
  };

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState(""); 

  const [allPlays, setAllPlays] = useState([]);

  useEffect(() => {
    getAllPlays().then((res) => {
      console.log(res)
      setAllPlays(() => res);
    })
  }, [])

  const handleSubmit = async () => {
    let metadata = [
      {key: "name", value: name},
      {key: "description", value: desc},
      {key: "thumbnail", value: "ipfs:://"},
    ]
    await createNewPlay(metadata);
  }

  return (
    <>
      <CommonSection title="Create Play" />
      <section>
        <Container>
          <button className="btn btn-primary" onClick={toggleModal} style={{position:"relative", left:"50%", top:"50%"}}>Create Play</button>
          {modal && (
          <div className="modal__wrapper">
            <div
              className="single__modal"
              style={{ width: "1200px", height: "600px" }}
            >
              <span className="close__modal">
                <i className="ri-close-line" onClick={() => setModal(false)}></i>
              </span>
              <Row>
                <Col lg="3" md="4" sm="6">
                  <h5 className="mb-4 text-light">Preview Item</h5>
                  <NftCard item={preview} nopurchase={true} />
                  <button className="btn btn-primary w-100 mt-3"
                    onClick={handleSubmit}
                  >
                    Create Item
                  </button>
                </Col>

                <Col lg="9" md="8" sm="6">
                  <div className="create__item">
                    <form>
                      <div className="form__input">
                        <label htmlFor="">Upload File</label>
                        <input
                          type="file"
                          className="upload__input"
                          onChange={handleFile}
                        />
                      </div>

                      <div className="form__input">
                        <label htmlFor="">Title</label>
                        <input type="text" placeholder="Enter Name" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
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
          <Row className="mt-4">
            <h4 className={styles.label}>List of Created Plays</h4>
            {allPlays && allPlays.map((item, index) => (
              <Col lg="3" md="4" sm="6" className="mb-4" key={index}>
                <h1>{item.name}</h1>
                <h1>{item.description}</h1>
                <h1>{item.thumbnail}</h1>
                {/* <NftCard item={item} nopurchase={true} /> */}
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Play;
