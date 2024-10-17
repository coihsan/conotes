import { getNotesTitle } from "@/lib/helpers"
import React from "react"

type Props = {
    noteTitle: string
}

const NoteTitle : React.FC<Props> = ({noteTitle}) =>{
    return getNotesTitle(noteTitle)
}
export default NoteTitle