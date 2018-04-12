import * as type from '../constants/ActionTypes';

const initialState = {
    eMail: '',
    ifShowLoginBox: true,
    topics:[]
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case type.ADD_TOPIC:
            return {...state, topics: action.topics}

        case type.ADD_REPLY:
            return {...state, topics: action.list.rows}

        case type.ALL_TOPIC:
            return {...state, topics: action.list.rows}

        case type.LOGIN:
            return {...state, eMail: action.eMail,ifShowLoginBox: false}
            
        default:
            return state
    }
}