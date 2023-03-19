import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Bars } from "react-loader-spinner";
import Card from "../Card/Card";
import "./MovieList.css";
const MovieList = () => {
  const [MovieList, setMovieList] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const { type } = useParams();
  const params = useParams();
 

  // useEffect(() => { 

  //   setisLoading(false);
  //   console.log(isLoading,"in none");
  //   getData();
  // }, []);

  useEffect(() => { 
    if(Object.keys(params).length !== 0)
    {
      setTimeout(() => {
        setisLoading(false);
      }, 2000);
    }  
    else{
      setisLoading(false);
      console.log(isLoading);
    } 
    getData();
  }, [type]);
  const getData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        type ? type : "popular"
      }?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setMovieList(data.results));
      if (Object.keys(params).length !== 0) {
        setisLoading(true);
      }
      
  };
  return (
    <>
      {isLoading ? 
      (
        <div className="spinner">
        <Bars
        color="grey"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}        
      />
      </div>
      ) 
      : 
      (
        <div className="movie__list">
          <h2 className="list__title">
            {(type ? type : "popular").toUpperCase()}
          </h2>
          <div className="list__cards">
            {MovieList.map((movie) => (
              <Card movie={movie} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MovieList;
