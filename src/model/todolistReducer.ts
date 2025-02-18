import {FilterValues, Todolist} from "../App.tsx";
import {v1} from "uuid";

const initialState: Todolist[] = []

export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>

export type CreateTodolistAction = ReturnType<typeof createTodolistAC>

export type changeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>

export type changeTodolistFilterAction = ReturnType<typeof changeTodolistFilterAC>

type Actions = DeleteTodolistAction | CreateTodolistAction | changeTodolistTitleAction | changeTodolistFilterAction

export const deleteTodolistAC = (id: string) => {
    return {type: "delete-todolist", payload: {id: id}} as const
}

export const createTodolistAC = (title: string) => {
    const todolistID = v1()
    return {type: "create-todolist", payload: {id: todolistID, title}} as const
}

export const changeTodolistTitleAC = (payload: {id: string, title: string}) => {
    const {id, title} = payload
    return {type: "change-todolist-title", payload: {id, title}} as const
}

export const changeTodolistFilterAC = (payload: {id: string, filter: FilterValues}) => {
    const {id, filter} = payload
    return {type: 'change-todolist-filter', payload: {id, filter}} as const
}

export const todolistReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
    switch (action.type) {
        case 'delete-todolist': {
            return state.filter(tl => tl.id !== action.payload.id)
        }
        case "create-todolist": {
            const newTodolist: Todolist = {id: action.payload.id, title: action.payload.title, filter: "all"}
            return [...state, newTodolist]
        }
        case 'change-todolist-title': {
            return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
        }
        case "change-todolist-filter": {
            return state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
        }
        default: {
            return state
        }
    }
}