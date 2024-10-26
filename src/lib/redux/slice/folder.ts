import { FolderItem, FolderState } from '@/lib/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from '../thunk'
import { db } from '@/lib/db'

const initialState: FolderState = {
    folder: [],
    activeFolderId: '',
    editingFolderId: {
        id: '',
        name: ''
    },
    error: '',
    loading: true,
}

export const fetchFolder = createAppAsyncThunk(
    'folder/fetchFolder',
    async (_, { dispatch }) => {
        try {
            const folder: FolderItem[] = await db.folders.toArray()
            dispatch(setFolder(folder))
        } catch (error) {
            console.log('Failed to fecth folder')
        }
    }
)

export const addNewFolderAction = createAppAsyncThunk(
    'folder/addFolder',
    async (folder: FolderItem, { dispatch }) => {
        try {
            await db.folders.add(folder)
            dispatch(addFolder(folder))
        } catch (error) {
            console.log('Failed to create new folder')
        }
    }
)

const folderSlice = createSlice({
    name: 'folder',
    initialState: initialState,
    reducers: {
        addFolder: (state, { payload }: PayloadAction<FolderItem>) => {
            state.folder.push(payload)
        },
        setFolder: (state, { payload }: PayloadAction<FolderItem[]>) => {
            state.folder = payload
        }
    }
})

export const {
    addFolder,
    setFolder
} = folderSlice.actions

export default folderSlice.reducer