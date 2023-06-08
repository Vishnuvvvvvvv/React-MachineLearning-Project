import React,{useState,useEffect} from 'react'
import {Link} from "react-router-dom"
import {useNavigate} from "react-router-dom"
function HomePage(){

const dummydata = [
{Title:"Lost in Space",
Poster: "https://m.media-amazon.com/images/M/MV5BZTY5YjQwYmEtOWJiNy00NDBmLTgxM2YtMmVkMmI0NzE1N2FjXkEyXkFqcGdeQXVyMjg1NDcxNDE@._V1_SX300.jpg"},
{Title: "The Helix... Loaded",
Poster: "https://m.media-amazon.com/images/M/MV5BMTUwNTUzNTMyMF5BMl5BanBnXkFtZTcwOTg2NTgyMQ@@._V1_SX300.jpg"},
{Title: "Lockout",
Poster: "https://m.media-amazon.com/images/M/MV5BMTg1OTQ3MzM0NV5BMl5BanBnXkFtZTcwNDU1MDI0Nw@@._V1_SX300.jpg"},
{Title: "Jupiter Ascending",
Poster: "https://m.media-amazon.com/images/M/MV5BMTQyNzk2MjA2NF5BMl5BanBnXkFtZTgwMjEwNzk3MjE@._V1_SX300.jpg"},
{Title: "Aliens vs. Predator: Requiem",
Poster: "https://m.media-amazon.com/images/M/MV5BMTI5NDY2NDUwM15BMl5BanBnXkFtZTYwNzQxMTA3._V1_SX300.jpg"},
{
Title: "Independence Day",
Poster: "https://m.media-amazon.com/images/M/MV5BMGQwNDNkMmItYWY1Yy00YTZmLWE5OTAtODU0MGZmMzQ1NDdkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"}]

const [data,setdata]=useState(dummydata)

return(
<div>

<div className="Home-start-text">
<h2  className="text-center mb-3">Explore Movies</h2>

 <p   className=" homePara">Heyy!! Find details of your favourite movies,predict the box office succes of a  movie, explore the recommendations of particular films and much more...</p>


</div>

    <div className="home-recommendation-container" >
     
      {data?.map((movie, index) => (
	
           <Link to={`/movie/${movie.Title}`} >
          <div key={index} className="home-recommendation-item">
          <img src={movie.Poster} alt={movie.Title} />    
          <h2>{movie.Title}</h2>
          </div>
          </Link>

      ))}
    </div>
</div>

)

}

export default HomePage;