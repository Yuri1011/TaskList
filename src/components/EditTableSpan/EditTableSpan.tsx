import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditTableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export function EditTableSpan(props: EditTableSpanPropsType) {
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
        editMode ? <TextField value={title}
                              onBlur={activateViewMode}
                              autoFocus={true}
                              onChange={onChangeTitleHandler}/>
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}