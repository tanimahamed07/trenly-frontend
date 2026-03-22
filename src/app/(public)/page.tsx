import Navbar from "@/components/shared/Navbar";
import HeroSection from "@/components/ui/Banner";
import Featured from "@/components/ui/Featured";
import Features from "@/components/ui/Features";
import Footer from "@/components/ui/Footer";
import NewArrivals from "@/components/ui/NewArrivals";
import Newsletter from "@/components/ui/Newsletter";
import PromoBanner from "@/components/ui/PromoBanner";
import Testimonials from "@/components/ui/Testimonials";
import TopRated from "@/components/ui/TopRated";
import Trending from "@/components/ui/Trending";
import React from "react";

const page = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <Features></Features>
      <Featured></Featured>
      <Trending></Trending>
      <NewArrivals></NewArrivals>
      <TopRated></TopRated>
      <Testimonials></Testimonials>
      <PromoBanner></PromoBanner>
      <Newsletter></Newsletter>
    </div>
  );
};

export default page;
