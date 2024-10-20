import React from "react";
import { Separator } from "../ui/separator";

type Props = {
    labelName: string;
    buttonAction?: React.ReactNode
    filterAction?: React.ReactNode
    searchAction?: React.ReactNode
}

const HeaderSidebar: React.FC<Props> = ({
    labelName,
    buttonAction,
    filterAction,
    searchAction
}) => {
    return (
        <>
            <div className='static px-2'>
                <div className="flex items-center justify-between mb-2 px-4">
                    <span className="text-xl font-medium">{labelName}</span>
                    <div className='flex items-center gap-3'>
                        {buttonAction}
                        {filterAction}
                    </div>
                </div>
                {searchAction}
            </div>
            <Separator className='mt-4' orientation='horizontal' />
        </>
    )
}
export default HeaderSidebar