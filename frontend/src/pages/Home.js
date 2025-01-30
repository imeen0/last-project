import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to Home Page</h1>
      <p>This is a protected route.</p>
      <Link to="/tasks">Tasks</Link>
    </div>
  );
};

export default Home;
