import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Modal=styled.div`
display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    outline: 0;
    transition: all .2s;
`


const SearchData = () =>{

    const[data, setData]= useState([])
    const [openModal, setOpenModal] = useState(false)


    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/search/multi?api_key=30dab27f60b1e072cb74daed58002f0a`)
          .then(res => res.json())
          .then(data => setData(data.results))
    
      }, [])
     
      const handleClickModal = () => {
        setOpenModal(!openModal);
      }
      
      return (

        <>
    {openModal &&
        <Modal>
          <button onClick={handleClickModal}>X</button>
        </Modal>
      }
      </>
    )

};

export default SearchData;