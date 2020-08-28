import ApolloClient, { gql } from 'apollo-boost'



//Constants
const initialData = {
    fetching: false,
    characters: [],
    nextPage: 1,
    totalPages: 0,
    filterWord: '',
    currentCharracter: '',
    showModal: false,
    characterField: 'name'
}


let client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql/"
})



const GET_CHARACTERS = "GET_CHARACTERS"
const GET_CHARACTERS__SUCESS = "GET_CHARACTERS__SUCESS"
const GET_CHARACTERS__ERROR = "GET_CHARACTERS__ERROR"
const GET_CHARACTERS__NOTFOUND = "GET_CHARACTERS__NOTFOUND"
const UPDATE_CURRENTPAGE = "UPDATE_CURRENTPAGE"
const UPDATE_FILTER = "UPDATE_FILTER"
const SHOW_MODALINFO = "SHOW_MODALINFO"
const CLOSE_MODALINFO = "CLOSE_MODALINFO"
const UPDATE_CHARFIELD = "UPDATE_CHARFIELD"
const ERASE_FILTER_CHAR = "ERASE_FILTER_CHAR"

//Reducer

export default function reducer(state = initialData, action) {
    switch (action.type) {
        case GET_CHARACTERS:
            return { ...state, fetching: true }
        case GET_CHARACTERS__SUCESS:
            return { ...state, fetching: false, characters: action.payload.results, totalPages: action.payload.info.pages }
        case GET_CHARACTERS__ERROR:
            return { ...state, fetching: false, error: action.payload }
        case GET_CHARACTERS__NOTFOUND:
            return { ...state, fetching: false, error: action.payload, characters: [] }
        case UPDATE_CURRENTPAGE:
            return { ...state, nextPage: action.payload }
        case UPDATE_FILTER:
            return { ...state, filterWord: action.payload, nextPage: 1 }
        case SHOW_MODALINFO:
            return { ...state, currentCharracter: action.payload, showModal: true }
        case CLOSE_MODALINFO:
            return { ...state, currentCharracter: '', showModal: false }
        case UPDATE_CHARFIELD:
            return { ...state, characterField: action.payload }
        case ERASE_FILTER_CHAR:
            return { ...state, filterWord: '', nextPage: 1 }
        default:
            return state
    }
}

//Actions

export function handleChangeFilterAction(e, radioInput) {
    return (dispatch, getState) => {
        if (e.length >= 3) {
            dispatch({
                type: UPDATE_FILTER,
                payload: e
            })
            getCharactersAction(radioInput)(dispatch, getState)
        } else {
            dispatch({
                type: UPDATE_FILTER,
                payload: ''
            })
            getCharactersAction(radioInput)(dispatch, getState)
        }

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

export function handlePageClickAction(e) {
    return (dispatch, getState) => {
        let currentPage = e.selected + 1
         dispatch({
            type: UPDATE_CURRENTPAGE,
            payload: currentPage
        })
        let { characterField } = getState().characters
        getCharactersAction(characterField)(dispatch, getState)
    }
}


export function getCharactersAction(input) {
    let query
    let field = input

    if (input === "name") {
        query = gql`
        query ($page: Int, $name: String){
            characters(page: $page, filter: { name: $name  }){
              info{
                pages
                next
                prev
              }
              results{
                name
                image	
                id
                type
              }
            }  
          }
         `
    } else {
        query = gql`
        query ($page: Int, $type: String){
            characters(page: $page, filter: { type: $type  }){
              info{
                pages
                next
                prev
              }
              results{
                name
                image	
                id
                type
              }
            }  
          }
        `
    }
    return (dispatch, getState) => {
        dispatch({
            type: GET_CHARACTERS
        })
        let { nextPage, filterWord } = getState().characters
        return client.query({
            query,
            variables: {
                page: nextPage,
                [field]: filterWord
            }

        })
            .then(({ data }) => {
                dispatch({
                    type: GET_CHARACTERS__SUCESS,
                    payload: data.characters
                })
            }
            )
            .catch((res) => {
                const errors = res.graphQLErrors.map((error) => {
                    return error.message;
                });
                if (errors[0] === "404: Not Found") {
                    dispatch({
                        type: GET_CHARACTERS__NOTFOUND,
                        payload: errors
                    })
                } else {
                    dispatch({
                        type: GET_CHARACTERS__ERROR,
                        payload: errors
                    })

                }
            });
    }
}


export function getCharacterAction(id) {
    return (dispatch, getState) => {
        let query = gql`
        query($id:ID!) {
            character(id: $id) {
             id
             name
             type
             species
             gender
             image
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
                    type: SHOW_MODALINFO,
                    payload: data.character
                })
            })
            .catch(error => console.log(error.message))
    }
}

export function closeModal() {
    return (dispatch, getState) => {
        dispatch({
            type: CLOSE_MODALINFO
        })
    }
}

export function eraseFilterCharacterAction() {
    return (dispatch, getState) => {

        dispatch({
            type: ERASE_FILTER_CHAR
        })
    }
}