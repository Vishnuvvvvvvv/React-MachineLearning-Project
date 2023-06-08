import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from "./Navbar"
import MovieRecommendationFormm from './MovieRecommendationFormm';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';

import MovieDetails from './MovieDetails';
import Demo from "./Demo"
import MyNewForm from './MyNewForm'

function App() {
  const [count, setCount] = useState(0)

  return (
   <Router>
    

       
        <Navbar/>
      
      <Routes>
 
       <Route exact path="/" element={ <MovieRecommendationFormm/>} />
      <Route exact path="/movie/:id" element={<MovieDetails/>} />
      <Route exact path="/demo" element={<MyNewForm/>} />

      </Routes>


   
</Router>
    
  )
}

export default App
