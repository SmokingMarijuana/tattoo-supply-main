import React, { useState, useEffect } from "react";
import "./Home.css"
import { Hero } from "../../common/Hero/Hero";
import HeroVideo from "../../common/HeroVideo/HeroVideo";

export const Home = () => {
    return (
        <>
            <Hero />
            <HeroVideo />
        </>
    )
}