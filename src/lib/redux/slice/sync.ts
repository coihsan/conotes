import { SynchronizePayload, SynchronizeState } from '@/lib/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const initialState: SynchronizeState = {
  lastSync: '',
  error: '',
  sync: false,
  pendingSync: false,
}

const syncSlice = createSlice({
  name: 'sync',
  initialState,
  reducers: {
    setPendingSync: (state) => {
      state.pendingSync = true
    },

    sync: (state, { payload }: PayloadAction<SynchronizePayload>) => {
      state.sync = true
    },

    syncError: (state, { payload }: PayloadAction<string>) => {
      state.sync = false
      state.error = payload
    },

    syncSuccess: (state, { payload }: PayloadAction<string>) => {
      state.sync = false
      state.lastSync = payload
      state.pendingSync = false
    },
  },
})

export const { setPendingSync, sync, syncError, syncSuccess } = syncSlice.actions

export default syncSlice.reducer