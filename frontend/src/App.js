// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

import SpotsIndex from "./components/SpotsIndex/SpotsIndex"

import CurrentSpotsIndex from "./components/SpotsIndex/CurrentSpotsIndex";
import SpotDetail from "./components/SpotDetail/SpotDetail"
import SpotForm from "./components/SpotForm/CreateSpot";
import EditSpotForm from "./components/SpotForm/EditSpot";


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



          <Route path="/spots/current" exact={true}>
            <CurrentSpotsIndex />
            {/* insert the managSpots */}
          </Route>

          <Route path="/spots/current/:spotId" exact={true}>
            <EditSpotForm />

            <p>
              {/* Most useful
              <br>
              </br>
               window.location.href gives the current url:
               <br>
               </br>
              {window.location.href} */}
              Edit form will go here using spotId data from the url (window.location.href)
            </p>
            {/* <SpotForm /> */}
            {/* insert the managSpots */}
          </Route>


          <Route path="/spots/new" exact={true}>
            <SpotForm />
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