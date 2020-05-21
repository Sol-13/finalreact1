import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Home } from '@styled-icons/feather/Home/Home';
import { Video } from '@styled-icons/feather/Video/Video';
import { Tv } from '@styled-icons/feather/Tv/Tv';
import { Search } from '@styled-icons/feather/Search/Search';


const body = styled.body`
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
}*/

}
`
const ModalSearch = styled.div`

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
const Movie = styled.article`
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

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=30dab27f60b1e072cb74daed58002f0a`)
      .then(res => res.json())
      .then(data => setMovieList(data.results))
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

  /****Consultar: Ya no me funciona la X para cerrar el modal!****/
  const handleClickModal = () => {
    setOpenModal(!openModal);
  }





  return (
    <>
      <NavContainer>
        <ul>
          <p><Home /></p>

          <p><Video /></p>

          <p><Tv /></p>

          <p><Search /></p>

        </ul>
      </NavContainer>

      {openModal &&
        <Modal>
          <button onClick={handleClickModal}>X</button>
          <h3>{chosenMovie.title}</h3>
          <img src={`https://image.tmdb.org/t/p/w500${chosenMovie.poster_path}`} />
          <p>Summary: {chosenMovie.overview}</p>
          <p>Date: {new Date(chosenMovie.release_date).toLocaleDateString('es')}</p>
          <p>Genres: {genresChosenMovie.map(genres => genres.name).join(", ")}</p>
        </Modal>
      }


      <DivSuperior>
        <h1>Foto</h1>
      </DivSuperior>


      <MainContainer>
        <h2> Peliculas que son tendencia </h2>
        <MovieContainer>
          {movieList.map((movie) =>
            (<Movie key={movie.id} onClick={() => handleClick(movie)}>
              <p>{movie.title}</p>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
            </Movie>
            ))}
        </MovieContainer>
      </MainContainer>
    </>
  );
}


export default App;
