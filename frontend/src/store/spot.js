import fruits from "../mockData/fruits.json"
//MOCK DATA

const INITIAL_SPOT = "spots/INITIAL"
const LOAD_SPOTS = "spots/LOAD"





//**ACTIONS */
export const initialSpots = () => {
    return {
        type: INITIAL_SPOT,
        spot: fruits
    }
}

export const loadSpots = (spots) => {
    return {//inital vs load, this error
        type: LOAD_SPOTS,
        spots: spots
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
export let convertedFruits = normalizeArr(fruits)

//**REDUCER AND CASES */
export default function spotReducer(state = convertedFruits, action) {
    switch (action.type) {
        case INITIAL_SPOT: {
            const newState = { ...state }
            return newState
        }
        case LOAD_SPOTS: {
            const newState = { ...state, ...action.spots}
            return newState
        }
        default:
            return state
    }

}

export const fetchSpots = () => async dispatch => {
    const response = await fetch('/api/spots');
    const spots = await response.json();
    console.log(spots)
    let convertedSpots = normalizeArr(spots.Spots)
    console.log(convertedSpots)



    dispatch(loadSpots(convertedSpots));
};
//dispatch works, find where the dispatch is triggered, and load the appropriate data












// export const loadArticles = (articles) => {
//     return {
//         type: LOAD_ARTICLES,
//         articles
//     };
// };

// export const addArticle = (article) => {
//     return {
//         type: ADD_ARTICLE,
//         article
//     };
// };

// export const fetchArticles = () => async (dispatch) => {
//     const response = await fetch('/api/articles');
//     const articles = await response.json();
//     dispatch(loadArticles(articles));
// };
