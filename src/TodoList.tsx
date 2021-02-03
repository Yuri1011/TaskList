import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsTypeTodoList = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    filter: string
    changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void
    removeTodoList: (id: string) => void
}

export function TodoList(props: PropsTypeTodoList) {

    let [title, setTitle] = useState('');
    let [error, setError] = useState<string | null>(null);

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title, props.id);
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
    const onClickAllHandler = () => props.changeFilter('all', props.id)
    const onClickCompletedHandler = () => props.changeFilter('active', props.id)
    const onClickActiveHandler = () => props.changeFilter('completed', props.id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }
    return (
        <div>
            <h3>{props.title}
                <button onClick={() => props.removeTodoList(props.id)}>X</button>
            </h3>
            <div>
                <input value={title}
                       onKeyPress={onKeyPressHandler} onChange={onChangeHandler}/>
                <button onClick={addTask}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map((t) => {
                        const onClickRemoveTaskHandler = () => props.removeTask(t.id, props.id);
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked;
                            props.changeTaskStatus(t.id, newIsDoneValue, props.id);
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