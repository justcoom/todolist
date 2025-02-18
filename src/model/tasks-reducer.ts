import {Task, TasksState} from "../App.tsx";
import {CreateTodolistAction, DeleteTodolistAction} from "./todolistReducer.ts";
import {v1} from "uuid";

const initialState: TasksState = {}

type DeleteTaskAction = ReturnType<typeof deleteTaskAC>

type CreateTaskAction = ReturnType<typeof createTaskAC>

type ChangeStatusAction = ReturnType<typeof changeTaskStatusAC>

type ChangeTaskTitleAction = ReturnType<typeof changeTaskTitleAC>

type Actions = CreateTodolistAction | DeleteTodolistAction | DeleteTaskAction | CreateTaskAction | ChangeStatusAction | ChangeTaskTitleAction

export const deleteTaskAC = (payload: { todolistId: string, taskId: string }) => {
    const {todolistId, taskId} = payload
    return {type: 'delete-task', payload: {todolistId, taskId}} as const
}

export const createTaskAC = (payload: {todolistId: string, title: string}) => {
    const {todolistId, title} = payload
    return {type: 'create-task', payload: {todolistId, title}} as const
}

export const changeTaskStatusAC = (payload: {todolistId: string, taskId: string, isDone: boolean}) => {
    const {todolistId, taskId, isDone} = payload
    return {type: 'change-status', payload: {todolistId, taskId, isDone}} as const
}

export const changeTaskTitleAC = (payload: {todolistId: string, taskId: string, title: string}) => {
    const {todolistId, taskId, title} = payload
    return {type: 'change-task-title', payload: {todolistId, taskId, title}} as const
}

export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
    switch (action.type) {
        case 'create-todolist': {
            return {...state, [action.payload.id]: []}
        }
        case "delete-todolist": {
            delete state[action.payload.id]
            return {...state}
        }
        case 'delete-task': {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)}
        }
        case "create-task": {
            const newTask: Task = {id: v1(), title: action.payload.title, isDone: false}
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        }
        case "change-status": {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {...t, isDone: action.payload.isDone} : t)}
        }
        case "change-task-title": {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {...t, title: action.payload.title} : t)}
        }
        default: {
            return state
        }
    }
}