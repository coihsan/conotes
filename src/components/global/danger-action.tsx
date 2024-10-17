import { Button } from "../ui/button"

type Props = {
    onClick?: () => void
    name: string
    description: string
}

const DangerAction = ({ onClick, name, description }: Props) => {
    return (
        <div className='bg-destructive/30 border border-red-500 rounded-2xl p-4'>
            <h2>{name}</h2>
            <p className='text-sm pt-2 pb-4'>
                {description}
            </p>
            <Button onClick={onClick} variant={'destructive'}>Delete</Button>
        </div>
    )
}
export default DangerAction