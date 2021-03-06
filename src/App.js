import React, { useState } from 'react';
import styled from 'styled-components';
import { Home } from '@styled-icons/feather/Home/Home';
import { Video } from '@styled-icons/feather/Video/Video';
import { Tv } from '@styled-icons/feather/Tv/Tv';
import { Search } from '@styled-icons/feather/Search/Search';
import Movies from './components/Movies';
import TvShows from './components/TvShows';
import Home1 from './components/Home1';
import SearchData from './components/SearchData';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';




const Body = styled.body`
font-family: Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif;
background-color: rgb(35, 39, 42);
color: rgb(220, 221, 222);
font-weight: 300;
margin: 0px;
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


 /*Resolver el color de los iconos*/ 
p { color: rgb(33, 150, 243);
}
`


const App = () => {

  const [page, setPage] = useState([])


  const handleClickPage = e => {
    setPage(e.target.id)
  }


  return (
    
    <Body>
      <Router>
        <>

          <NavContainer>
            <ul>
              <p> <Link to="/"><Home /></Link></p>
              <p> <Link to="/movies"><Video id="movie" onClick={handleClickPage} Movies /></Link></p>
              <p> <Link to="/tv"><Tv id="tv" onclick={handleClickPage} TvShows /></Link></p>
              <p>  <Link to="/search"><Search id="search" onclick={handleClickPage} SearchData /></Link></p>
            </ul>
          </NavContainer>

          <Switch>
            <Route exact path="/" component={Home1}></Route>
            <Route exact path="/movies" component={Movies}></Route>
            <Route exact path="/tv" component={TvShows}></Route>
            <Route exact path="/search" component={SearchData}></Route>
          </Switch>
        </>


      </Router>

    </Body>
  )
};

export default App;



