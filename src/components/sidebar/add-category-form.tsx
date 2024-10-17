import React from 'react'
import { Input } from '@/components/ui/input'
import { ReactSubmitEvent } from '@/lib/types'

export interface AddCategoryFormProps {
  submitHandler: (event: ReactSubmitEvent) => void,
  changeHandler: (editingCategory: string, value: string) => void,
  resetHandler: () => void,
  editingCategoryId: string,
  categroyName: string,
}

const AddCategoryForm: React.FC<AddCategoryFormProps> = ({
  submitHandler,
  changeHandler,
  resetHandler,
  editingCategoryId,
  categroyName
}) => {
  return (
    <form action="">
      <Input
        type="text"
        aria-label="Category name"
        maxLength={20}
        autoFocus={true}
        placeholder="New category..."
        onChange={(event) => {
          changeHandler(editingCategoryId, event.target.value)
        }}
        onBlur={(event) => {
          if (!categroyName || categroyName.trim() === '') {
            resetHandler()
          } else {
            submitHandler(event)
          }
        }}
      />
    </form>
  )
}
export default AddCategoryForm