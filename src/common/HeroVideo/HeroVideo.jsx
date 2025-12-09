import React from 'react'
import './HeroVideo.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from "react-router-dom";
import ReactPlayer from 'react-player';
import HomeCard from '../HomeCard/HomeCard';
const video = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
import CategoryCard from '../CategoryCard/CategoryCard';
import chromecross from '../../assets/chrome_cross.png'
export const HeroVideo = () => {
  return (
    <>

    <div className="hero-video-container">
    <div className="separator">

    </div>
      <div className="testo-video">
        <h1 className = "title-video">Prodotti</h1>
        <img src={chromecross} alt="Chrome Cross" className="chrome-cross" />
      </div>
      <CategoryCard title="INCHIOSTRO" imageUrl="https://images.pexels.com/photos/4123711/pexels-photo-4123711.jpeg" path="/inchiostro" />
      <CategoryCard title="MACCHINETTE" imageUrl="https://tattoounleashed.com/cdn/shop/articles/the-pros-and-cons-of-different-tattoo-machines-198448.jpg?v=1715856207" path="/macchinette" />
      <CategoryCard title="ACCESSORI" imageUrl="https://www.bikerringshop.com/cdn/shop/products/gothic-jewelry-ornate-wallet-chain-silver.jpg?v=1763893478" path="/accessori" />
    </div>


</>


  )
}

export default HeroVideo
