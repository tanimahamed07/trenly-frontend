import AboutBanner from "@/components/about/Banner";
import OurStory from "@/components/about/OurStory";
import OurTeam from "@/components/about/OurTeam";
import React from "react";

const page = () => {
  return (
    <div>
      <AboutBanner></AboutBanner>
      <OurStory></OurStory>
      <OurTeam></OurTeam>
    </div>
  );
};

export default page;
