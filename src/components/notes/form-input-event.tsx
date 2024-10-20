import React from 'react'
import { Input } from '@/components/ui/input'
import { ReactSubmitEvent } from '@/lib/types'

export interface FormInputEventProps {
  submitHandler: (event: ReactSubmitEvent) => void,
  changeHandler: (editNotesTitle: string, value: string) => void,
  resetHandler: () => void,
  editingFormId: string,
  nameForm: string,
}

const FormInputEvent: React.FC<FormInputEventProps> = ({
  submitHandler,
  changeHandler,
  resetHandler,
  editingFormId,
  nameForm
}) => {
  return (
    <form action="">
      <Input
        type="text"
        aria-label={nameForm}
        maxLength={20}
        autoFocus={true}
        placeholder="Insert text here..."
        onChange={(event) => {
          changeHandler(editingFormId, event.target.value)
        }}
        onBlur={(event) => {
          if (!nameForm || nameForm.trim() === '') {
            resetHandler()
          } else {
            submitHandler(event)
          }
        }}
      />
    </form>
  )
}
export default FormInputEvent