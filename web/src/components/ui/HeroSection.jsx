import React from "react";
import { Container, Row, Col } from "reactstrap";
import Link from "next/link";
import Image from "next/image";
import ReactPlayer from "react-player";
import heroImg from "../../assets/images/hero.jpg";

const HeroSection = () => {
  return (
    <section className="hero__section">
      <Container>
        <Row>
          <Col lg="5" md="6">
            <div className="hero__content">
              <h2>
              Own Incredible Moments From 2022 F1 Season.
                <span>Live Now.</span>
              </h2>
              <p>
              From rookies to legends, now you can own video highlights from your favorite F1 and F2 teams and players as Top Speed Moments.
              </p>

              <div className="hero__btns d-flex align-items-center gap-4">
                <button className=" explore__btn d-flex align-items-center gap-2">
                  <i className="ri-rocket-line"></i>{" "}
                  <Link href="/market">Explore</Link>
                </button>
              </div>
            </div>
          </Col>

          <Col lg="5" md="6 ">
            <div className="hero__img"       
>
            <ReactPlayer
            url="https://streamable.com/ad0kul"
            loop={true}
            muted={true}
            playing={true}
            style={{
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 0 70px #CB2D3E',
              borderRadius: '12px'
            }}
          />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
