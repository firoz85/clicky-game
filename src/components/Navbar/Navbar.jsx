import React from "react";

function Navbar({ message, score, topScore }) {

  return (

   /*  <nav class="nav nav-pills nav-justified">
      <a class="nav-item nav-link active" href="#">Active</a>
      <a class="nav-item nav-link" href="#">Much longer nav link</a>
      <a class="nav-item nav-link" href="#">Link</a>
      <a class="nav-item nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
    </nav> */
    
    <nav className="bg-nav justify-content-center fixed-top navbar nav-height nav-shadow p-0 tp-text ">
      <a className="navbar-brand" href="#">Clicky Game -Memroy Game</a>
      <ul className="nav nav-pills nav-fill">
        <li className="nav-item" id="animate-this">
          <a className="nav-link active" href="#">{message}</a>
        </li>
        <li className="nav-item" >
          <a className="nav-link" href="#">SCORE: {score} | TOP SCORE: {topScore}</a>
        </li>
      </ul>
    </nav> 
  
  );
}

export default Navbar;
