import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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

    const removeTodoList = () => {
        props.removeTodoList(props.id)
    };
    const onClickAllHandler = () => props.changeFilter('all', props.id)
    const onClickActiveHandler = () => props.changeFilter('completed', props.id)
    const onClickCompletedHandler = () => props.changeFilter('active', props.id)
    const addTask = (title: string) => props.addTask(title, props.id);
    return (
        <div>
            <h3>{props.title}
                <button onClick={removeTodoList}>X</button>
            </h3>
            <AddItemForm addItem={addTask}/>
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
                                    <input type="checkbox"
                                           checked={t.isDone}
                                           onChange={onChangeHandler}/>
                                    <EditableSpan title={t.title}/>
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


