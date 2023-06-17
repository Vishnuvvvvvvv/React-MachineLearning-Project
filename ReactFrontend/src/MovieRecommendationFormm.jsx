import React, { useEffect, useState,useContext } from 'react';
import SearchResult from "./SearchResult"
import RecomendedMovieComponent from "./RecomendedMovieComponent"
import { useNavigate } from 'react-router-dom';
import HomePage from "./HomePage"
import { SearchContext } from './SearchContext';

function MovieRecommendationFormm() {
  const navigate = useNavigate();
 const { searchedMoveDetails , setSearchedMoveDetails} = useContext(SearchContext);

const [searchQuery,setSearchQuery] = useState('')

const [recommendedMoveDetails,setRecommendedMoveDetails] = useState("")
const [isLoading,setIsLoading] = useState(false)

async function handleSearch(){
//when this fun clicked get image from omdb api also ,  get recomendations from fast api
//lets get data from omdb api
  const url = `http://www.omdbapi.com/?apikey=APIKEYY=${encodeURIComponent(searchQuery)}`
  const response = await fetch(url);
  const data = await response.json()
  setSearchedMoveDetails(data)

//lets get data from fastAPI
const fastApiUrl = 'http://127.0.0.1:8000/recommend'

  const fastApiResponse = await fetch(fastApiUrl , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: searchQuery }),
    });

  const fastApiData = await fastApiResponse.json()
  console.log('Recommendations:', fastApiData.recommendations);
setRecommendedMoveDetails(fastApiData.recommendations)

console.log("check",isLoading)
 
}











  return (

    <div>

    <div className="Main-Panel">

     <div className="Main-Content">

    <h2>It's All About Movie...</h2>
      <p>Heyy!! Find details of your favourite movies,predict the box office succes of a  movie, explore the recommendations of particular films and much more...</p>

  
    <div className="input-group input-group-sm newclass ">

    <input className="form-control" type="text"  value={searchQuery} placeholder="search movie..." onChange={(e)=>setSearchQuery(e.target.value)}   autoComplete="on"/>

    <button className="btn bg-white" type="submit" onClick={handleSearch} >
{/**<span className="bi bi-chevron-right"></span>**/}
<span className="bi bi-search"></span>
</button>

     </div>


     </div>
      
   </div>
    
       

   <div className="body-page">

   {  searchedMoveDetails ?<SearchResult  movieDetails={searchedMoveDetails}/>:<HomePage/>}
     
        

   {  recommendedMoveDetails &&< RecomendedMovieComponent  recommendedMoveDetails=     {recommendedMoveDetails}/>}


      </div>


    </div>
  );
}

export default MovieRecommendationFormm;

/**<div className="search-bar">
    <input className="search-input" type="text"  value={searchQuery} placeholder="search movie..." onChange={(e)=>setSearchQuery(e.target.value)}   autoComplete="on"/>
    <button className="search-button" type="submit" onClick={handleSearch} >search</button>**/
