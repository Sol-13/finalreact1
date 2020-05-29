import React, { useState, useEffect } from 'react';
import styled from 'styled-components';


const Search1= styled.section`
display:flex;
justify-content: space-between;
flex-wrap: wrap;`


const Modal = styled.div`
font-size: 20px;
    color: rgb(220, 221, 222);
    cursor: pointer;
    background: transparent;
    border-width: 0px;
    border-style: initial;
    border-color: initial;
    border-image: initial;
    padding: 10px 20px 5px 40px;/*height: auto;
`

const SearchData = () => {

  const [search, setSearchData] = useState ([])
  const [openModal, setOpenModal] = useState(false)
  const [chosenMovie, setChosenMovie] = useState(null)
  const [genres, setGenres] = useState([])
  const [genresChosenMovie, setGenresChosenMovie] = useState([])
  

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/tv/popular?api_key=30dab27f60b1e072cb74daed58002f0a`)
      .then(res => res.json())
      .then(data => setSearchData(data.results))

  
  }, [])

  const handleClickMovie = movie => {
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
    
        <input placeholder="Search" onClick={handleClickModal}> </input>
        {search.map((search) =>
            
            (<Search1 key={search.id} onClick={() => handleClickMovie(search)}>
             
            </Search1>
            
            ))}
      </Modal>
    }

</> 
    )
 
  }

export default SearchData;