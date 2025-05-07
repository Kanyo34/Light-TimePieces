import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

const Carousel = () => {
  return (
    <div>
        <section className="row mt-50">
  <div className="col-md-12">
    
    <div className="carousel slide" data-bs-ride="carousel" id="mycarousel">
      
      <div className="carousel-inner p-4">
        <div className="carousel-item active">
          <center><img src="images/slide.webp" className='d-block w-100' alt="" /></center>
        </div>
        <div className="carousel-item">
          <center><img src="images/slide2.avif" alt="" className="d-block w-100" /></center>
        </div>
        <div className="carousel-item">
          <center><img src="images/slide3.avif" alt="" className="d-block w-100 " /></center>
        </div>
      </div>

      
    
    </div>
  </div>
</section>
    </div>
  )
}

export default Carousel