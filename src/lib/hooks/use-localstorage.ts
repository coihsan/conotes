import { useEffect, useState } from "react"

const setItem = (key: string, value: unknown) => {
    try {
        window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
        console.log(error)
    }
}

const getItem = (key: string) => {
    try {
        const item = window.localStorage.getItem(key)
        return item ? JSON.parse(item) : undefined
    } catch (error) {
        console.log(error)
    }
}

const useLocalStorage = <T>(key: string, initialValue: T) => {
    const [value, setValue] = useState(() => {
        const item = getItem(key)
        return (item as T) || initialValue;
    })
    useEffect(() => {
        setItem(key, value)
    }, [value, key])

    const setValueWrapper = (newValue: T) => {
        setValue(newValue);
    };

    return [value, setValueWrapper] as const
}

export default useLocalStorage
