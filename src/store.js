
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import reducer from './app/root-reducer';


//Midleware


const store = createStore(
    reducer,
    compose( applyMiddleware(thunk,logger), 
    typeof window === 'object' &&
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? 
        window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
);


export default store;