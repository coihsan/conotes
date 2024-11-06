import { FolderItem, FolderNotes, FolderState, NoteItem } from '@/lib/types'
import { createSlice, createEntityAdapter, Update } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from '../thunk'
import { db } from '@/lib/db'
import { RootState } from '../store';
import { notesAdapter } from './notes';

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

export const getNoteInFolder = createAppAsyncThunk(
    'folder/getNoteFolder',
    async (data: { folderId: string, noteId: string }, { rejectWithValue }) => {
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
    async (folder: FolderItem, { rejectWithValue }) => {
        try {
            await db.folders.add({ ...folder })
        } catch (error) {
            console.log('Failed to create new folder')
            return rejectWithValue(error);
        }
    }
)

export const updateFolderName = createAppAsyncThunk(
    'folder/updateFolder',
    async (data: { folderId: string, folderName: string }, { rejectWithValue }) => {
        try {
            const existingFolder = await db.folders.get(data.folderId)
            if (existingFolder) {
                const dataFolder = {
                    id: data.folderId,
                    name: data.folderName
                }
                await db.folders.update(data.folderId, { name: data.folderName })
                return dataFolder
            }
        } catch (error) {
            rejectWithValue(error)
        }
    }
)

export const moveNoteToFolder = createAppAsyncThunk<Update<NoteItem, string>, { noteId: string; folderId: string }>(
    'folder/addToFolder',
    async (data, { rejectWithValue }) => {
        try {
            return await db.transaction('rw', db.notes, db.folders, db.folderNotes, async () => {
                await db.notes.update(data.noteId, { folderId: data.folderId });
                await db.folderNotes.where('folderId').equals(data.noteId).delete();
                await db.folderNotes.add({ folderId: data.folderId, noteId: data.noteId });

                return { id: data.noteId, changes: { folderId: data.folderId } } as unknown as Update<FolderNotes, string>;
            });
        } catch (error) {
            return rejectWithValue(error)
        }
    }
);

// export const moveNoteToFolder = createAppAsyncThunk<Update<NoteItem, string>, { noteId: string; folderId: string }>(
//     'folder/addToFolder',
//     async (data, { rejectWithValue }) => {
//         try {
//             return await db.transaction('rw', db.notes, db.folders, db.folderNotes, async () => {
//                 const [validNotes, validFolder] = await Promise.all([
//                     db.notes.get(data.noteId),
//                     db.folders.get(data.folderId)
//                 ]);

//                 if (!validNotes) throw new Error('Invalid noteId');
//                 if (!validFolder) throw new Error('Invalid folderId');
//                 await db.folderNotes.put({ noteId: data.noteId, folderId: data.folderId });
//                 console.log('success move to folder')
//                 return { id: data.noteId, changes: { folderId: data.folderId } } as unknown as Update<FolderNotes, string>;
//             });
//         } catch (error) { return rejectWithValue(error) }
//     }
// );



const folderSlice = createSlice({
    name: 'folder',
    initialState: initialState,
    reducers: {},
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
        // .addCase(moveNoteToFolder.fulfilled, (state, action) => {
        //     state.loading = false
        //     state.status = 'succeeded'
        //     notesAdapter.updateOne(state, action.payload); 
        // })
    }
})

export const { } = folderSlice.actions

export default folderSlice.reducer

export const {
    selectAll: selectAllFolder,
    selectById: selectFolderById
} = folderAdapter.getSelectors((state: RootState) => state.folder)