import React from "react";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Services from "../sections/Services";
import Industries from "../sections/Industries";
import DevelopmentProcess from "../sections/DevelopmentProcess";
import TechOrbit from "../sections/TechOrbit";
import WhyChooseUs from "../sections/WhyChooseUs";
import Products from "../sections/Products";
import Testimonials from "../sections/Testimonials";
import Contact from "../sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Industries />
      <DevelopmentProcess />
      <TechOrbit />
      <Products />
      <WhyChooseUs />
      <Testimonials />
      <Contact />
    </>
  );
}
