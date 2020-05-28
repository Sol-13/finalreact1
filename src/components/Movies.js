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

  h3 {
    font-family: Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif;
box-sizing: border-box;
font-size: 20px;
font-weight: 300;
margin-bottom: 5px;
transition: all 0.3s ease 0s;
color: white;
  }
}
`

const PopularMovieContainer = styled.section`
display:flex;
justify-content: space-between;
flex-wrap: wrap;
`

const Popular = styled.article`
margin:20px;
width: 180px;

img {
  width:100%;
  height: auto;
}
`

const TopRatedContainer = styled.section`
display:flex;
justify-content: space-between;
flex-wrap: wrap;
`

const Top = styled.article`
margin:20px;
width: 180px;

img {
  width:100%;
  height: auto;
}
`

const UpComingContainer = styled.section`
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

const NowPlayingContainer = styled.section`
display:flex;
justify-content: space-between;
flex-wrap: wrap;
`

const Now = styled.article`
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


const Movies = () => {

const [popular, setPopular] = useState ([])
const [toprated, setTopRated] = useState ([])
const [upcoming, setUpComing] = useState ([])
const [nowplaying,setNowPlaying] = useState ([])
const [pageMovie, setPageMovie] = useState ([])
const [openModal, setOpenModal] = useState(false)

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=30dab27f60b1e072cb74daed58002f0a`)
      .then(res => res.json())
      .then(data => setPopular(data.results))

      fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=30dab27f60b1e072cb74daed58002f0a`)
      .then(res => res.json())
      .then(data => setTopRated(data.results))

      fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=30dab27f60b1e072cb74daed58002f0a`)
      .then(res => res.json())
      .then(data => setUpComing(data.results))

      fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=30dab27f60b1e072cb74daed58002f0a`)
      .then(res => res.json())
      .then(data => setNowPlaying(data.results))

  }, [])

  const handleClickMovie = movie => {
    setPageMovie(movie)
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=30dab27f60b1e072cb74daed58002f0a`)
      .then(res => res.json())
      .then(data => setPageMovie(data.genres))
    handleClickModal()
    setPageMovie(pageMovie.filter(genero => {
      return pageMovie.genre_ids.includes(genero.id)
    }))

    const handleClickModal = () => {
      setOpenModal(!openModal);
    }
  }



  return (
     
     <>

    {openModal &&
        <Modal>
          <button onClick={handleClickMovie}>X</button>
          <h3>{pageMovie.title}</h3>
          <img src={`https://image.tmdb.org/t/p/w500${pageMovie.poster_path}`} alt="modal con imagen de pelicula" />
          <p>Summary: {pageMovie.overview}</p>
          <p>Date: {new Date(pageMovie.release_date).toLocaleDateString('es')}</p>
          <p>Genres: {pageMovie.map(genres => genres.name).join(", ")}</p>
        </Modal>
    }

   <MainContainer>
        
     <h2>Popular Movies</h2>

       <PopularMovieContainer>
          
          {popular.map((popular) =>
            
            (<Popular key={popular.id} onClick={() => handleClickMovie(popular)}>
              <h3>{popular.title}</h3>
              <img src={`https://image.tmdb.org/t/p/w500${popular.poster_path}`} alt = "imagenes de peliculas populares"/>
            </Popular>
            ))}

        </PopularMovieContainer>

     <h2>Top Rated Movies</h2>
     
     <TopRatedContainer>
         {toprated.map((toprated) =>
          
          (<Top key={toprated.id} onClick={() => handleClickMovie(toprated)}>
             <h3>{toprated.title}</h3>
             <img src={`https://image.tmdb.org/t/p/w500${toprated.poster_path}`} alt = "imagenes de peliculas con mejores criticas"/>
           </Top>
           ))}

     </TopRatedContainer>
     
     
     <h2>Up Coming Movies</h2>
    
     <UpComingContainer>
         {upcoming.map((upcoming) =>
           
           (<Up key={upcoming.id} onClick={() => handleClickMovie(upcoming)}>
             <h3>{upcoming.title}</h3>
             <img src={`https://image.tmdb.org/t/p/w500${upcoming.poster_path}`} alt = "imagenes de peliculas a estrenarse"/>
           </Up>
           ))}

       </UpComingContainer>
    
    
     <h2>Now Playing Movies</h2>
    
     <NowPlayingContainer>
         {nowplaying.map((nowplaying) =>
          
          (<Now key={nowplaying.id} onClick={() => handleClickMovie(nowplaying)}>
             <h3>{nowplaying.title}</h3>
             <img src={`https://image.tmdb.org/t/p/w500${nowplaying.poster_path}`} alt = "imagenes de peliculas en cine"/>
           </Now>
           ))}

      </NowPlayingContainer>
   
      </MainContainer>

</>
     
    )
}

export default Movies;