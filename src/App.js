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

function App() {
  const [showHamburger, setShowHamburger] = useState(false);
  const isShowHamburger = () => {
    setShowHamburger(!showHamburger);
  };

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
