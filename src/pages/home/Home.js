import React, { useEffect, useState } from "react";
import "./Home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import Skeleton , { SkeletonTheme } from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";

// import Card from "../components/Card/Card";

const Home = () => {
  const [popularmovies, setpopularmovies] = useState([]);
  const [isLoading, setisLoading] = useState(true);
    useEffect(()=>{
        setTimeout(() => {
          setisLoading(false)
        }, 2000)
        
    },[])
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US"
    )
      .then((res) => res.json())
      .then((data) => setpopularmovies(data.results));
  }, []);

  return (
    <>
     {
      isLoading
      ?
      <div className="posterImage">
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
                <Skeleton height={500} duration={2}/>
            </SkeletonTheme>
      </div>
      :
      <div className="poster mt-1">
        <Carousel
          showThumbs={false}
          autoPlay={true}
          transitionTime={4}
          infiniteLoop={true}
          showStatus={false}
          className="carousels"
        >
          {popularmovies.map((movie) => (
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={`/movie/${movie.id}`}
            >
              <div className="posterImage">
                <img
                  src={` https://image.tmdb.org/t/p/original${
                    movie && movie.backdrop_path
                  }`} alt={movie.original_title}
                  style={{
                    position: 'relative',
                    top: '-110px',
                  }}
                />
              </div>
              <div className="posterImage__overlay">
                <div className="posterImage__title">
                  {movie ? movie.original_title : ""}
                </div>
                <div className="posterImage__runtime">
                  {movie ? movie.release_date : ""}
                  <span className="posterImage__rating">
                    {movie ? movie.vote_average : ""}
                    <i className="fas fa-star"></i>{" "}
                  </span>
                </div>
                <div className="posterImage__description">
                  {movie ? movie.overview : ""}
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
      <MovieList/>
      </div>
}
    </>
  );
};

export default Home;
