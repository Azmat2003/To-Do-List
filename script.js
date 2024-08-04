const todoBtn = document.querySelector('.todo-btn');
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const a = 232;

const init = ()=>{
    let todoListArr;

    if(localStorage.getItem('todoList')){
        todoListArr = JSON.parse(localStorage.getItem('todoList'));
    }
    else{
        todoListArr = [];
    }

    todoListArr.forEach((todo)=>{
        
        // creating div of todo
        const newTodo = document.createElement('div');
        newTodo.classList.add('todo');

        // creating li
        const newTodoList = document.createElement('li');
        newTodoList.innerHTML = todo;

        // check btn
        const newTodoCheckBtn = document.createElement('button');
        newTodoCheckBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
        newTodoCheckBtn.style.backgroundColor = 'white';

        // trash btn
        const newTodoTrashBtn = document.createElement('button');
        newTodoTrashBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
        newTodoTrashBtn.style.backgroundColor = 'red';

        // appending to div
        newTodo.appendChild(newTodoList);
        newTodo.appendChild(newTodoCheckBtn);
        newTodo.appendChild(newTodoTrashBtn);

        // appending div to todoList
        todoList.appendChild(newTodo);

    })

}

const saveTodoListToLocalStorage = (todo)=>{
    let todoListArr;
    if(localStorage.getItem('todoList')){
        todoListArr = JSON.parse(localStorage.getItem('todoList'));
    }
    else{
        todoListArr = [];
    }

    todoListArr.push({text: todo,completed: false});

    localStorage.setItem('todoList', JSON.stringify(todoListArr));

};

document.addEventListener('DOMContentLoaded',init);

todoBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    
    const todoText = todoInput.value;
    console.log(todoText);

    if(todoText===""){
        return;
    }

    saveTodoListToLocalStorage(todoText);

    // creating div of todo
    const newTodo = document.createElement('div');
    newTodo.classList.add('todo');

    // creating li
    const newTodoList = document.createElement('li');
    newTodoList.innerHTML = todoText;

    // check btn
    const newTodoCheckBtn = document.createElement('button');
    newTodoCheckBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    newTodoCheckBtn.style.backgroundColor = 'white';

    // trash btn
    const newTodoTrashBtn = document.createElement('button');
    newTodoTrashBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    newTodoTrashBtn.style.backgroundColor = 'red';

    // appending to div
    newTodo.appendChild(newTodoList);
    newTodo.appendChild(newTodoCheckBtn);
    newTodo.appendChild(newTodoTrashBtn);

    // appending div to todoList
    todoList.appendChild(newTodo);

    todoInput.value = "";

});



