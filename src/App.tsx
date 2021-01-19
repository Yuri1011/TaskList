import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'completed' | 'active';


function App() {

    let [tasks, setTask] = useState(
        [
            {id: v1(), title: 'HTML & CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'RestApi', isDone: false},
            {id: v1(), title: 'GraphQl', isDone: false}
        ]
    )

    function addTask(title: string) {
        let task = {id: v1(), title: title, isDone: false}
        let newTasks = [task, ...tasks];
        setTask(newTasks);
    }

    function removeTask(id: string) {
        let filterTask = tasks.filter(task => task.id !== id);
        setTask(filterTask);
    }

    let [filter, setFilter] = useState<FilterValuesType>('all');
    let tasksForTodoList = tasks;

    if (filter === 'active') {
        tasksForTodoList = tasks.filter(task => !task.isDone);
    }
    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(task => task.isDone);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    return (
        <div className="App">
            <TodoList title={'What to learn'} tasks={tasksForTodoList} removeTask={removeTask}
                      changeFilter={changeFilter} addTask={addTask}/>
        </div>
    );
}

export default App;
