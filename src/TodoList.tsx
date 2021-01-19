import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsTypeTodoList = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export function TodoList(props: PropsTypeTodoList) {

    let [title, setTitle] = useState('');

    const addTask = () => {
        props.addTask(title);
        setTitle('');
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {

        if (e.key === 'Enter') {
            addTask();
        }
    }
    const onClickAllHandler = () => props.changeFilter('all')
    const onClickCompletedHandler = () => props.changeFilter('active')
    const onClickActiveHandler = () => props.changeFilter('completed')

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map((task) => {
                            const onClickRemoveTaskHandler = () => props.removeTask(task.id);

                            return (
                                <li key={task.id}>
                                    <input type="checkbox" checked={task.isDone}/>
                                    <span>{task.title}</span>
                                    <button onClick={onClickRemoveTaskHandler}>X</button>
                                </li>
                            )
                        }
                    )
                }
            </ul>

            <div>
                <button onClick={onClickAllHandler}>All</button>
                <button onClick={onClickCompletedHandler}>Active</button>
                <button onClick={onClickActiveHandler}>Completed</button>
            </div>
        </div>
    )
}