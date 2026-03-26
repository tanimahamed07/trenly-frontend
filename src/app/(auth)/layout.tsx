"use client"
import React, { useEffect, useState } from "react";

const Auth = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("theme") || "light";
    document.querySelector("html")?.setAttribute("data-theme", storedTheme);
  }, []);
  return <div>{children}</div>;
};

export default Auth;
