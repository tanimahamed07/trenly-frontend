import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/ui/Footer";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar></Navbar>
      {children}
      <Footer></Footer>
    </div>
  );
};

export default Layout;
