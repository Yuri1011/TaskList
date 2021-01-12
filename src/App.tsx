import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";

function App() {
    const task1 = [
        {id: 1, title: 'HTML & CSS', isDone: false},
        {id: 1, title: 'JS', isDone: false},
        {id: 1, title: 'ReactJS', isDone: false}
    ]
    const task2 = [
        {id: 1, title: 'Hello World', isDone: true},
        {id: 1, title: 'I am Happy', isDone: true},
        {id: 1, title: 'You', isDone: true}
    ]

    return (
        <div className="App">
            <TodoList title={'What to learn'} tasks={task1}/>
            <TodoList title={'Songs'} tasks={task2}/>

        </div>
    );
}

export default App;
