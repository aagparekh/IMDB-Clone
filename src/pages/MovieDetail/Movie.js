import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Movie.css";
import Card from "../../components/Card/Card";
import { Bars } from "react-loader-spinner";
// import { Carousel } from "react-responsive-carousel";

import Carousel from "react-multi-carousel";

import "react-multi-carousel/lib/styles.css";


const Movie = () => {
  const [currentMovieDetail, setcurrentMovieDetail] = useState([]);
  const [similarMovieDetail, setsimilarMovieDetail] = useState([]);
  const [recommendMovieDetail, setrecommendMovieDetail] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  // const [isSkeleton, setSkeleton] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    setTimeout(() => {
      setisLoading(false);
    }, 1000);

    getMovieDetail();
    getSimilarMovieDetail();
    getSRecommendMovieDetail();
    window.scroll(0, 0);
  }, [id]);
  const getMovieDetail = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setcurrentMovieDetail(data));
    setisLoading(true);
  };
  const getSimilarMovieDetail = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setsimilarMovieDetail(data.results));
    //   setisLoading(true);
  };
  const getSRecommendMovieDetail = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setrecommendMovieDetail(data.results));
    //   setisLoading(true);
  };
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  return (
    <>
      {isLoading ? (
        <div className="spinner">
          <Bars
            color="grey"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <div className="movie">
          <div className="movie__intro">
            <img
              className="movie__backdrop"
              src={`https://image.tmdb.org/t/p/original${
                currentMovieDetail ? currentMovieDetail.backdrop_path : ""
              }`}
            />
          </div>
          <div className="movie__detail">
            <div className="movie__detailLeft">
              <div className="movie__posterBox">
                <img
                  className="movie__poster"
                  src={`https://image.tmdb.org/t/p/original${
                    currentMovieDetail ? currentMovieDetail.poster_path : ""
                  }`}
                />
              </div>
            </div>
            <div className="movie__detailRight">
              <div className="movie__detailRightTop">
                <div className="movie__name">
                  {currentMovieDetail ? currentMovieDetail.original_title : ""}
                </div>
                <div className="movie__tagline">
                  {currentMovieDetail ? currentMovieDetail.tagline : ""}
                </div>
                <div className="movie__rating">
                  {currentMovieDetail ? currentMovieDetail.vote_average : ""}{" "}
                  <i class="fas fa-star" />
                  <span className="movie__voteCount">
                    {currentMovieDetail
                      ? "(" + currentMovieDetail.vote_count + ") votes"
                      : ""}
                  </span>
                </div>
                <div className="movie__runtime">
                  {currentMovieDetail
                    ? currentMovieDetail.runtime + " mins"
                    : ""}
                </div>
                <div className="movie__releaseDate">
                  {currentMovieDetail
                    ? "Release date: " + currentMovieDetail.release_date
                    : ""}
                </div>
                <div className="movie__genres">
                  {currentMovieDetail && currentMovieDetail.genres
                    ? currentMovieDetail.genres.map((genre) => (
                        <>
                          <span className="movie__genre" id={genre.id}>
                            {genre.name}
                          </span>
                        </>
                      ))
                    : ""}
                </div>
              </div>
              <div className="movie__detailRightBottom">
                <div className="synopsisText">Synopsis</div>
                <div>
                  {currentMovieDetail ? currentMovieDetail.overview : ""}
                </div>
              </div>
            </div>
          </div>
          <div className="movie__links">
            <div className="movie__heading">Useful Links</div>
            {currentMovieDetail && currentMovieDetail.homepage && (
              <a
                href={currentMovieDetail.homepage}
                target="_blank"
                style={{ textDecoration: "none" }}
              >
                <p>
                  <span className="movie__homeButton movie__Button">
                    Homepage <i className="newTab fas fa-external-link-alt"></i>
                  </span>
                </p>
              </a>
            )}
            {currentMovieDetail && currentMovieDetail.imdb_id && (
              <a
                href={
                  "https://www.imdb.com/title/" + currentMovieDetail.imdb_id
                }
                target="_blank"
                style={{ textDecoration: "none" }}
              >
                <p>
                  <span className="movie__imdbButton movie__Button">
                    IMDb<i className="newTab fas fa-external-link-alt"></i>
                  </span>
                </p>
              </a>
            )}
          </div>
          {currentMovieDetail.production_companies[0].logo_path !== null && (
            <>
              <div className="movie__heading">Production companies</div>
              <div className="movie__production">
                {currentMovieDetail &&
                  currentMovieDetail.production_companies &&
                  currentMovieDetail.production_companies.map((company) => (
                    <React.Fragment key={company.id}>
                      {company.logo_path && (
                        <span className="productionCompanyImage">
                          <img
                            className="movie__productionComapany"
                            src={
                              "https://image.tmdb.org/t/p/original" +
                              company.logo_path
                            }
                          />
                          <span>{company.name}</span>
                        </span>
                      )}
                    </React.Fragment>
                  ))}
              </div>
            </>
          )}
          {recommendMovieDetail.length !== 0 && (
            <div className="movie__list">
              <h2 className="list__title">RECOMMENDED MOVIES</h2>
              <div className="list__cards">
                {recommendMovieDetail.map((movie) => (
                    movie.backdrop_path!=null && <Card movie={movie} />
                ))}
              </div>
            </div>
          )}
          {similarMovieDetail.length !== 0 && (
            <div className="movie__list">
              <h2 className="list__title">SIMILAR MOVIES</h2>
              <div className="list__cards">
                {similarMovieDetail.map((movie) => (
                 movie.backdrop_path!=null && <Card movie={movie} />
                ))}
              </div>
            </div>
          )}
          
        </div>
      )}
    </>
  );
};

export default Movie;
