//Constants
import ApolloClient, { gql } from 'apollo-boost'

const initialData = {
    fetching: false,
    nextPage: 1,
    totalPages: 0,
    filterWord: '',
    currentLocation: '',
    showModal: false,
    locationField: 'name',
}
let client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql/"
})


const GET_LOCATIONS = "GET_LOCATIONS"
const GET_LOCATIONS__SUCCESS = "GET_LOCATIONS__SUCCESS"
const GET_LOCATIONS__ERROR = "GET_LOCATIONS__ERROR"
const GET_LOCATIONS__NOTFOUND = "GET_LOCATIONS__NOTFOUND"
const UPDATE_CURRENTPAGE = "UPDATE_CURRENTPAGE"
const SHOW_MODALINFO_LOC = "SHOW_MODALINFO_LOC"
const CLOSE_MODALINFO_LOC = "CLOSE_MODALINFO_LOC"
const UPDATE_CHARFIELD = "UPDATE_CHARFIELD"
const UPDATE_FILTER = "UPDATE_FILTER"
const ERASE_FILTER_LOC = "ERASE_FILTER_LOC"

//Reducer


export default function reducer(state = initialData, action) {
    switch (action.type) {
        case GET_LOCATIONS:
            return { ...state, fetching: true }
        case GET_LOCATIONS__SUCCESS:
            return { ...state, fetching: false, locations: action.payload.results, totalPages: action.payload.info.pages }
        case GET_LOCATIONS__ERROR:
            return { ...state, fetching: false, error: action.payload }
        case GET_LOCATIONS__NOTFOUND:
            return { ...state, fetching: false, error: action.payload, locations: [] }
        case UPDATE_CURRENTPAGE:
            return { ...state, nextPage: action.payload }
        case SHOW_MODALINFO_LOC:
            return { ...state, currentLocation: action.payload, showModal: true }
        case CLOSE_MODALINFO_LOC:
            return { ...state, currentLocation: '', showModal: false }
        case UPDATE_CHARFIELD:
            return { ...state, locationField: action.payload }
        case UPDATE_FILTER:
            return { ...state, filterWord: action.payload, nextPage: 1 }
        case ERASE_FILTER_LOC:
            return { ...state, filterWord: '', nextPage: 1 }
        default:
            return { ...state }
    }
}


//Actions 


export function getLocationsAction(input) {
    let query
    let field = input
 
    if (input === "name") {
        query = gql`
        query ($page: Int, $name: String){
            locations(page: $page, filter: { name: $name  }){
              info{
                pages
                next
                prev
              }
              results{
                name
                id
                type
              }
            }  
          }
         `
    } else {
        query = gql`
         query ($page: Int, $type: String){
              locations(page: $page, filter: { type: $type  }){
              info{
                pages
                next
                prev
              }
              results{
                name
                id
                type
              }
            }  
           }
         `
    }
    return (dispatch, getState) => {
        dispatch({
            type: GET_LOCATIONS
        })
        let { nextPage, filterWord } = getState().locations
        return client.query({
            query,
            variables: {
                page: nextPage,
                [field]: filterWord
            }

        })
            .then(({ data }) => {
                 dispatch({
                    type: GET_LOCATIONS__SUCCESS,
                    payload: data.locations
                })
            }
            )
            .catch((res) => {
                const errors = res.graphQLErrors.map((error) => {
                    return error.message;
                });
                if (errors[0] === "404: Not Found") {
                    dispatch({
                        type: GET_LOCATIONS__NOTFOUND,
                        payload: errors
                    })
                } else {
                    dispatch({
                        type: GET_LOCATIONS__ERROR,
                        payload: errors
                    })

                }
            });
    }
}


export function handleLocPageClickAction(e) {
    return (dispatch, getState) => {
         let currentPage = e.selected + 1
         dispatch({
            type: UPDATE_CURRENTPAGE,
            payload: currentPage
        })
        let { locationField } = getState().locations
        getLocationsAction(locationField)(dispatch, getState)
    }
}


export function getLocationAction(id) {
    return (dispatch, getState) => {
        let query = gql`
        query($id:ID!) {
            location(id: $id) {
                name
                id
    		    type
                dimension
                residents{
                    name
                    image
                }
           }
         }
        `
        return client.query({
            query,
            variables: {
                id
            }
        })
            .then(({ data }) => {
                 dispatch({
                    type: SHOW_MODALINFO_LOC,
                    payload: data.location
                })
            })
            .catch(error => console.log(error.message))
    }
}

export function handleRadioInput(radioInput) {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_CHARFIELD,
            payload: radioInput
        })
    }
}


export function handleChangeFilterAction(e, radioInput) {
    return (dispatch, getState) => {
         if (e.length >= 3) {
            dispatch({
                type: UPDATE_FILTER,
                payload: e
            })
            getLocationsAction(radioInput)(dispatch, getState)
        } else {
            dispatch({
                type: UPDATE_FILTER,
                payload: ''
            })
            getLocationsAction(radioInput)(dispatch, getState)
        }

    }
}


export function closeModal() {
    return (dispatch, getState) => {
        dispatch({
            type: CLOSE_MODALINFO_LOC
        })
    }
}

export function eraseFilterLocationAction() {
    return (dispatch, getState) => {

        dispatch({
            type: ERASE_FILTER_LOC
        })
    }
}