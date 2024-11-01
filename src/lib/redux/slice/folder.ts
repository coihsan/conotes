import { FolderItem, FolderState } from '@/lib/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from '../thunk'
import { db } from '@/lib/db'

const initialState: FolderState = {
    folder: [],
    editingFolder: false,
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

export const updateFolderName = createAppAsyncThunk(
    'folder/updateFolder',
    async(data: {folderId: string, folderName: string}, {dispatch, rejectWithValue}) =>{
        try {
            const existingFolder = await db.folders.get(data.folderId)
            if(existingFolder){
                const dataFolder = {
                    id: data.folderId,
                    name: data.folderName
                }
                await db.folders.update(data.folderId, {name : data.folderName})
                dispatch(updateFolder(dataFolder))
                return dataFolder
            }
        } catch (error) {
            rejectWithValue(error)
        }
    }
)

export const moveNoteToFolder = createAppAsyncThunk(
    'folder/addToFolder',
    async(data: {folderId: string, noteId: string}) => {
        try {
            await db.folderNotes.add(data.folderId, data.noteId)
        } catch (error) {
            console.log(error)
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
        },
        toggleEdit:( state, action) => {
            state.editingFolder = action.payload
        },
        updateFolder: (state, { payload } : PayloadAction<FolderItem>) => {
            state.folder = state.folder.map((item) =>
                item.id === payload.id ? { ...item, name: payload.name } : item
            )
        },
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
    setFolder,
    updateFolder,
    toggleEdit,
} = folderSlice.actions

export default folderSlice.reducer