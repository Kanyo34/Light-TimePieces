import React from 'react'
import './AboutUs.css';
import NavBar from './NavBar';
const AboutUs = () => {
  return (
    <div>
        
    
    <header>
        <div class="header-container">
           <NavBar />
        </div>
    </header>

    <section class="hero">
        <div class="hero-content">
            <h1>ABOUT LIGHT</h1>
            <p>Discover the legacy of precision, craftsmanship, and timeless elegance that defines the world's most iconic watch destributers.</p>
        </div>
    </section>

    <div class="container">
        

        <section class="craftsmanship">
            <div class="container">
                <h2>Our Craftsmanship</h2>
              
                
                <div class="craftsmanship-grid">
                    <div class="craft-item">
                        <i class="fas fa-gem"></i>
                        <h3>Materials Excellence</h3>
                        <p>We develop our own exclusive alloys like 904L stainless steel and Everose gold, ensuring unmatched durability and beauty.</p>
                    </div>
                    <div class="craft-item">
                        <i class="fas fa-cogs"></i>
                        <h3>Fast Delivery</h3>
                        <p>We have our own delivery services that will ensure your pruducts will be delivered</p>
                    </div>
                    
                    <div class="craft-item">
                        <i class="fas fa-eye"></i>
                        <h3>Quality Control</h3>
                        <p>Every component undergoes rigorous testing, with final inspections lasting weeks to ensure perfection.</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="commitment-section">
            <h2>Our Commitment</h2>
         
            
            <div class="commitment-items">
                <div class="commitment-item text-white">
                    <h3>Sustainability</h3>
                    <p>We implement responsible sourcing practices and environmental initiatives throughout our production process.</p>
                </div>
               
                <div class="commitment-item text-white">
                    <h3>Heritage</h3>
                    <p>We preserve traditional watchmaking skills while continuously innovating for the future.</p>
                </div>
            </div>
        </section>
    </div>

    </div>
  )
}

export default AboutUs