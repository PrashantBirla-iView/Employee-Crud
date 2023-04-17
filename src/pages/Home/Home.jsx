import React from "react";
import "../Home/Home.css";
import image1 from "../Home/Image/green-front-sweater_125540-736.avif";
import image2 from "../Home/Image/pink-sweater-front_125540-746.avif";
import image3 from "../Home/Image/blue-t-shirt_125540-727.avif";
import image4 from "../Home/Image/t-shirt-mockup_569343-10.avif";
import image5 from "../Home/Image/black-front-sweater_125540-763.avif";

function Home() {
  return (
    <>
      <section>
        <div className="home-page">
          <div className="container">
            <div className="row">
              <div className="col-md-12 left">
                <div className="image1">
                  <img src={image1} alt="" />
                </div>
                <div className="tagline">
                  <h1>
                    <b>Style up your wardrobe with WARDROBE</b>
                  </h1>
                </div>
                <div className="image2">
                  <img src={image2} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-2 pt-5">
        <div className="col-md-12 left">
          <div className="image1">
            <img src={image3} alt="" />
          </div>
          <div className="image2">
            <img src={image4} alt="" />
          </div>
          <div className="image3">
            <img src={image5} alt="" />
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
