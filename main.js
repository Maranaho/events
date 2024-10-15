//Target Elements
const inputElt = document.getElementsByTagName("input")[0]
const btnElt = document.getElementsByTagName("button")[0]
const listElt = document.getElementsByTagName("ol")[0]

// Define variables
const todoList = {
    5684576345:{
        label: "New todo",
        isDone: false,
        isDeleted: false
    },
    987656787678:{
        label: "Another todo",
        isDone: true,
        isDeleted: false
    },
    6457678767:{
        label: "A third todo",
        isDone: false,
        isDeleted: false
    },
}


//Functions
const handleInputChange = e =>{
    const label = e.target.value
    const key = new Date().getTime()
    
    const newTodo = {
        label,
        isDone: false,
        isDeleted: false
    }

    todoList[key] = newTodo

    inputElt.value = ""
    fillOlWithTodos()
    
    
}

const fillOlWithTodos = ()=>{

    //Clear the list
    listElt.innerHTML = ""

    //Fill the list
   Object.keys(todoList)
   .filter(key => !todoList[key].isDeleted)
   .forEach(key=>{    
    const { label, isDone, isDeleted } = todoList[key]

    //Create an li elt
    const liElt = document.createElement("li")
        
    //Span element
    const spanElt = document.createElement("span")
    if(isDone) spanElt.classList.add("done")
    spanElt.innerText = label
    

    //Mark as done Button
    const isDoneBtn = document.createElement("button")
    isDoneBtn.setAttribute("data","isDone")
    isDoneBtn.setAttribute("key",key)
    isDoneBtn.innerText = isDone ?  "Undo" : "Mark as done"
    
    //Mark as done Button
    const deleteBtn = document.createElement("button")
    deleteBtn.setAttribute("data","delete")
    deleteBtn.setAttribute("key",key)
    deleteBtn.innerText = "Delete"


    // Put th espan and the 2 buttons inside of the li
    liElt.appendChild(spanElt)
    liElt.appendChild(isDoneBtn)
    liElt.appendChild(deleteBtn)


    //Put each li into the ol
    listElt.appendChild(liElt)

    
   })
   
}

const handleDelete = key => todoList[key].isDeleted = true
const handleMarkAsDone = key => todoList[key].isDone = !todoList[key].isDone

const handleListClick = e => {
    const btn = e.target

    if(btn.nodeName === "BUTTON") {
        const key = btn.getAttribute("key")
        if(btn.getAttribute("data") === "delete") handleDelete(key)
        else handleMarkAsDone(key)
        
        fillOlWithTodos()
    }
    
}

const eventsListeners = ()=>{
    inputElt.addEventListener("change",handleInputChange)
    listElt.addEventListener("click",handleListClick)
}

const init = ()=>{
    eventsListeners()
    fillOlWithTodos()
}

init()