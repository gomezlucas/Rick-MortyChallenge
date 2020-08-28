import ApolloClient, { gql } from 'apollo-boost'


//Constants
const initialData = {
    fetching: false,
    episodes: [],
    nextPage: 1,
    totalPages: 0,
    filterWord: '',
    showModal: false,
    currentEpisode: ''
}


let client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql/"
})

const GET_EPISODES = "GET_EPISODES"
const GET_EPISODES__SUCESS = "GET_EPISODES__SUCESS"
const GET_EPISODES__ERROR = "GET_EPISODES__ERROR"
const GET_EPISODES__NOTFOUND = "GET_EPISODES__NOTFOUND"
const UPDATE_CURRENTPAGE = "UPDATE_CURRENTPAGE"
const UPDATE_FILTER_EPI = "UPDATE_FILTER"
const SHOW_MODALINFO_EPI = "SHOW_MODALINFO_EPI"
const CLOSE_MODALINFO_EPI = "CLOSE_MODALINFO_EPI"
const ERASE_FILTER_EPI = "ERASE_FILTER_EPI"

//Reducers

export default function reducer(state = initialData, action) {
    switch (action.type) {
        case GET_EPISODES:
            return { ...state, fetching: true }
        case GET_EPISODES__SUCESS:
            return { ...state, fetching: false, episodes: action.payload.results, totalPages: action.payload.info.pages }
        case GET_EPISODES__ERROR:
            return { ...state, fetching: false, error: action.payload }
        case GET_EPISODES__NOTFOUND:
            return { ...state, fetching: false, error: action.payload, episodes: [] }
        case UPDATE_CURRENTPAGE:
            return { ...state, nextPage: action.payload }
        case SHOW_MODALINFO_EPI:
            return { ...state, currentEpisode: action.payload, showModal: true }
        case CLOSE_MODALINFO_EPI:
            return { ...state, currentEpisode: '', showModal: false }
        case UPDATE_FILTER_EPI:
            return { ...state, filterWord: action.payload, nextPage: 1 }
        case ERASE_FILTER_EPI:
            return { ...state, filterWord: '', nextPage: 1 }
        default:
            return { ...state }
    }

}

//Actions


export function getEpisodesAction() {
    let query = gql`
     query ($page: Int, $name: String){ 
        episodes(page: $page, filter: { name: $name  }) {
          info{
            pages
            next
            prev
          }
          results{
            id
            name
            episode
          }
        }
           }
         `

    return (dispatch, getState) => {
        dispatch({
            type: GET_EPISODES
        })
        let { nextPage, filterWord } = getState().episodes
          return client.query({
            query,
            variables: {
                page: nextPage,
                name: filterWord
            }
        })
            .then(({ data }) => {
                 dispatch({
                    type: GET_EPISODES__SUCESS,
                    payload: data.episodes
                })
            }
            )
            .catch((res) => {
                const errors = res.graphQLErrors.map((error) => {
                    return error.message;
                });
                if (errors[0] === "404: Not Found") {
                    dispatch({
                        type: GET_EPISODES__NOTFOUND,
                        payload: errors
                    })
                } else {
                    dispatch({
                        type: GET_EPISODES__ERROR,
                        payload: errors
                    })

                }
            });
    }
}

export function handleEpisodePageClickAction(e) {
    return (dispatch, getState) => {
        let currentPage = e.selected + 1
        dispatch({
            type: UPDATE_CURRENTPAGE,
            payload: currentPage
        })
        getEpisodesAction()(dispatch, getState)
    }
}


export function getEpisodeAction(id) {
    return (dispatch, getState) => {
        let query = gql`
           query($id:ID!) {
            episode(id: $id){
                air_date
                name
                episode
                characters{
                    name
                    image
                    }
                }
            }
        `
        return client.query({
            query,
            variables: {
                id,
            }
        })
            .then(({ data }) => {
                dispatch({
                    type: SHOW_MODALINFO_EPI,
                    payload: data.episode
                })
            })
            .catch(error => console.log(error.message))

    }
}


export function handleChangeFilterAction(e){
    return (dispatch,getState) =>{
         if (e.length >= 3) {
             dispatch({
                type: UPDATE_FILTER_EPI,
                payload: e
            })
            getEpisodesAction()(dispatch, getState)
        } else {
            dispatch({
                type: UPDATE_FILTER_EPI,
                payload: ''
            })
            getEpisodesAction()(dispatch, getState)
        }

    }

    }


export function closeModal() {
    return (dispatch, getState) => {
        dispatch({
            type: CLOSE_MODALINFO_EPI
        })
    }
}

export function eraseFilterEpisodesAction(){
    return (dispatch,getState)=>{
         dispatch({
            type: ERASE_FILTER_EPI
        })
    }
}