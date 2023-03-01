import React from "react";
import { Container, Row, Col } from "reactstrap";
import Link from "next/link";


const STEP__DATA = [
  {
    title: "Setup your wallet",
    desc: "You can use either niftory for walletless onboaring or use lilico wallet for traditional web3 onbarding enabling a hybrid solution.",
    icon: "ri-wallet-line",
  },

  {
    title: "Create your collection",
    desc: "Each user creates their own collection which will stor all their owned moments. A sale collection stores a persons on sale items.",
    icon: "ri-layout-masonry-line",
  },

  {
    title: "Add your NFTs",
    desc: "NFTs can be bought from the marketplace in 2 ways, either directly or via packs where random nfts are added to your colelction",
    icon: "ri-image-line",
  },

  {
    title: "List them for sale",
    desc: "Upon purchasing any NFT or card pack, they can also be relisted for sale at a different price enabling a reselling marketplace",
    icon: "ri-list-check",
  },
];

const StepSection = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-4">
            <h3 className="step__title">Create and sell your NFTs</h3>
          </Col>

          {STEP__DATA.map((item, index) => (
            <Col lg="3" md="4" sm="6" key={index} className="mb-4">
              <div className="single__step__item">
                <span>
                  <i className={item.icon}></i>
                </span>
                <div className="step__item__content">
                  <h5>
                    <Link href="/wallet">{item.title}</Link>
                  </h5>
                  <p className="mb-0">{item.desc}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default StepSection;
