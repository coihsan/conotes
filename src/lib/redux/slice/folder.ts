import { FolderItem, FolderState, NoteItem } from '@/lib/types'
import { createSlice, createEntityAdapter, Update } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from '../thunk'
import { db } from '@/lib/db'
import { RootState } from '../store';

export const folderAdapter = createEntityAdapter<FolderItem>({
    sortComparer: (a, b) => {
        const createdAtA = a.createdAt || '';
        const createdAtB = b.createdAt || '';
        return createdAtB.localeCompare(createdAtA);
    },
});

const initialState: FolderState = folderAdapter.getInitialState({
    editingFolder: false,
    error: '',
    loading: true,
    status: 'pending'
})

export const fetchFolder = createAppAsyncThunk<FolderItem[], void, { rejectValue: string }>(
    'folder/fetchFolder',
    async (_, { rejectWithValue }) => {
        try {
            const folder = await db.folders.toArray()
            return folder
        } catch (error) {
            return rejectWithValue('Failed to fecth folder')
        }
    }
)

export const addNewFolderAction = createAppAsyncThunk(
    'folder/addFolder',
    async (folder: FolderItem, { rejectWithValue }) => {
        try {
            await db.folders.add({ ...folder })
        } catch (error) {
            console.log('Failed to create new folder')
            return rejectWithValue(error);
        }
    }
)

export const updateFolderName = createAppAsyncThunk<Update<FolderItem, string>, { folderId: string; folderName: string }>(
    'folder/updateFolder',
    async (data, { rejectWithValue }) => {
        try {
            const update : Partial<FolderItem> = {name: data.folderName}
            if(data.folderId){
                update.name = data.folderName
            }
            await db.folders.update(data.folderId, { name: data.folderName })
            return {id: data.folderId, changes: { name: data.folderName }}
        } catch (error) {
            return rejectWithValue("error")
        }
    }
)

export const moveNoteToFolder = createAppAsyncThunk<Update<NoteItem, string>, { noteId: string; folderId: string }>(
    'folder/addToFolder',
    async (data, { rejectWithValue }) => {
        try {
            await db.notes.update(data.noteId, { folderId: data.folderId });

            return { id: data.noteId, changes: { folderId: data.folderId } };
        } catch (error) {
            return rejectWithValue(error)
        }
    }
);


const folderSlice = createSlice({
    name: 'folder',
    initialState: initialState,
    reducers: { 
        setEditingFolder: (state, action) =>{
            state.editingFolder = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchFolder.fulfilled, (state, action) => {
                state.status = 'succeeded';
                folderAdapter.setAll(state, action.payload);
                state.loading = false
            })
            .addCase(fetchFolder.rejected, (state) => {
                state.status = 'rejected';
                state.loading = false
            })
            .addCase(fetchFolder.pending, (state) => {
                state.status = 'pending';
                state.loading = true
            })
            .addCase(addNewFolderAction.fulfilled, (state) => {
                state.status = 'succeeded'
            })
            .addCase(moveNoteToFolder.fulfilled, (state, action) => {
                state.loading = false;
                state.status = 'succeeded';
                folderAdapter.updateOne(state, action.payload)
                // const existingNote = state.entities[action.payload.id];
                // if (existingNote) {
                //     folderAdapter.updateOne(state, action.payload);
                // } 
            })
            .addCase(moveNoteToFolder.pending, (state) => {
                state.status = 'pending'
                state.loading = true
            })
            .addCase(updateFolderName.fulfilled, (state, action) => {
                state.loading = false;
                state.status = 'succeeded';
                folderAdapter.updateOne(state, action.payload)
            })

    }
})

export const { setEditingFolder } = folderSlice.actions

export default folderSlice.reducer

export const {
    selectAll: selectAllFolder,
    selectById: selectFolderById,
    selectIds: selectFolderId
} = folderAdapter.getSelectors((state: RootState) => state.folder)