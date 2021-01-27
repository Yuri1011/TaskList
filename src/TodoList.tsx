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
    filter: string
    changeTaskStatus: (id: string, isDone: boolean) => void
}

export function TodoList(props: PropsTypeTodoList) {

    let [title, setTitle] = useState('');
    let [error, setError] = useState<string | null>(null)
    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title);
            setTitle('');
        } else {
            setError('Title is required');
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTask();
        }
    }
    const onClickAllHandler = () => props.changeFilter('all')
    const onClickCompletedHandler = () => props.changeFilter('active')
    const onClickActiveHandler = () => props.changeFilter('completed')
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onKeyPress={onKeyPressHandler} onChange={onChangeHandler}/>
                <button onClick={addTask}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map((t) => {
                            const onClickRemoveTaskHandler = () => props.removeTask(t.id);
                            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                let newIsDoneValue = e.currentTarget.checked;
                                props.changeTaskStatus(t.id, newIsDoneValue);
                            }
                            return (
                                <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                                    <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
                                    <span>{t.title}</span>
                                    <button onClick={onClickRemoveTaskHandler}>X</button>
                                </li>
                            )
                        }
                    )
                }
            </ul>

            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''}
                        onClick={onClickAllHandler}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onClickCompletedHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onClickActiveHandler}>Completed
                </button>
            </div>
        </div>
    )
}