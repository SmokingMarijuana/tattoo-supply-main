import React from 'react'
import './Hero.css'

export const Hero = () => {
  return (
    <div className="hero-image">
      <div className = "text-container">
        <div className="hero-text">
          <h1><b>Prodotti professionali<br></br> per tatuatori</b></h1><br></br>
          <p>Aghi, inchiostri e attrezzatura di qualità per il tuo studio.</p><br></br>
                    
          <button action = "/shop"><a href="/shop">Scopri i prodotti</a></button>
        </div>
      </div>
     
    </div>
  )
}

