import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";

export type FilterValuesType = 'all' | 'completed' | 'active';


function App() {
    let [tasks, setTask] = useState( //возвращает обновленное состояние task в setTask
        [
            {id: 1, title: 'HTML & CSS', isDone: true},
            {id: 2, title: 'JS', isDone: true},
            {id: 3, title: 'ReactJS', isDone: false},
            {id: 4, title: 'RestApi', isDone: false},
            {id: 5, title: 'GraphQl', isDone: false}
        ]
    )

    function removeTask(id: number) {
        let filterTask = tasks.filter(task => task.id != id);/* фильтрует елементы по id и возвращает в переменную
                                                              обновленный массив task без елемента id который попал в параметры
                                                               функции removeTask и был удален.*/
        setTask(filterTask);    //содержит обновленное состояние массива task и перересовывает его.
    }

//отображам данные в зависимоти от состояния фильтра
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
                      changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
