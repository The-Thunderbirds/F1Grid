import React, { useEffect, useState } from "react";

import { Container, Row, Col, Card, CardHeader, ListGroup, ListGroupItem } from "reactstrap";
import CommonSection from "@/components/ui/Common-section/CommonSection";
import styles from "@/styles/Series.module.css";

import { createNewSeries } from "@/fcl/transactions";
import { getAllSeries } from "@/fcl/scripts";

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

  const [name, setName] = useState('')
  const [allSeries, setAllSeries] = useState();

  useEffect(() => {
    getAllSeries().then((res) => {
      console.log(res)
    })
  }, [])
  
  const handleSubmit = async () => {
    await createNewSeries(name);
  }

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
                    <input type="text" placeholder="Enter series name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </form>
              </div>
              <button
                className="bid__btn d-flex align-items-center gap-1"
                onClick={handleSubmit}
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
