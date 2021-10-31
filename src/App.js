import { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContext";
import TagContextProvider from "./contexts/TagContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import Hamburger from "./components/Hamburger";
import Home from "./pages/home";
import Search from "./pages/search";
import Post from "./pages/post";
import User from "./pages/user";
import "./App.scss";
// import postApi from "./api/postApi";
// import { STORAGE_KEY } from "./constants/storageKey";

function App() {
  const [showHamburger, setShowHamburger] = useState(false);
  // const [tags, setTags] = useState([]);
  const isShowHamburger = () => {
    setShowHamburger(!showHamburger);
  };

  // useEffect(() => {
  //   const getTags = async () => {
  //     try {
  //       const res = await postApi.getTags();
  //       if (res.status && res.status === "success") {
  //         // console.log(res.data.tags);
  //         setTags(res.data.tags);
  //         localStorage.setItem(STORAGE_KEY.tags, JSON.stringify(res.data.tags));
  //       } else {
  //         console.log(res);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   getTags();
  // }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <AuthContextProvider>
          <Navigation openHumburger={isShowHamburger} />
          {showHamburger && <Hamburger closeHumburger={isShowHamburger} />}
          <div className="main-container">
            <TagContextProvider>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/post">
                  <Post />
                </Route>
                <Route path="/search">
                  <Search />
                </Route>
                <Route path="/user">
                  <User />
                </Route>
                <Route>
                  <NotFound />
                </Route>
              </Switch>
            </TagContextProvider>
          </div>
          <Footer />
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
