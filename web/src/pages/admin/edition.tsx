import React from "react";

import { Container, Row, Col, Form, FormGroup, Label, Input } from "reactstrap";
import CommonSection from "@/components/ui/Common-section/CommonSection";
import styles from "@/styles/Series.module.css";
import { NFT__DATA } from "@/assets/data/data.js";
import NftCard from "@/components/ui/Nft-card/NftCard";

//create an array of series 
const series = [
  {
    title: "Series 1",
   },
  {
    title: "Series 2",
  },
  {
    title: "Series 3",
  },
];
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
const Series = () => {
  return (
    <>  
      <CommonSection title="Create Edition" />

      <section>
        <Container>
          <Row className="mb-5">
            <Col>
            <Form >
            <FormGroup >
    <Label for="exampleSelect" style={{color: "white"}}>
      Select Series
    </Label>
    <Input
      id="exampleSelect"
      name="select"
      type="select"
      className="bg-dark"
      style={{color: "white", border: "none"}}
    >
    {series.map((item) => (
         <option> {item.title} </option>)    
    )}
    </Input>
  </FormGroup>
  <FormGroup>
    <Label for="exampleSelect" style={{color: "white"}}>
      Select Set
    </Label>
    <Input
      id="exampleSelect"
      name="select"
      type="select"
      className="bg-dark"
      style={{color: "white", border: "none"}}
    >
          {set.map((item) => (
         <option> {item.title} </option>)    
    )}
    </Input>
  </FormGroup>
  <FormGroup>
    <Label for="exampleSelect" style={{color: "white"}}>
      Select Play
    </Label>
    <Input
      id="exampleSelect"
      name="select"
      type="select"
      className="bg-dark"
      style={{color: "white", border: "none"}}
    >
      {NFT__DATA.map((item) => (
         <option> {item.title} </option>)    
    )}
    </Input>
  </FormGroup>
  
  </Form>
              <button
            className="bid__btn d-flex align-items-center gap-1"
            onClick={() => {}}
          >
             Create Edition
          </button>

            </Col>
          </Row>
          <Row className="mt-4">
          <h4 className={styles.label} >List of Created Editions</h4>
          {NFT__DATA.map((item) => (
              <Col lg="3" md="4" sm="6" className="mb-4" key={item.id}>
                <NftCard item={item} nopurchase={true} />
            </Col>
          ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Series;
