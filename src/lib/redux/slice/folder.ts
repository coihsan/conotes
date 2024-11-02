import { FolderItem, FolderNotes, FolderState } from '@/lib/types'
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

export const getNoteInFolder = createAppAsyncThunk(
    'folder/getNoteFolder',
    async(data: {folderId: string, noteId: string}, {rejectWithValue}) => {
       try {
        return await db.folderNotes
        .where("folderId")
        .equals(data.folderId)
        .toArray()
        .then(async (relations) => {
        const noteIds = relations.map((relation) => relation.noteId);
        return await db.notes.where("id").anyOf(noteIds).toArray();
        });
       } catch (error) {
        rejectWithValue(error)
       }
    }
)

export const addNewFolderAction = createAppAsyncThunk(
    'folder/addFolder',
    async (folder: FolderItem, { dispatch, rejectWithValue }) => { 
        try {
            await db.folders.add({...folder})
            dispatch(addFolder(folder))
        } catch (error) {
            console.log('Failed to create new folder')
            return rejectWithValue(error);
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
    async(data: FolderNotes) => {
        try {
            await db.folderNotes.add(data)
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
        // .addCase(moveNoteToFolder.fulfilled, (state, action) => {
        //     state.folder.push(...action.payload)
        // })
    }
})

export const {
    setFolder,
    addFolder,
    updateFolder,
} = folderSlice.actions

export default folderSlice.reducer