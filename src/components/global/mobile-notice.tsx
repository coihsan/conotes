import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import React from "react"
import { ChevronRight12Filled } from "@fluentui/react-icons"

const MobileNotice: React.FC = () => {
    const [isCopied, setIsCopied] = React.useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText('https://nulihapp.vercel.app').then(() => {
            setIsCopied(true)
            setTimeout(() => {
                setIsCopied(false)
            }, 1000)
        }).catch((error) => {
            console.error('Failed to copy text: ', error)
        })
    }

    return (
        <Dialog>
            <DialogTrigger className="w-full">
                <Button className="w-full flex items-center justify-center gap-2" size={'lg'} variant={'default'}>
                    Get Started
                    <ChevronRight12Filled />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-3xl">Ooppss! Sorry</DialogTitle>
                    <DialogDescription>
                        <p className="text-md pt-3"><strong className="text-foreground">We are not currently supported for tablet and mobile devices</strong>. Please use a desktop browser to view this app.</p>
                        <p className="text-red-600 dark:text-red-500 my-4">This message appears because you are using a mobile / tablet device</p>
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <div className="text-sm text-muted-foreground text-center">Copy this link</div>
                    <div className="flex items-center gap-1 max-w-72 w-full mx-auto pt-3">
                        <Input placeholder="https://nulihapp.vercel.app" readOnly />
                        <Button className="w-28" onClick={handleCopy} variant={'default'} size={'default'}>
                            {isCopied ? (
                                "Copied!"
                            ) : (
                                "Copy"
                            )}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default MobileNotice