import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import ButtonMenu from '@/components/primitive/button-menu';
import { LabelText } from '@/lib/label-text';
import { useState } from "react";
import { Add24Regular, ChevronDown20Regular, ChevronRight20Regular } from "@fluentui/react-icons";

type SidebarGroupProps = {
    children : React.ReactNode
    sidebarName: string
}
const SidebarGroup : React.FC<SidebarGroupProps> = ({ children, sidebarName }) => {
    const [isOpen, setIsOpen] = useState(false)
    
    return(
        <div className='w-full'>
            <Collapsible
                open={isOpen}
                onOpenChange={setIsOpen}
            >
                <div className='flex items-center justify-between w-full relative'>
                    <CollapsibleTrigger className="text-sm flex items-center gap-3">
                        { isOpen ? <ChevronDown20Regular /> : <ChevronRight20Regular /> }
                        {sidebarName}
                    </CollapsibleTrigger>
                        <ButtonMenu side='right' size={'icon'} variant={'ghost'} label={LabelText.CREATE_NEW_FOLDER}>
                            <Add24Regular className='size-5' />
                        </ButtonMenu>
                </div>
                <CollapsibleContent>
                    {children}
                </CollapsibleContent>
            </Collapsible>
        </div>
    )
}
export default SidebarGroup