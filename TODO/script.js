document.addEventListener('DOMContentLoaded', ()=>{
    const input= document.getElementById('todo-input');
const button=document.getElementById('add-task-btn');
const list=document.getElementById('todo-list')

let texts = JSON.parse(localStorage.getItem("tasks"))||[];
texts.forEach((element) => { 
    render(element)
 });

button.addEventListener('click', (event)=>{
    const temp=input.value.trim();
    if(temp==='') {
        alert("enter a valid task");
        return
    }
    
    const aboutask={
        id: Date.now(),
        text: temp,
        completed: false
    };
    texts.push(aboutask)
    addtolocal();
    input.value=''; //clears the input space
    console.log(texts);
    
}) 

function render(task){
    let li= document.createElement('li');
    li.setAttribute("data-id",task.id );
    li.innerHTML= `<span>${task.text}</span> <button>delete</button>`;
    list.appendChild(li);

    li.addEventListener('click', (e)=>{

        if(e.target.tagName==='BUTTON') return;
        task.completed = !(task.completed);
        li.classList.toggle("completed");
        addtolocal();
    });

    li.querySelector('button').addEventListener('click', (e)=>{
        e.stopPropagation();
        texts = texts.filter((t)=> t.id !==task.id);
        li.remove();
        addtolocal();
    });
}

function addtolocal(){
    localStorage.setItem('tasks', JSON.stringify(texts))
}
})

