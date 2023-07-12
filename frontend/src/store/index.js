// frontend/src/store/index.js
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reviewReducer from './review';
import sessionReducer from './session';
import spotReducer from './spot';
import searchReducer from './search';

const rootReducer = combineReducers({
    session: sessionReducer,
    spots: spotReducer,
    reviews: reviewReducer,
    searchResults: searchReducer
});

let enhancer;

if (process.env.NODE_ENV !== 'production') {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true }) : compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
} else {
    enhancer = applyMiddleware(thunk);
}




const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
