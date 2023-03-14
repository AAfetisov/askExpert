import TodoOps from '../types';

const initialState = {
    todos: [],
    loading:false,
};

export const todosReducers = (state = initialState, action) => {
    switch(action.type){
        case TodoOps.TODO_INIT:
            return{
                ...state, todos: action.payload.data
            }

        case TodoOps.TODO_ADD:
            return{
                ...state, todos: [...state.todos,action.payload.data]
            }
        case TodoOps.TODO_DEL:
            return{
                ...state, todos:[...state.todos.filter(t=> t.id !== action.payload.id)]
            }

        case TodoOps.TODO_UPDATE:
            return{
                ...state,
                todos:[
                    ...state.todos.map(t=> t.id===action.payload.data.id? action.payload.data:t)
                ]
            }
        case TodoOps.FUNC:
            return{
                ...state, [action.payload.name]:action.payload.f
            }
        case TodoOps.LOADING_SET:
            return{
                ...state, loading: action.payload
            }
        default:
    return state;
    }

}