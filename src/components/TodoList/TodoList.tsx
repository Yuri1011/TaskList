import React, {ChangeEvent} from "react";
import {FilterValuesType} from "../../App/App";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditTableSpan} from "../EditTableSpan/EditTableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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
    changeTaskTitle: (id: string, newTitle: string, todoListId: string) => void
    removeTodoList: (id: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
}

export function TodoList(props: PropsTypeTodoList) {

    const removeTodoList = () => {
        props.removeTodoList(props.id)
    };
    const onClickAllHandler = () => props.changeFilter('all', props.id)
    const onClickActiveHandler = () => props.changeFilter('completed', props.id)
    const onClickCompletedHandler = () => props.changeFilter('active', props.id)
    const addTask = (title: string) => props.addTask(title, props.id);
    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle);
    }
    return (
        <div>
            <h3>
                <EditTableSpan title={props.title}
                               onChange={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    props.tasks.map((t) => {
                            const onClickRemoveTaskHandler = () => props.removeTask(t.id, props.id);
                            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                let newIsDoneValue = e.currentTarget.checked;
                                props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                            }
                            const onChangeTitleHandler = (newValue: string) => {
                                props.changeTaskTitle(t.id, newValue, props.id);
                            }
                            return (
                                <div key={t.id}
                                     className={t.isDone ? 'is-done' : ''}>
                                    <Checkbox color={'primary'}
                                              checked={t.isDone}
                                              onChange={onChangeHandler}/>
                                    <EditTableSpan title={t.title}
                                                   onChange={onChangeTitleHandler}/>
                                    <IconButton onClick={onClickRemoveTaskHandler}>
                                        <Delete/>
                                    </IconButton>
                                </div>
                            )
                        }
                    )
                }
            </div>
            <div>
                <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                        onClick={onClickAllHandler}
                        color={'inherit'}>
                    All
                </Button>
                <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                        onClick={onClickCompletedHandler}
                        color={'primary'}>
                    Active
                </Button>
                <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                        onClick={onClickActiveHandler}
                        color={'secondary'}>
                    Completed
                </Button>
            </div>
        </div>
    )
}


