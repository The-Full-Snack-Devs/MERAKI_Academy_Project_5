import React from "react";

const HowItWork = () => {
  return (
    <div>
      <h1>How to request a service</h1>

      <div className="steps">
        <div className="step">
          <img src="service-icon.png" alt="Choose Service" />
          <h3>Choose the service you need</h3>
        </div>

        <div className="step">
          <img src="parts-icon.png" alt="Choose Parts" />
          <h3>Choose the parts you need</h3>
        </div>

        <div className="step">
          <img src="location-icon.png" alt="Set Location & Time" />
          <h3>Determine your location and appropriate time</h3>
        </div>

        <div className="step">
          <img src="cart-icon.png" alt="Add to Cart" />
          <h3>Add the service to your cart</h3>
        </div>

        <div className="step">
          <img src="booking-icon.png" alt="Book Service" />
          <h3>Book the service or services you have chosen</h3>
        </div>
      </div>
    </div>
  );
};

export default HowItWork;
