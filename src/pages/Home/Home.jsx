import React, { useState, useEffect } from "react";
import "./Home.css"
import { Hero } from "../../common/Hero/Hero";
import ProductList from "../../common/ProductList/ProductList";

export const Home = () => {
    return (
        <>
            <Hero />
            <ProductList />
        </>
    )
}