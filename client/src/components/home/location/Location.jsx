import React from "react";
import Heading from "../../common/Heading";
import { location } from "../../data/Data";
import "./style.css";
import { Link } from "react-router-dom";

const Location = () => {
  const data = [
    {
      imgPath: "../../../assets/category/city-1.png",
      category: "House",
    },
    {
      imgPath: "../../../assets/category/city-2.png",
      category: "Villa",
    },
    {
      imgPath: "../../../assets/category/city-3.png",
      category: "Apartment",
    },
    {
      imgPath: "../../../assets/category/city-4.png",
      category: "Office",
    },
    {
      imgPath: "../../../assets/category/city-5.png",
      category: "Flat",
    },
    {
      imgPath: "../../../assets/category/city-6.png",
      category: "Room",
    },
  ];
  return (
    <>
      <section className="location padding">
        <div className="container">
          <Heading
            title="Explore By Category"
            subtitle="Here you can find properties listed on the basis of category"
          />
          <div className="content grid3 mtop">
            {data.map((val, index) => (
              <Link to={`/category/${val.category.toLowerCase()}`} key={index}>
                <div className="box">
                  <img
                    src={require(`../../../assets/category/city-${
                      index + 1
                    }.png`)}
                    alt="loading..."
                  />
                  <div className="overlay">
                    <h5>{val.category}</h5>
                    <p>
                      <label>Explore all {val.category}</label>
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Location;
