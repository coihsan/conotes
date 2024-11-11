import { useState } from 'react'
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useAppSelector } from '@/lib/hooks/use-redux'
import { selectAllNotes } from '@/lib/redux/slice/notes'
import { getFolderName, getNotesTitle } from '@/lib/utils/helpers'
import { selectAllFolder } from '@/lib/redux/slice/folder'
import { Link } from 'react-router-dom'
import { ScrollArea } from '../ui/scroll-area'
import NotesListItemOptions from '../notes/noteslist-item-options'

const NoteListTable = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const notes = useAppSelector(selectAllNotes)
    const folder = useAppSelector(selectAllFolder)

    const filteredDocuments = notes.filter(doc =>
        doc.content?.toString().toLowerCase().includes(searchTerm.toLowerCase()) && !doc.trash
    )

    return (
        <ScrollArea className="container mx-auto border h-full rounded-r-2xl">
            <div className='p-10'>
                <div className="mb-4">
                    <Input
                        type="text"
                        placeholder="Search documents..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-sm"
                    />
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Last Updated</TableHead>
                            <TableHead>Folder</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredDocuments.map((doc) => (
                            <TableRow key={doc.id}>
                                <TableCell className="font-medium">
                                    <Link className='hover:underline' to={`/app/${doc.id}`}>{getNotesTitle(doc.content)}</Link>
                                </TableCell>
                                <TableCell>{doc.lastUpdated}</TableCell>
                                <TableCell>
                                    {getFolderName(folder, doc.folderId as string)}
                                </TableCell>
                                <TableCell className="text-right">
                                    <NotesListItemOptions noteId={doc.id} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </ScrollArea>
    )
}
export default NoteListTable