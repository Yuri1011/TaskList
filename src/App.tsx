import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

type TaskStateType = {
    [key: string]: Array<TaskType>
}
export type FilterValuesType = 'all' | 'completed' | 'active';
type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

function App() {
    let todoListId_1 = v1();
    let todoListId_2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {
            id: todoListId_1,
            title: 'What to Learn',
            filter: 'all'
        },
        {
            id: todoListId_2,
            title: 'What to buy',
            filter: 'all'
        }
    ])
    let [tasks, setTasks] = useState<TaskStateType>({
        [todoListId_1]:
            [
                {id: v1(), title: 'HTML & CSS', isDone: true},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'ReactJS', isDone: false}
            ],
        [todoListId_2]:
            [
                {id: v1(), title: 'RestApi', isDone: false},
                {id: v1(), title: 'GraphQl', isDone: false}
            ]
    })

    function removeTodoList(id: string) {
        setTodoLists(todoLists.filter(tl => tl.id != id));
        delete tasks[id];
        setTasks({...tasks});
    }

    function addTask(title: string, todoListId: string) {
        let task = {id: v1(), title: title, isDone: false}
        let todoListTasks = tasks[todoListId];
        tasks[todoListId] = [task, ...todoListTasks];
        setTasks({...tasks});
    }

    function removeTask(id: string, todoListId: string) {
        let todoListTasks = tasks[todoListId];
        tasks[todoListId] = todoListTasks.filter(t => t.id != id);
        setTasks({...tasks});
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        let todolist = todoLists.find(tl => tl.id === todoListId);
        if (todolist) {
            todolist.filter = value;
            setTodoLists([...todoLists]);
        }
    }

    function changeStatus(id: string, isDone: boolean, todoListId: string) {
        let todoListTasks = tasks[todoListId];
        let task = todoListTasks.find(t => t.id === id);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }
    }

    function addTodoList(title: string) {
        let todoList: TodoListType = {
            id: v1(),
            filter: 'all',
            title: title
        };
        setTodoLists([todoList, ...todoLists]);
        setTasks({
            ...tasks,
            [todoList.id]: []
        })
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {
                todoLists.map(tl => {
                    let allTodoListTasks = tasks[tl.id];
                    let tasksForTodoList = allTodoListTasks;

                    if (tl.filter === 'active') {
                            tasksForTodoList = allTodoListTasks.filter(task => !task.isDone);
                        }
                        if (tl.filter === 'completed') {
                            tasksForTodoList = allTodoListTasks.filter(task => task.isDone);
                        }
                        return <TodoList title={tl.title}
                                         tasks={tasksForTodoList}
                                         removeTask={removeTask}
                                         changeFilter={changeFilter}
                                         addTask={addTask}
                                         filter={tl.filter}
                                         changeTaskStatus={changeStatus}
                                         removeTodoList={removeTodoList}
                                         id={tl.id}
                                         key={tl.id}

                        />
                    }
                )
            }
        </div>
    );
}

export default App;
