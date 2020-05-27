import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

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
  width: auto ;
  height: auto;
}

`



const SearchData = () => {
 
    const[data, setData]= useState([])
const[openModal, setOpenModal]= useState([])
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/search/multi?api_key=30dab27f60b1e072cb74daed58002f0a`)
          .then(res => res.json())
          .then(data => setData(data.results))
    
      }, [])

      const handleClick = movie => {
        setData(data)
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=30dab27f60b1e072cb74daed58002f0a`)
          .then(res => res.json())
          .then(data => setData(data.genres))
        handleClickModal()
       
        }
      
      const handleClickModal = () => {
        setOpenModal(!openModal);
      }

      

};





export default SearchData;