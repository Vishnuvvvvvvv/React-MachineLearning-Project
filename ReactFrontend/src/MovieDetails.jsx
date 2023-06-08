import { useParams } from 'react-router-dom';
import {useState,useEffect} from 'react'
import SearchResult from "./SearchResult"
import RecomendedMovieComponent from "./RecomendedMovieComponent"
import MovieRecommendationFormm from "./MovieRecommendationFormm"

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
   const [recommendedMoveDetails,setRecommendedMoveDetails] = useState("")

  useEffect(() => {
    const fetchMovieDetails = async () => {
 const url = `http://www.omdbapi.com/?apikey=5c6b9a69&t=${(id)}`
      const response = await fetch(url);
      const data = await response.json();
          
      setMovie(data);
 console.log("data is :",movie) 

       //lets get data from fastAPI
const fastApiUrl = 'http://127.0.0.1:8000/recommend'

  const fastApiResponse = await fetch(fastApiUrl , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name:id }),
    });

  const fastApiData = await fastApiResponse.json()
  console.log('Recommendationshere:', fastApiData.recommendations);
   setRecommendedMoveDetails(fastApiData.recommendations)
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="body-page">
        
   
         {movie &&  <SearchResult  movieDetails={movie}/>}
      
   
  
            {  recommendedMoveDetails &&< RecomendedMovieComponent  recommendedMoveDetails={recommendedMoveDetails}/>}
   


    </div>
  );
}
export default MovieDetails;
