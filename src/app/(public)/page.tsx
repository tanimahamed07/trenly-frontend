import Navbar from "@/components/shared/Navbar";
import HeroSection from "@/components/ui/Banner";
import Featured from "@/components/ui/Featured";
import Features from "@/components/ui/Features";
import Trending from "@/components/ui/Trending";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar></Navbar>
      <HeroSection></HeroSection>
      <Features></Features>
      <Featured></Featured>
      <Trending></Trending>
    </div>
  );
};

export default page;
