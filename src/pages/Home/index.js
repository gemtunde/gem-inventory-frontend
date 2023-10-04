import React from "react";
import { RiProductHuntLine } from "react-icons/ri";
import { Link } from "react-router-dom";

//since my node version is node 18.16.1, hence i used npm install --save-dev node-sass@8.0.0
//for my sass setup/installation

import "./Home.scss";
import HeroImg from "../../assets/inv-img.png";
import { ShowOnLogin, ShowOnLogout } from "../../Components/HiddenLinks";

const Home = () => {
  return (
    <div className="home">
      <nav className="container --flex-between">
        <div className="logo">
          <RiProductHuntLine size={35} />
        </div>
        <ul className="home-links">
          <ShowOnLogout>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/register">Register </Link>
              </button>
            </li>
          </ShowOnLogout>
          <ShowOnLogout>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/login">Login </Link>
              </button>
            </li>
          </ShowOnLogout>
          <ShowOnLogin>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/dashboard">Dashboard</Link>
              </button>
            </li>
          </ShowOnLogin>
        </ul>
      </nav>
      {/* HERO SECTION  */}
      <div className="container hero">
        <div className="hero-text">
          <h2>Inventory {" & "} Stock Management</h2>
          <p>
            Inventory system to control and manage products in the warehouse in
            realtime and integrated to make it easier to develop your business
          </p>
          <div className="hero-buttons">
            <button className="--btn --btn-secondary">
              <Link to="/dashboard">Free Trial 1 Month </Link>
            </button>
          </div>
          <div className="--flex-start">
            <NumberText num="14k" text="Brand Owners" />
            <NumberText num="23k" text="Active Users" />
            <NumberText num="500+" text="Partners" />
          </div>
        </div>
        <div className="hero-image">
          <img src={HeroImg} alt="inventory" />
        </div>
      </div>
    </div>
  );
};

export default Home;

const NumberText = ({ num, text }) => {
  return (
    <div className="--mr">
      <h3 className="--color-white">{num}</h3>
      <p className="--color-white">{text}</p>
    </div>
  );
};
