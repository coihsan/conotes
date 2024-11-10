import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal24Regular } from '@fluentui/react-icons'
import { useAppSelector } from '@/lib/hooks/use-redux'
import { selectAllNotes } from '@/lib/redux/slice/notes'
import { getFolderName, getNotesTitle } from '@/lib/utils/helpers'
import { selectAllFolder } from '@/lib/redux/slice/folder'
import { Link } from 'react-router-dom'

const NoteListTable = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const notes = useAppSelector(selectAllNotes)
    const folder = useAppSelector(selectAllFolder)

    const filteredDocuments = notes.filter(doc =>
        doc.content?.toString().toLowerCase().includes(searchTerm.toLowerCase()) && !doc.trash
    )

    return (
        <div className="container mx-auto">
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
                        {filteredDocuments.slice(0, 10).map((doc) => (
                            <TableRow key={doc.id}>
                                <TableCell className="font-medium">
                                    <Link className='hover:underline' to={`/app/${doc.id}`}>{getNotesTitle(doc.content)}</Link>
                                </TableCell>
                                <TableCell>{doc.lastUpdated}</TableCell>
                                <TableCell>
                                    {getFolderName(folder, doc.folderId as string)}
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal24Regular className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem>View</DropdownMenuItem>
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
export default NoteListTable