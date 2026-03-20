import Navbar from "@/components/shared/Navbar";
import HeroSection from "@/components/ui/Banner";
import Features from "@/components/ui/Features";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar></Navbar>
      <HeroSection></HeroSection>
      <Features></Features>
    </div>
  );
};

export default page;
