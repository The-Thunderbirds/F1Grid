import React from "react";

import { Container, Row, Col, Card, CardHeader, ListGroup, ListGroupItem } from "reactstrap";
import CommonSection from "@/components/ui/Common-section/CommonSection";
import styles from "@/styles/Series.module.css";

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
const Series = () => {
  return (
    <>  
      <CommonSection title="Create Series" />

      <section>
        <Container>
          <Row className="mb-5">
            <Col>
              <div className="create__item">
                <form>
                  <div className="form__input">
                    <label htmlFor="">Series Name</label>
                    <input type="text" placeholder="Enter series name" />
                  </div>
                </form>
              </div>
              <button
            className="bid__btn d-flex align-items-center gap-1"
            onClick={() => {}}
          >
             Create Series
          </button>

            </Col>
          </Row>
          <Row>
          <h4 className={styles.label} >List of Created Series</h4>
          {series.map((item, index) => (
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

export default Series;
