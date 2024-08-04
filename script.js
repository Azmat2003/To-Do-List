const todoBtn = document.querySelector('.todo-btn');
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');


function deleteTodo(todoText){
    let todoListArr;

    if(localStorage.getItem('todoList')){
        todoListArr = JSON.parse(localStorage.getItem('todoList'));
    }
    else{
        todoListArr = [];
    }

    const updatedList = todoListArr.filter((todo)=>{
        return todo.text !== todoText;
    });

    localStorage.setItem('todoList',JSON.stringify(updatedList));

}

const CompleteTask = (todoText)=>{
    let todoListArr;

    if(localStorage.getItem('todoList')){
        todoListArr = JSON.parse(localStorage.getItem('todoList'));
    }
    else{
        todoListArr = [];
    }

    let updatedList = todoListArr.map((todo)=>{
        if(todo.text === todoText){
            return {text: todo.text, completed: !todo.completed}
        }
        else{
            return todo;
        }
    });

    localStorage.setItem('todoList',JSON.stringify(updatedList));

};

const init = ()=>{
    let todoListArr;

    if(localStorage.getItem('todoList')){
        todoListArr = JSON.parse(localStorage.getItem('todoList'));
    }
    else{
        todoListArr = [];
    }

    todoList.innerHTML = ``;
    todoListArr.forEach((todo)=>{
        
        // creating div of todo
        const newTodo = document.createElement('div');
        newTodo.classList.add('todo');

        // creating li
        const newTodoList = document.createElement('li');
        newTodoList.innerHTML = todo.text;

        // check btn
        const newTodoCheckBtn = document.createElement('button');
        newTodoCheckBtn.classList.add('check-btn');
        newTodoCheckBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
        newTodoCheckBtn.style.backgroundColor = (todo.completed) ? 'teal' : 'white';

        // trash btn
        const newTodoTrashBtn = document.createElement('button');
        newTodoTrashBtn.classList.add('trash-btn');
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



// events

document.addEventListener('DOMContentLoaded',init);

// Add todoList
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
    newTodoCheckBtn.classList.add('check-btn');
    newTodoCheckBtn.innerHTML = '<i class="fa-solid fa-check"></i>';

    // trash btn
    const newTodoTrashBtn = document.createElement('button');
    newTodoTrashBtn.classList.add('trash-btn');
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

// delete
todoList.addEventListener('click',(e)=>{
    // console.log(e.target);

    const item = e.target;
    
    if(item.classList.contains('trash-btn') || item.classList.contains('fa-trash')){
        // console.log("DELETE");
        const up = item.classList.contains('trash-btn') ? 1 : 2;

        const li = up===1 ? item.parentElement : item.parentElement.parentElement;

        // console.log("li",li);

        const liText = li.firstElementChild;
        // console.log("liText",liText);

        const liTextValue = liText.textContent;
        // console.log("liTextValue",liTextValue);

        // deleting from list
        deleteTodo(liTextValue);

        // printing after deleting
        init();

    }
});

// check box
todoList.addEventListener('click',(e)=>{
    const item = e.target;
    console.log(item);
    if(item.classList.contains('check-btn') || item.classList.contains('fa-check')){
        const up = item.classList.contains('check-btn') ? 1 : 2;

        const divList = up===1 ? item.parentElement : item.parentElement.parentElement;

        console.log("divList",divList);

        const liText = divList.firstElementChild;
        const liTextValue = liText.textContent;

        CompleteTask(liTextValue);

        init();

    }
});
