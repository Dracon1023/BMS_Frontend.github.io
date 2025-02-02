import React, { useState } from 'react';
import '../../css/CartItems.css';
import { useNavigate } from 'react-router-dom';

const CartItems = () => {
  // Retrieve the selected movie, seats, food items, and time from local storage
  const selectedMovie = JSON.parse(localStorage.getItem('selectedMovie'));
  const totalSeats = JSON.parse(localStorage.getItem('totalSeats'));
  const seatNumbers = JSON.parse(localStorage.getItem('seatNumbers')).sort((a, b) => a - b);
  const foodItems = JSON.parse(localStorage.getItem('cart'));
  const selectedTime = localStorage.getItem('selectedTime');
  const navigate = useNavigate();
  const goToPaymentPage = () => {
    navigate('/payment');
  };
  const country=localStorage.getItem('country');
  // Check if the retrieved items are valid and calculate the total cost
  const moviePrice = selectedMovie.price;
  const validSeatNumbers = Array.isArray(seatNumbers) ? seatNumbers : [];
  const validFoodItems = Array.isArray(foodItems) ? foodItems : [];

  let moviePriceStr;
  if (String(moviePrice).match(/\$|INR/)) {
      moviePriceStr = String(moviePrice).replace(/\$|INR/g, '');
  } else {
      moviePriceStr = moviePrice;
  }
  
  let moviePriceNum = parseFloat(moviePriceStr);
  
  const totalCost = moviePriceNum * totalSeats +
      validFoodItems.reduce((total, item) => {
          let itemPriceStr;
          if (String(item.price).match(/\$|INR/)) {
              itemPriceStr = String(item.price).replace(/\$|INR/g, '');
          } else {
              itemPriceStr = item.price;
          }
  
          let itemPriceNum = parseFloat(itemPriceStr || '0');
          return total + (itemPriceNum * parseInt(item.quantity || '0'));
      }, 0);
  let displayPrice = country === 'India' ? `${isNaN(totalCost) ? '0.00' : totalCost.toFixed(2)} INR` : `$${isNaN(totalCost) ? '0.00' : totalCost.toFixed(2)}`;
  


  return (
    <div className="container">
      <div className="card-container">
        {/* Movie Information Card */}
        <div className="card movie-card">
          <img className="card-img-top" src={selectedMovie.poster} alt="Movie poster" />
          <div className="card-body">
            <h5 className="card-title">{selectedMovie.title}</h5>
            <p className="card-text">Time: {selectedTime}</p> {/* Added line */}
            <p className="card-text">Seats: {validSeatNumbers.join(', ')}</p>
          </div>
        </div>

        {/* Food Items Card */}
        <div className="card food-card">
          <div className="card-body">
            <h5 className="card-title">Food Items</h5>
            {validFoodItems.map((item, index) => (
              <p key={index} className="card-text">
                {item.name} - Quantity: {item.quantity}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Total Cost */}
      <div className="total-cost">
        <h5>Total Cost: {displayPrice}</h5>
      </div>
      <button onClick={goToPaymentPage}>Go to Payment Page</button>
    </div>
  );
};

export default CartItems;
