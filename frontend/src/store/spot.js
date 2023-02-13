import fruits from "../mockData/fruits.json"
//MOCK DATA

// const INITIAL_SPOT = "spots/INITIAL"
const LOAD_SPOTS = "spots/LOAD"





//**ACTIONS */
// export const initialSpots = () => {
//     return {
//         type: INITIAL_SPOT,
//         spot: fruits
//     }
// }

export const loadSpots = (spots) => {
    return {//inital vs load, this error
        type: LOAD_SPOTS,
        payload: spots
        //spots doesnt seem to be affecting outcome
    }
}



export const normalizeArr = (arr) => {
    const newState = {};
    arr.forEach(spot => {
        newState[spot.id] = spot;
    });
    //put into a helper
    return newState;
} 


//MOCK DATA
// export let convertedFruits = normalizeArr(fruits)



//Spot initalstate
const initialState = {
    allSpots: {}
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
//dispatch works, find where the dispatch is triggered, and load the appropriate data





