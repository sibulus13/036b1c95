import { createSlice, configureStore } from '@reduxjs/toolkit'

const pageSlice = createSlice({
    name: 'page',
    initialState: {
        value: 'calls'
    },
    reducers: {
        toCallPage: state => {
            state.value = 'calls'
        },
        toArchivePage: state => {
            state.value = 'archive'
        }
    }
})

export const { toCallPage, toArchivePage } = pageSlice.actions

export default configureStore({
    reducer: pageSlice.reducer
})
