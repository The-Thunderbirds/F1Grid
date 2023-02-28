import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Link from "next/link";
import ReactPlayer from "react-player";
const HeroSection = () => {

  // Fixes hydration error caused by React Player
  const [hasWindow, setHasWindow] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, [])

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
                <button className="explore__btn d-flex align-items-center gap-2">
                  <i className="ri-rocket-line"></i>{" "}
                  <Link href="/market">Explore</Link>
                </button>
              </div>
            </div>
          </Col>

          <Col lg="5" md="6 ">
            <div className="hero__img">
              {hasWindow &&
              <ReactPlayer
                url="/F1.mp4"
                loop={true}
                muted={false}
                playing={true}
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 0 70px #CB2D3E',
                  borderRadius: '12px'
                }}
              />
              }
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
