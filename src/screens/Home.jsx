import React from "react";
import Hero from "../components/home/Hero";
import Aim from "../components/home/Aim";
import Stats from "../components/home/Stats";
import Categories from "../components/home/Categories";
import EventGallery from "../components/home/EventGallery";
import Brands from "../components/home/Brands";
import RecentEvents from "../components/home/RecentEvents";
import Appointment from "../components/home/Appointment";

const Home = () => {
  return (
    <div className="mt-56">
      <Hero />
      <Aim />
      <Stats />
      <Categories />
      <Brands  />
      {/* <EventGallery /> */}
      <RecentEvents />
      <Appointment />
    </div>
  );
};

export default Home;
