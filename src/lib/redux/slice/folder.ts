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
    status: 'pending'
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

export const getNotesByActiveFolderId = createAppAsyncThunk(
    'folder/folderById',
    async (folderId: string, {dispatch, rejectWithValue}) => {
       try {
        const folderById = await db.folders.get(folderId)
       } catch (error) {
        rejectWithValue(error)
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
    },
    extraReducers(builder){
        builder
        .addCase(fetchFolder.fulfilled, (state) => {
            state.status = 'succeeded'
        })
        .addCase(addNewFolderAction.fulfilled, (state) => {
            state.status = 'succeeded'
        })
    }
})

export const {
    addFolder,
    setFolder
} = folderSlice.actions

export default folderSlice.reducer