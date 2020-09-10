import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import charactersReducer, { getCharactersAction } from './charactersDuck'
import generalReducer from './generalDuck'
import episodesReducer from './episodesDuck'
import locationsReducer from './locationsDuck'
import thunk from 'redux-thunk'

let rootReducer = combineReducers({
    characters: charactersReducer,
    general: generalReducer,
    episodes: episodesReducer,
    locations: locationsReducer
})


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export default function generateStore() {
    let store = createStore(rootReducer,
        composeEnhancers(applyMiddleware(thunk)))
    getCharactersAction()(store.dispatch, store.getState)

    return store
}