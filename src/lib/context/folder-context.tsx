import ReactDOM from 'react-dom'
import React, { createContext, useContext, useState } from 'react'

type Props = {
    addFolder: boolean;
    setAddFolder: (adding: boolean) => undefined
}

const FolderContext : React.FC<Props> = ({ addFolder, setAddFolder}) => {
    return(
        <div></div>
    )
}
export default FolderContext