import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useAppSelector } from "@/lib/hooks/use-redux";
import { selectAllNotes } from "@/lib/redux/slice/notes";
import { getNotesTitle } from "@/lib/utils/helpers";
import { Home24Regular } from "@fluentui/react-icons";
import React from "react";
import { Link, useParams } from "react-router-dom";

const BreadcrumbNotes: React.FC = () => {
    const { noteId } = useParams()
    const notes = useAppSelector(selectAllNotes);
    const activeNote = notes.find((note) => note.id === noteId)
    const getNotes = activeNote ? activeNote.content : ''

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <Link to={'/app'}><Home24Regular className="size-5" /></Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>{getNotesTitle(getNotes)}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}
export default BreadcrumbNotes