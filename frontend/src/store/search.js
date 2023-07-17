import { csrfFetch } from "./csrf"
const LOAD_SPOT_SEARCH = "search/spots/LOAD"

export const normalizeArr = (arr) => {
    const newState = {};
    arr.forEach(spot => {
        newState[spot.id] = spot;
    });

    return newState;
} 

//**Actions */
export const actionLoadSpotResults = (searchResults) => {
    return {
        type: LOAD_SPOT_SEARCH,
        payload: searchResults
    }
}

//**Thunks */

export const fetchSpotsSearch = () => async dispatch => {
    const response = await csrfFetch('/api/spots');
    const spots = await response.json();
    let convertedSpots = normalizeArr(spots.Spots)

    if (response.ok) {
        dispatch(actionLoadSpotResults(convertedSpots));
    }
};

const initialState = {
    allSpots: {},
}

//**Reducer and Cases */
export default function searchReducer(state = initialState, action) {

    switch (action.type) {
        // perhaps split into groups and events
        case LOAD_SPOT_SEARCH: {
            const newState = { allSpots: { ...state.allSpots } }
            newState.allSpots = action.payload
            return newState
        }

        default: return state
    }
}
