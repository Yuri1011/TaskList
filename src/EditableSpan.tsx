import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState('');

    let activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    }
    let activateViewMode = () => {
        setEditMode(false)
        props.onChange(title);
    };
    let onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    }
    return (
        editMode ? <input value={title}
                          onBlur={activateViewMode}
                          autoFocus={true}
                          onChange={onChangeTitleHandler}/>
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}