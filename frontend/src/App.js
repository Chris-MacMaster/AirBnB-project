// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

import SpotsIndex from "./components/SpotsIndex/SpotsIndex"
import SpotDetail from "./components/SpotDetail/SpotDetail"


// import fruits from "./mockData/fruits.json"


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/" exact={true}>
            <SpotsIndex  />
          </Route>


          <Route path="/spots/:spotId" exact={true}>
            <SpotDetail />
          </Route>


          <Route path="/">
            <p >
              Oops! We can't find anything at 
              this url. Click the top left icon to navigate
              back to home.
            </p>
            
          </Route>

          
        </Switch>
      )}
    </>
  );
}

export default App;