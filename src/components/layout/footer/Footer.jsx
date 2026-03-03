import React from "react";
import MyntraShoppingText from "./MyntraShoppingText";
import PopularSearchFooter from "../PopularSearchFooter";
import FooterLinks from "./FooterLinks";

export default function Footer() {
  return (
    <div style={{ backgroundColor: "gray", marginTop: "31.25rem" }}>
      <FooterLinks />
      <PopularSearchFooter />
      <MyntraShoppingText />
    </div>
  );
}
