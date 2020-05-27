import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Home } from '@styled-icons/feather/Home/Home';
import { Video } from '@styled-icons/feather/Video/Video';
import { Tv } from '@styled-icons/feather/Tv/Tv';
import { Search } from '@styled-icons/feather/Search/Search';
import Movies from './components/Movies';
import TvShows from './components/TvShows';


const Body = styled.body`
  font-family: Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif;
`

const NavContainer = styled.nav`
top: 0;
right: auto;
width: 10rem;
height: 100%;
position: fixed;
z-index: 1;
border-right: 1.5px solid #202124;
background-color: #000;
color: #fff;

p {
  color: rgb(220, 221, 222);
  width: 30px;
  padding: 30px;

/****Preguntar como darle color al seleccionar los iconos:****
p { color: rgb(33, 150, 243);
}
`

const DivSuperior = styled.div`
position: relative;
display: block;
height: 0;
padding-bottom: 30%;
`

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

const MovieContainer = styled.section`
display:flex;
justify-content: space-between;
flex-wrap: wrap;
`

const TvContainer = styled.section`
display:flex;
justify-content: space-between;
flex-wrap: wrap;
`

const Movie = styled.article`
margin:20px;
width: 180px;

img {
  width:100%;
  height: auto;
}
`

const Tv1 = styled.article`
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

const App = () => {

  const [movieList, setMovieList] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [chosenMovie, setChosenMovie] = useState(null)
  const [genres, setGenres] = useState([])
  const [genresChosenMovie, setGenresChosenMovie] = useState([])
  const [tvList, setTvList] = useState([])
  const [page, setPage] = useState([])


  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=30dab27f60b1e072cb74daed58002f0a`)
      .then(res => res.json())
      .then(data => setMovieList(data.results))

    fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=30dab27f60b1e072cb74daed58002f0a`)
      .then(res => res.json())
      .then(data => setTvList(data.results))

  }, [])

  const handleClick = movie => {
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

  const handleClickPage = e => {
    setPage(e.target.id)
  }

  return (
    <>
      <Body />

      <NavContainer>
        <ul>
          <p><Home /></p>
          <p><Video id="movie" onClick={handleClickPage} Movies /></p>
          <p><Tv id="tv" onclick={handleClickPage} TvShows /></p>
          <p><Search /></p>
        </ul>

      </NavContainer>
      
      {page === 'movies' && <Movies/>}
      {page === 'tv' && <TvShows/>}
     
      <DivSuperior>
        <h1>Foto</h1>
      </DivSuperior>

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

        <h2> Trending Movies </h2>

        <MovieContainer>
          {movieList.map((movie) =>
            (<Movie key={movie.id} onClick={() => handleClick(movie)}>
              <h3>{movie.title}</h3>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="imagenes de peliculas" />
            </Movie>
            ))}
        </MovieContainer>

        <h2>Trending TV Shows</h2>

        <TvContainer>
          {tvList.map((tv) =>
            (<Tv1 key={tv.id} onClick={() => handleClick(tv)}>
              <h3>{tv.title}</h3>
              <img src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`} alt="imagenes de series" />
            </Tv1>
            ))}
        </TvContainer>

      </MainContainer>

    </>
  );
}

export default App;
