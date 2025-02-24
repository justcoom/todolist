import {FilterValues, Todolist} from "../app/App.tsx";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

const initialState: Todolist[] = []

export const deleteTodolistAC = createAction<{id: string}>('delete-todolist')

export const createTodolistAC = createAction('create-todolist', (title: string) => {
    return {payload: {title, id: nanoid()}}
})

export const changeTodolistTitleAC = createAction<{id: string, title: string}>('change-todolist-title')

export const changeTodolistFilterAC = createAction<{id: string, filter: FilterValues}>('change-todolist-filter')

// export const todolistReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
//     switch (action.type) {
//         case 'delete-todolist': {
//             return state.filter(tl => tl.id !== action.payload.id)
//         }
//         case "create-todolist": {
//             const newTodolist: Todolist = {id: action.payload.id, title: action.payload.title, filter: "all"}
//             return [...state, newTodolist]
//         }
//         case 'change-todolist-title': {
//             return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
//         }
//         case "change-todolist-filter": {
//             return state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
//         }
//         default: {
//             return state
//         }
//     }
// }

export const todolistReducer = createReducer(initialState, builder => {
    builder.addCase(deleteTodolistAC, (state, action) => {
        const index = state.findIndex(tl => tl.id === action.payload.id)
        if (index !== -1) {
            state.splice(index, 1)
        }
    })
    builder.addCase(createTodolistAC, (state, action) => {
        state.push({...action.payload, filter: 'all'})
    })
    builder.addCase(changeTodolistTitleAC, (state, action) => {
        const index = state.findIndex(tl => tl.id === action.payload.id)
        if (index !== -1) {
            state[index].title = action.payload.title
        }
    })
    builder.addCase(changeTodolistFilterAC, (state, action) => {
        const todolist = state.find(tl => tl.id === action.payload.id)
        if (todolist) {
            todolist.filter = action.payload.filter
        }
    })
})