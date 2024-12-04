import { createSlice, configureStore } from '@reduxjs/toolkit'

const slice = createSlice({
    name: 'main',
    initialState: {
        page: 'calls',
        calls: [],
    },
    reducers: {
        toCallPage: state => {
            state.page = 'calls'
        },
        toArchivePage: state => {
            state.page = 'archive'
        },
        setCalls: (state, action) => {
            state.calls = action.payload
        },
        toggleCallArchive: (state, action) => {
            const call = state.calls.find(call => call.id === action.payload)
            call.is_archived = !call.is_archived
        }
    }
})

export const { toCallPage, toArchivePage, setCalls, toggleCallArchive } = slice.actions

export default configureStore({
    reducer: slice.reducer
})
