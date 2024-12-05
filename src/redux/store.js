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
        },
        toggleAllArchiveByType: (state, action) => {
            const type = action.payload
            state.calls.forEach(call => {
                if (type === 'calls') {
                    call.is_archived = true
                } else if (type === 'archive') {
                    call.is_archived = false
                }
            })
        }
    }
})

export const { toCallPage, toArchivePage, setCalls, toggleCallArchive, toggleAllArchiveByType } = slice.actions

export default configureStore({
    reducer: slice.reducer
})
