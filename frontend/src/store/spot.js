const LOAD_SPOTS = "spots/LOAD"
const LOAD_SPOT = "spots/LOAD/ONE"
//**ACTIONS */


export const loadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        payload: spots
        
    }
}

export const loadOneSpot = (spot) => {
    return {
        type: LOAD_SPOT,
        payload: spot
    }
}

export const normalizeArr = (arr) => {
    const newState = {};
    arr.forEach(spot => {
        newState[spot.id] = spot;
    });
    
    return newState;
} 


//Spot initalstate
const initialState = {
    allSpots: {},
    singleSpot: {}
}

//**REDUCER AND CASES */
export default function spotReducer(state = initialState, action) {
    //converted fruits shape is from previous practice mock data, not the right store shape
    let newState
    switch (action.type) {
        // case INITIAL_SPOT: {
        //     newState = { ...state }
        //     return newState
        // }
        case LOAD_SPOTS: {
            //neccessary to render all, bug to fix
            newState = { ...state, //...action.payload
            }
            newState.allSpots = action.payload
            //creates key error, shouldnt be a problem
            return newState
        }
        case LOAD_SPOT: {
            newState = {...state}
            newState.singleSpot = action.payload
            return newState
        }


        default:
            return state
    }

}

export const fetchSpots = () => async dispatch => {
    const response = await fetch('/api/spots');
    const spots = await response.json();
    // console.log(spots)
    let convertedSpots = normalizeArr(spots.Spots)
    // console.log(convertedSpots)

    dispatch(loadSpots(convertedSpots));
};


export const fetchOneSpot = (id) => async dispatch => {
    // console.log(id)
    const response = await fetch(`/api/spots/${id}`);
    const spot = await response.json();
    // console.log("triggers fetchOneSpot")
    // console.log(spot)//the correct object
    
    dispatch(loadOneSpot(spot));
};
//dispatch works, find where the dispatch is triggered, and load the appropriate data





