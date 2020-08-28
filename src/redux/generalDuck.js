//Constants

const initialData = {
    radio: "characters",
 
}

const UPDATE_RADIO = "UPDATE_RADIO"


//Reducers
export default function reducer(state = initialData, action) {
    switch (action.type) {
        case UPDATE_RADIO:
            return { ...state, radio: action.payload }
        default:
            return { ...state }
    }

}


//Actions

export function updateRadiosAction(type) {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_RADIO,
            payload: type,
        })
    }
}
