import React from "react";

import { Container, Row, Col, Card, CardHeader, ListGroup, ListGroupItem } from "reactstrap";
import CommonSection from "@/components/ui/Common-section/CommonSection";
import styles from "@/styles/Series.module.css";

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
  return (
    <>  
      <CommonSection title="Create Set" />

      <section>
        <Container>
          <Row className="mb-5">
            <Col>
              <div className="create__item">
                <form>
                  <div className="form__input">
                    <label htmlFor="">Set Name</label>
                    <input type="text" placeholder="Enter set name" />
                  </div>
                </form>
              </div>
              <button
            className="bid__btn d-flex align-items-center gap-1"
            onClick={() => {}}
          >
             Create Set
          </button>

            </Col>
          </Row>
          <Row>
          <h4 className={styles.label} >List of Created Sets</h4>
          {set.map((item, index) => (
          <div className={styles.pricingContainer} key={index} >
          {/* Pricing information */}
          <div className={styles.pricingInfo}>
            <div className={styles.pricingValue}>
                  {item.title}
            </div>
            </div>  
            </div>
          ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Set;
