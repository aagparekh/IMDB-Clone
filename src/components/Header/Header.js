import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg ">
        <div className="container-fluid p-2">
          <Link to="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/80px-IMDB_Logo_2016.svg.png"
              className="Header_image"
              alt=""
            />
          </Link>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex">
              <li className="nav-item mx-3 text-white">
                <Link to='/movies/popular' className="text-light text-decoration-none fs-4">
                   <span>Popular</span> 
                </Link>
              </li>
              <li className="nav-item mx-3 text-white" >
              <Link to='/movies/now_playing' className="text-light text-decoration-none fs-4">
                    <span>Now Playing</span> 
                    </Link>
              </li>
              <li className="nav-item mx-3">
                    <Link to='/movies/top_rated' className="text-light text-decoration-none fs-4">
                   <span>Top Rated</span>
                    </Link>
              </li>
              <li className="nav-item mx-3 text-white" >
              <Link to='/movies/upcoming' className="text-light text-decoration-none fs-4">
                    <span>Upcoming</span> 
                    </Link>
              </li>
              
            </ul>
            {/* {/* <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>  */}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
