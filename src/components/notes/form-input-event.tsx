import React from 'react'
import { Input } from '@/components/ui/input'
import { ReactSubmitEvent } from '@/lib/types'

export interface FormInputEventProps {
  submitHandler: (event: ReactSubmitEvent) => void,
  changeHandler: (editFormName: string, value: string) => void,
  resetHandler: () => void,
  editingFormId: string,
  nameForm: string,
  placeholder: string
}

const FormInputEvent: React.FC<FormInputEventProps> = ({
  submitHandler,
  changeHandler,
  resetHandler,
  editingFormId,
  nameForm,
  placeholder
}) => {
  return (
    <form action="">
      <Input
        type="text"
        className='h-8 rounded-none border-none'
        aria-label={nameForm}
        maxLength={20}
        autoFocus={true}
        placeholder={placeholder}
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