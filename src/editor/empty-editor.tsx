import { Link } from "react-router-dom"


const EmptyEditor = () =>{
    return(
        <div className="h-full flex justify-center items-center p-2 rounded-r-2xl border-r-[1px] border-y-[1px] bg-zinc-50 dark:bg-zinc-900">
           <div>
                <h1 className="text-4xl font-semibold">Conotes App</h1>
                <p className="text-muted-foreground">A web-based notes app for everyone</p>
                <ul className="text-lg text-muted-foreground mt-2 list-disc pt-9">
                    <li><b>Free (forever)</b></li>
                    <li><b>No Ads / Advertising</b></li>
                    <li><b>No tracking or analytics</b></li>
                    <li><b>Support </b><Link className="text-yellow-500 hover:underline" target='_blank' to={'https://en.wikipedia.org/wiki/WYSIWYG'}>WYSIWYG</Link> </li>
                    <li><b>No database</b> – all notes are only stored in client-side storage <Link className="text-yellow-500 hover:underline" target='_blank' to={'https://en.wikipedia.org/wiki/Indexed_Database_API'}> (indexedDB)</Link></li>
                    <li><b>No login</b> – only available for demo user w/o login or signup (for now)</li>
                    <li><b>Search notes</b> – easely search all notes, or notes with specific tag</li>
                </ul>
           </div>
        </div>
    )
}
export default EmptyEditor