import React from "react";
import "./AboutUs.css";
import img1 from "../../assets/image1.jpg"
import img2 from "../../assets/image.png"
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";




const reviews = [
    {
      name: "Karthick",
      role: "Business Executive",
      comment:
        "The best car rental experience I've ever had. The vehicles are immaculate and the service is unmatched.",
      rating: 5,
      image:
      
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
    },
    {
      name: "Elena",
      role: "Travel Blogger",
      comment:
        "WheelWise made my road trip perfect. Their attention to detail and customer service is exceptional.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
    },
    {
      name: "Madan",
      role: "Entrepreneur",
      comment:
        "Seamless booking process and top-notch vehicles. WheelWise is my go-to for all car rentals.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80",
    },
];


const  AboutUs = () => {
    const navigate = useNavigate();
    const handleGetStartedClick = () => {
        navigate("/home");
    };
   
  return (
    <section className="about-us-section">
      <div className="about-us-container">
        <div className="about-us-grid">
          <div className="about-us-image-grid">
            <img
              src={img1}
              alt="Luxury car front"
              className="about-us-image first"
            />
           
          </div>
          <div className="about-us-text-content">
            <h2>
              Experience <span className="highlight">Luxury</span> on Wheels
            </h2>
            <div className="description">
              <h3>Who We Are ?</h3>
              <p>
                Welcome to Wheelwise, your number one source for all things car
                rental. We're dedicated to giving you the very best of rental
                services, with a focus on reliability, customer service, and
                uniqueness.
    
                We now serve customers all over the country and are thrilled
                that we're able to turn our passion into our own website. We
                hope you enjoy our services as much as we enjoy offering them to
                you. If you have any questions or comments, please don't
                hesitate to contact us.
              </p>
              <p className="about-us-signature">Sincerely, The Wheelwise Team</p>
            </div>
            <button className="about-us-cta-button" onClick={handleGetStartedClick} >View Cars</button>
          
          </div>
        </div>
        <div className="about-us-mission-vision">
          <div className="about-us-mission">
            <h3>Our Mission</h3>
            <p>
              Our mission is to provide the highest quality car rental service,
              making every customer’s journey unforgettable. We aim to provide
              reliable, convenient, and affordable vehicles for travelers,
              ensuring their comfort and safety.
            </p>
          </div>
          <div className="about-us-vision">
            <h3>Our Vision</h3>
            <p>
              Our vision is to be the leading car rental service provider
              globally, revolutionizing the way people experience travel by
              offering innovative solutions and unparalleled service.
            </p>
          </div>
        </div>

        <section className="about-us-reviews-section">
  <div className="about-us-reviews-container">
    <h2>What Our Clients Are Saying</h2>
    <div className="about-us-reviews-grid">
      {reviews.map((review, index) => (
        <div key={index} className="about-us-review-card">
          <div className="about-us-review-header">
            <img
              className="about-us-review-image"
              src={review.image}
              alt={review.name}
            />
            <div>
              <h3 className="about-us-h3">{review.name}</h3>
              <div className="about-us-role">{review.role}</div>
            </div>
          </div>
          <div className="about-us-review-rating">
            {[...Array(review.rating)].map((_, idx) => (
              <span key={idx} className="about-us-star">★</span>
            ))}
          </div>
          <p className="about-us-review-comment">{review.comment}</p>
        </div>
      ))}
    </div>
  </div>
</section>

      </div>
    </section>
  );
}
export default AboutUs;