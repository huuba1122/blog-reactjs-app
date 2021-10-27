import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import Hamburger from "./components/Hamburger";
import Home from "./pages/home";
import Search from "./pages/search";
import Post from "./pages/post";
import User from "./pages/user";
import './App.scss';
import authApi from './api/authApi';
import postApi from './api/postApi';
import {STORAGE_KEY} from './constants/storageKey';

function App() {
  const [showHamburger, setShowHamburger] = useState(false);
  const [userLogin, setUserLogin] = useState(authApi.getCurrentUser());
  const [tags, setTags] = useState([]);
  const isShowHamburger = () => {
    setShowHamburger(!showHamburger);
  };

  const isLogged = (action) => {
      if(action === 'login'){
        setUserLogin(authApi.getCurrentUser());
      } else if(action === 'logout'){
        setUserLogin(null);
      }     
  }

  useEffect( () => {
    const getTags = async () => {
      try {
        const res = await postApi.getTags();
      if(res.status && res.status === 'success'){
        // console.log(res.data.tags);
        setTags(res.data.tags);
        localStorage.setItem(STORAGE_KEY.tags, JSON.stringify(res.data.tags));
      }else{
        console.log(res);
      } 
      } catch (error) {
        console.log(error);
      }
    };

    getTags();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navigation openHumburger={isShowHamburger} userLogin={userLogin} isLogged={isLogged} />
        {showHamburger && <Hamburger closeHumburger={isShowHamburger} />}
        <div className="main-container">
        <Switch>
          <Route exact path="/">
            <Home tags={tags} />
          </Route>
          <Route path="/post">
            <Post />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/user">
            <User isLogged={isLogged} />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
