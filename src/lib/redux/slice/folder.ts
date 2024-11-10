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
            const id = await db.folders.add({ ...folder })
            return { ...folder, id }
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
            const update: Partial<FolderItem> = { name: data.folderName }
            if (data.folderId) {
                update.name = data.folderName
            }
            await db.folders.update(data.folderId, { name: data.folderName })
            return { id: data.folderId, changes: { name: data.folderName } }
        } catch (error) {
            return rejectWithValue("Error to update folder name")
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

export const deleteFolder = createAppAsyncThunk<Update<FolderItem, string>, { folderId: string }, { rejectValue: string }>(
    'folder/deleteFolder',
    async (data, { rejectWithValue }) => {
        try {
            const folderToDelete = await db.folders.get(data.folderId);

            if (folderToDelete) {
                const notesInFolder = await db.notes.where('folderId').equals(data.folderId).toArray();
                for (const note of notesInFolder) {
                    await db.notes.delete(note.id);
                }
                await db.folders.delete(folderToDelete.id);
                return { id: folderToDelete.id, changes: {} };
            } else {
                return rejectWithValue('Folder not found');
            }
        } catch (error) {
            return rejectWithValue('Error deleting folder: ' + error);
        }
    }
);



const folderSlice = createSlice({
    name: 'folder',
    initialState: initialState,
    reducers: {
        setEditingFolder: (state, action) => {
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
            .addCase(addNewFolderAction.fulfilled, (state, action) => {
                state.status = 'succeeded'
                folderAdapter.addOne(state, action.payload)
            })
            .addCase(moveNoteToFolder.fulfilled, (state, action) => {
                state.loading = false;
                state.status = 'succeeded';
                const existingNote = state.entities[action.payload.id];
                if (existingNote) {
                    folderAdapter.updateOne(state, action.payload);
                }
            })
            .addCase(updateFolderName.fulfilled, (state, action) => {
                state.loading = false;
                state.status = 'succeeded';
                folderAdapter.updateOne(state, action.payload)
            })
            .addCase(deleteFolder.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.loading = false;
                folderAdapter.removeOne(state, action.payload.id)
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