import React, { createContext, useContext, useState } from 'react'

type Props = {
    addFolder: boolean;
    setAddFolder: (adding: boolean) => undefined
}

// const useFolderContext : React.FC<Props> = () => {}