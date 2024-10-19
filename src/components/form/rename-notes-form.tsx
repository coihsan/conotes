import React from 'react'
import { Input } from '@/components/ui/input'
import { ReactSubmitEvent } from '@/lib/types'

export interface RenameNotesFormProps {
  submitHandler: (event: ReactSubmitEvent) => void,
  changeHandler: (editNotesTitle: string, value: string) => void,
  resetHandler: () => void,
  editingNameNotesId: string,
  nameNotes: string,
}

const RenameNotesForm: React.FC<RenameNotesFormProps> = ({
  submitHandler,
  changeHandler,
  resetHandler,
  editingNameNotesId,
  nameNotes
}) => {
  return (
    <form action="">
      <Input
        type="text"
        aria-label="Notes title"
        maxLength={20}
        autoFocus={true}
        placeholder="New title..."
        onChange={(event) => {
          changeHandler(editingNameNotesId, event.target.value)
        }}
        onBlur={(event) => {
          if (!nameNotes || nameNotes.trim() === '') {
            resetHandler()
          } else {
            submitHandler(event)
          }
        }}
      />
    </form>
  )
}
export default RenameNotesForm