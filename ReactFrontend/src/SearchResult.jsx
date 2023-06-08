import React from 'react'
import {useNavigate} from 'react-router-dom'
function SearchResult({movieDetails}){
console.log("here's",movieDetails)
const navigate = useNavigate()
return (
<div className="search-result">
<h2>Movie Details</h2>
<img src={movieDetails.Poster
} alt={movieDetails.Title} />
      <h3>{movieDetails.Title}</h3>
     
      <p>{movieDetails.Plot}</p>
      <div className="movie-cast-crew">
 <p className="film-players">Genre: {movieDetails. Genre}</p>
      <p className="film-players">Actors: {movieDetails.Actors}</p>
  <p className="film-players">Directed By: {movieDetails.Director}</p>
</div>


</div>

)
}

export default SearchResult;