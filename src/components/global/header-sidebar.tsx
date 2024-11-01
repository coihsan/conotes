import React from "react";
import { Separator } from "../ui/separator";

type Props = {
    labelName: string;
    countIndex?: string | number;
    buttonAction?: React.ReactNode
    filterAction?: React.ReactNode
    searchAction?: React.ReactNode
}

const HeaderSidebar: React.FC<Props> = ({
    labelName,
    countIndex,
    buttonAction,
    filterAction,
    searchAction
}) => {
    return (
        <>
            <div className='static px-2'>
                <div className="flex items-center justify-between mb-2 px-4">
                    <div className="flex items-center gap-3">
                        <span className="text-xl font-medium">{labelName}</span>
                        {countIndex ? (
                            <div className="size-6 font-medium rounded-full bg-creek-800 text-creek-200 flex items-center justify-center">{countIndex}</div>
                        ) : (
                            null
                        )
                        }
                    </div>
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