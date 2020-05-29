import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const MainContainer = styled.main`
color: #fff;
background: #141414;
margin-left: 150px;

h2{
  margin-left: 20px; 
  font-size: 32px;
  font-weight: 300;
  color: rgb(220, 221, 222);
}
`

const PopularTvContainer = styled.section`
display:flex;
justify-content: space-between;
flex-wrap: wrap;
`

const PopularTv = styled.article`
margin:20px;
width: 180px;

img {
  width:100%;
  height: auto;
}
`

const TopRatedTvContainer = styled.section`
display:flex;
justify-content: space-between;
flex-wrap: wrap;
`

const TopTv= styled.article`
margin:20px;
width: 180px;

img {
  width:100%;
  height: auto;
}
`

const CurrentlyTVContainer = styled.section`
display:flex;
justify-content: space-between;
flex-wrap: wrap;
`

const Up = styled.article`
margin:20px;
width: 180px;

img {
  width:100%;
  height: auto;
}
`

const Modal = styled.div`
height: auto;
width: 700px;
border: 1 px solid #ccc;
padding: 20px;
border-radius: 20px;
position: absolute;
right: 30%;
color: #fff;
background-color: #141414;

img {
  width: 180px;
  height: auto;
}

`


const TvShows = () => {

const [populartv, setPopularTv] = useState ([])
const [topratedtv, setTopRatedTv] = useState ([])
const [currentlyTv, setCurrentlyTv] = useState ([])

const [genresChosenMovie, setGenresChosenMovie] = useState([])

const [openModal, setOpenModal] = useState(false)
const [chosenMovie, setChosenMovie] = useState(null)
const [genres, setGenres] = useState([])


  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/tv/popular?api_key=30dab27f60b1e072cb74daed58002f0a`)
      .then(res => res.json())
      .then(data => setPopularTv(data.results))

      fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=30dab27f60b1e072cb74daed58002f0a`)
      .then(res => res.json())
      .then(data => setTopRatedTv(data.results))

      fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=30dab27f60b1e072cb74daed58002f0a`)
      .then(res => res.json())
      .then(data => setCurrentlyTv(data.results))

  }, [])


  const handleClickTv= movie => {
    setChosenMovie(movie)
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=30dab27f60b1e072cb74daed58002f0a`)
      .then(res => res.json())
      .then(data => setGenres(data.genres))
    handleClickModal()
    setGenresChosenMovie(genres.filter(genero => {
      return chosenMovie.genre_ids.includes(genero.id)
    }))
  }

  
  const handleClickModal = () => {
    setOpenModal(!openModal);
  }

 

    return (
 <>

  {openModal &&
   
   <Modal>
      <button onClick={handleClickModal}>X</button>
      <h3>{chosenMovie.title}</h3>
      <img src={`https://image.tmdb.org/t/p/w500${chosenMovie.poster_path}`} alt="modal con imagen de pelicula" />
      <p>Summary: {chosenMovie.overview}</p>
      <p>Date: {new Date(chosenMovie.release_date).toLocaleDateString('es')}</p>
      <p>Genres: {genresChosenMovie.map(genres => genres.name).join(", ")}</p>
    </Modal>

  }

  <MainContainer>
        
       <h2>Popular Tv Shows</h2>

        <PopularTvContainer>
          
          {populartv.map((populartv) =>
            
            (<PopularTv key={populartv.id} onClick={() => handleClickTv(populartv)}>
              <h3>{populartv.title}</h3>
              <img src={`https://image.tmdb.org/t/p/w500${populartv.poster_path}`} alt = "imagenes de peliculas populares"/>
            </PopularTv>
            ))}

        </PopularTvContainer>

      
       <h2>Top Rated Tv Shows</h2>
     
        <TopRatedTvContainer>

         {topratedtv.map((topratedtv) =>
           
           (<TopTv key={topratedtv.id} onClick={() => handleClickTv(topratedtv)}>
             <h3>{topratedtv.title}</h3>
             <img src={`https://image.tmdb.org/t/p/w500${topratedtv.poster_path}`} alt = "imagenes de series con mejores criticas"/>
           </TopTv>
           ))}

        </TopRatedTvContainer>
     
     
     <h2>Currently Airing TV Shows</h2>
    
     <CurrentlyTVContainer>
       
         {currentlyTv.map((currentlyTv) =>
           
           (<Up key={currentlyTv.id} onClick={() => handleClickTv(currentlyTv)}>
             <h3>{currentlyTv.title}</h3>
             <img src={`https://image.tmdb.org/t/p/w500${currentlyTv.poster_path}`} alt = "imagenes de series en el aire"/>
           </Up>
           ))}

       </CurrentlyTVContainer>
    
      </MainContainer>

  </>
     )
     }

export default TvShows;


