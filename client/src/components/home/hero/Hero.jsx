import React from "react";
import Heading from "../../common/Heading";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./hero.css";
import { Carousel } from "react-responsive-carousel";

const Hero = () => {
  return (
    <>
      <Carousel autoPlay={true} showThumbs={false}>
        <div>
          <h1 className="main-headings">Welcome to RSTATE</h1>
          <img
            src={require("../../../assets/city-x/city-1.png")}
            alt="loading..."
          />
          <p className="legend">The best investment on earth is earth.</p>
        </div>
        <div>
          <h1 className="main-headings">Welcome to RSTATE</h1>
          <img
            src={require("../../../assets/city-x/city-2.png")}
            alt="loading..."
          />
          <p className="legend">Buy Land, They are not making it anymore.</p>
        </div>
        <div>
          <h1 className="main-headings">Welcome to RSTATE</h1>
          <img
            src={require("../../../assets/city-x/city-3.png")}
            alt="loading..."
          />
          <p className="legend">Home is where my habits have a habitat.</p>
        </div>
        <div>
          <h1 className="main-headings">Welcome to RSTATE</h1>
          <img
            src={require("../../../assets/city-x/city-4.png")}
            alt="loading..."
          />
          <p className="legend">
            Maybe that's the best part of going away for a vacation — coming
            home again.
          </p>
        </div>
        <div>
          <h1 className="main-headings">Welcome to RSTATE</h1>
          <img
            src={require("../../../assets/city-x/city-5.png")}
            alt="loading..."
          />
          <p className="legend">
            He is not a full man who does not own a piece of land.
          </p>
        </div>
        <div>
          <h1 className="main-headings">Welcome to RSTATE</h1>
          <img
            src={require("../../../assets/city-x/city-6.png")}
            alt="loading..."
          />
          <p className="legend">
            The wise young man or wage earner of today invests his money in real
            estate.
          </p>
        </div>
      </Carousel>
    </>
  );
};

export default Hero;
