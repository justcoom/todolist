import {TasksState} from "../app/App.tsx";
import {createTodolistAC, deleteTodolistAC} from "./todolistReducer.ts";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

const initialState: TasksState = {}

export const deleteTaskAC = createAction<{todolistId: string, taskId: string}>('delete-task')

export const createTaskAC = createAction<{todolistId: string, title: string}>('create-task')

export const changeTaskStatusAC = createAction<{todolistId: string, taskId: string, isDone: boolean}>('change-task-status')

export const changeTaskTitleAC = createAction<{todolistId: string, taskId: string, title: string}>('change-task-title')

export const tasksReducer = createReducer(initialState, builder => {
    builder.addCase(createTodolistAC, (state, action) => {
        state[action.payload.id] = []
    })
    builder.addCase(deleteTodolistAC, (state, action) => {
        delete state[action.payload.id]
    })
    builder.addCase(deleteTaskAC, (state, action) => {
        const index = state[action.payload.todolistId].findIndex(task => task.id === action.payload.taskId)
        if (index !== -1) {
            state[action.payload.todolistId].splice(index, 1)
        }
    })
    builder.addCase(createTaskAC, (state, action) => {
        state[action.payload.todolistId].unshift({id: nanoid(), title: action.payload.title, isDone: false})
    })
    builder.addCase(changeTaskStatusAC, (state, action) => {
        const task = state[action.payload.todolistId].find(t => t.id === action.payload.taskId)
        if (task) {
            task.isDone = action.payload.isDone
        }
    })
    builder.addCase(changeTaskTitleAC, (state, action) => {
        const task = state[action.payload.todolistId].find(t => t.id === action.payload.taskId)
        if (task) {
            task.title = action.payload.title
        }
    })
})