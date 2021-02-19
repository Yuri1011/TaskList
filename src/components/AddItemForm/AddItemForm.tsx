import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    let [title, setTitle] = useState('');
    let [error, setError] = useState<string | null>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTask();
        }
    }
    const addTask = () => {
        if (title.trim() !== '') {
            props.addItem(title);
            setTitle('');
        } else {
            setError('Title is required');
        }
    }
    return (
        <div>
            <TextField onChange={onChangeHandler}
                       value={title}
                       onKeyPress={onKeyPressHandler}
                       variant={'outlined'}
                       error={!!error}
                       label={'title'}
                       helperText={error}
            />
            <IconButton onClick={addTask}>
                <AddBox color={'primary'}/>
            </IconButton>
        </div>
    )
}