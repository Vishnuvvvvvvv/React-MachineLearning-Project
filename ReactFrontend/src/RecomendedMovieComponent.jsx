import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function RecomendedMovieComponent({recommendedMoveDetails}) {
 console.log("check got",recommendedMoveDetails)
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState([]);
  var movieTitle = ''
  const fetchMovieData = async () => {
   
    const movieDataPromises = recommendedMoveDetails.map(async (movie) => {
console.log("ind",movie)
      const url = `http://www.omdbapi.com/?apikey=5c6b9a69&t=${encodeURIComponent(movie)}`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    });

    const movieDataArray = await Promise.all(movieDataPromises);
    setMovieData(movieDataArray);
   console.log("movieDataArray",movieDataArray)
   console.log("movieData",movieData)
   

  };




   
/**  const renderMovieData = () => {
    return movieData.map((movie, index) => (
      <div key={index} className="flex-it">
        <img src={movie.Poster} alt={movie.Title} />
        <h3>{movie.Title}</h3>
		
      </div>
    ));
  };**/
  
useEffect(()=>{
 fetchMovieData()

},[recommendedMoveDetails])

      console.log("movieDataoutside",movieData)
const Title = 'Batman'

function imgClicked(poster,title){
console.log("clickeddd")
navigate("/demo",{replace:true})



}
  return (
<div>
<h2 className="recommended-movie-heading">Recommended Movies</h2>
    <div className="recommendation-container" >
     
      {movieData?.map((movie, index) => (
	
                <Link to={`/movie/${movie.Title
}`} >
          <div key={index} className="recommendation-item">
   
    <img src={movie.Poster} alt={movie.Title} /> 
   
   <h2>{movie.Title}</h2>
      
          </div>
 </Link>
      ))}
    </div>
</div>
  );
}
export default RecomendedMovieComponent;
