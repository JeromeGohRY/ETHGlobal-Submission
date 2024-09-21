import React from "react";
import '../index.css';

const BettingPage = () => {
  return (
    <div className="page-container">
      <div className="centered-content">
        <h1>Bet on your favorite crypto and win big!</h1>
        <h2>Available Crypto Bets</h2>
        <div className="featured-games-container">
          <div className="featured-game">
            <h3>Altcoin Price Movement</h3>
            <p>Which altcoin will see the largest percentage gain over the next 30 days?</p>
          </div>
          <div className="featured-game">
            <h3>NFT Floor Price Prediction</h3>
            <p>Will the floor price of Bored Ape Yacht Club increase or decrease by a specific percentage over a month?</p>
          </div>
          <div className="featured-game">
            <h3>Total Value Locked (TVL) Growth in DeFi</h3>
            <p>Will the total value locked in DeFi surpass $50 billion by the end of 2024?</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BettingPage;
