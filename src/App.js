import React from 'react';
import './App.css';
import axios from 'axios';
import { useState,useEffect } from 'react';


function App() {
  const[popularMoveis,setPopularMovies]=useState([]);
  const [movieName,setMovieName]=useState("")
  const [searchedMovies,setSearchedMovies]=useState([])




  useEffect(()=>{
    
    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=cfe422613b250f702980a3bbf9e90716')
    .then((res)=>{
      setPopularMovies(res.data.results)
    
    })


  },[])

function changeMovieName(e){
  setMovieName(e.target.value)
 
}
useEffect(()=>{
  axios.get(`https://api.themoviedb.org/3/search/movie?query=${movieName}&api_key=cfe422613b250f702980a3bbf9e90716`)
  .then((res)=>{
    setSearchedMovies(res.data.results)
  
  })
},[movieName])

  return (
    <div>
     <div className='input-field'>
      <input type='text' className='search' value={movieName} placeholder='Search for movie Title' onChange={(e)=>{changeMovieName(e)}} />
     </div>
     <div className='movie-wrapper'>
        { movieName === "" ?
          popularMoveis.map((movie,i)=>{
            return(
              <div className='movie-card'  onMouseOver={()=>{
                  var MovieTitleElement=document.getElementById(`movieTitle${i}`);
                  MovieTitleElement.style.display="block" ;
              }}  
              onMouseLeave={()=>{
                var searchTitleElement=document.getElementById(`movieTitle${i}`);
                searchTitleElement.style.display="none";
            }} 
              >
                <img 
                className='movie-thumbnail'
                src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path} `}alt="" />

                  <p id={`movieTitle${i}`}  style={{display :'none'}}  > Title : <b>{movie.title}</b></p>
              </div>
            )
          })
          :  searchedMovies.map((movie,i)=>{
            return(
              <div className='movie-card'  onMouseOver={()=>{
                  var searchedTitleElement=document.getElementById(`searchedMovies${i}`);
                  searchedTitleElement.style.display="block" ;
              }}  
              onMouseLeave={()=>{
                var searchedTitleElement=document.getElementById(`searchedMovies${i}`);
                searchedTitleElement.style.display="none" ;
            }} 
              >
                <img 
                className='movie-thumbnail'
                src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path} `}   alt="" />

                  <p id={`searchedMovieTitle${i}`}> Title : <b>{movie.title}</b></p>
              </div>
            )
          })
        }
     </div>
   
    </div>
  );
}

export default App;
