import React from "react";
import '../index.css';

const SettingsPage = () => {
  return (
    <div className="page-container">
      <div className="centered-content">
        <h1>User Profile</h1>
        <p>Name: Tyrone Lee</p>
        <p>Email: tyronelee@gmail.com</p>

        <h2>Wallet Info</h2>
        <p>Wallet Address: 0x123456789ABCDEF</p>
        <p>Balance: 100 AMB Tokens</p>
      </div>
    </div>
  );
};

export default SettingsPage;
