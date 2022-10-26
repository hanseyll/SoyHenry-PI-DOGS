import React from "react";
import { Link } from "react-router-dom";
import "./css/LandingPage.css";

function LandingPage() {
  return (
    <div className="container_landing">
      <div>
        <h1 className="title_landing">Dog App</h1>
      </div>
      <div>
        <Link className="link_landing" to="/dogs">
          Let's Go
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
