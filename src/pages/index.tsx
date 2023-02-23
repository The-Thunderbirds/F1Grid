import React from "react";

import HeroSection from "@/components/ui/HeroSection";
import LiveAuction from "@/components/ui/Live-auction/LiveAuction";
import SellerSection from "@/components/ui/Seller-section/SellerSection";
import Trending from "@/components/ui/Trending-section/Trending";
import StepSection from "@/components/ui/Step-section/StepSection";

import "bootstrap/dist/css/bootstrap.css";
import "remixicon/fonts/remixicon.css";

export default function Home() {
  return (
    <>
      <HeroSection />
      <LiveAuction />
      <SellerSection />
      <Trending />
      <StepSection />
    </>
  )
}
