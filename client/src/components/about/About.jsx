import React from "react";
import Back from "../common/Back";
import Heading from "../common/Heading";
import img from "../images/about.jpg";
import "./about.css";

const About = () => {
  return (
    <>
      <section className="about">
        <Back name="About Us" title="About Us - Who We Are?" cover={img} />
        <div className="container flex mtop">
          <div className="left row">
            <Heading
              title="Our Story"
              subtitle="Welcome to RSTATE, your premier destination for finding the perfect flat or room."
            />

            <p className="justice">
              Our mission is to simplify the process of finding a place to call
              home. We believe that everyone deserves a safe, comfortable, and
              inspiring living environment, regardless of their background or
              budget. Our platform is designed to empower renters by providing
              them with a seamless and user-friendly experience to discover the
              ideal living space.
            </p>
            <p className="justice">
              We understand that finding a comfortable and suitable living space
              is a crucial part of creating a fulfilling lifestyle. That's why
              we've created a platform that connects renters with a diverse
              range of options to meet their unique preferences and needs.
            </p>
          </div>
          <div className="right row">
            <img src="./immio.jpg" alt="" />
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
