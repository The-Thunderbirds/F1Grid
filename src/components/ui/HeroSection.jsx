import React from "react";
import { Container, Row, Col } from "reactstrap";
import Link from "next/link";
import Image from "next/image"

import heroImg from "../../assets/images/hero.jpg";

const HeroSection = () => {
  return (
    <section className="hero__section">
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="hero__content">
              <h2>
                Discover rare digital art and collect
                <span>sell extraordinary</span> NFTs
              </h2>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Deleniti excepturi omnis neque adipisci sequi ullam unde in
                minus quis quos.
              </p>

              <div className="hero__btns d-flex align-items-center gap-4">
                <button className=" explore__btn d-flex align-items-center gap-2">
                  <i class="ri-rocket-line"></i>{" "}
                  <Link href="/market">Explore</Link>
                </button>
                <button className=" create__btn d-flex align-items-center gap-2">
                  <i class="ri-ball-pen-line"></i>
                  <Link href="/create">Create</Link>
                </button>
              </div>
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="hero__img">
              <Image src={heroImg} alt="" width="500" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
