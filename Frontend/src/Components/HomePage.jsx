import React from "react";
import '../index.css';

const HomePage = () => {
  return (
    <div className="page-container">
      <div className="centered-content">
        <h1>Welcome to the Betting App</h1>
        <p>Bet on your favorite crypto and win big!</p>

        <h2>Featured Crypto Bets</h2>
        <div className="featured-games-container">
          <div className="featured-game">
            <h3>Bitcoin Dominance</h3>
            <p>Will Bitcoin Dominance be above or below 55% on January 1, 2025</p>
          </div>
          <div className="featured-game">
            <h3>Ethereum Price</h3>
            <p>Will Ethereum's price be above or below $3000 USD on January 1, 2025</p>
          </div>
          <div className="featured-game">
            <h3>Bitcoin Price</h3>
            <p>Will Bitcoin's price be above or below $100,000 USD by December 31, 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
