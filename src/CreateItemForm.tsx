import {type ChangeEvent, type KeyboardEvent, useState} from 'react'
import TextField from '@mui/material/TextField';
import IconButton from "@mui/material/IconButton";
// import {Button} from './Button'
import AddBoxIcon from '@mui/icons-material/AddBox'


type Props = {
    onCreateItem: (title: string) => void
}

export const CreateItemForm = ({onCreateItem}: Props) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const createItemHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== '') {
            onCreateItem(trimmedTitle)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError(null)
    }

    const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createItemHandler()
        }
    }

    return (
        <div>
            <TextField
                label={"Enter a title"}
                variant={"outlined"}
                size={"small"}
                error={!!error}
                helperText={error}
                value={title}
                onChange={changeTitleHandler}
                onKeyDown={createItemOnEnterHandler}

            />
            <IconButton color={"primary"} onClick={createItemHandler}>
                <AddBoxIcon/>
            </IconButton>
        </div>
    )
}