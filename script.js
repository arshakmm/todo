//Search Person
const nameInput = document.getElementById('name_input');
const searchButton = document.getElementById('search_btn');
const searchError = document.getElementById('searchError');
let currentSearchName = '';

//Add To-DO
const toDoInput = document.getElementById('todo');
const dateInput = document.getElementById('date_input');
const addToDoButton = document.getElementById('add');
const addToDoWrapper = document.getElementById('add_to_do_wrapper');
let todo = {
    date: '',
    todoValue: ''
}


//To-DO
const toDoListDiv = document.getElementById('toDoList');
const toDoListDivWrapper  = document.getElementById('currToDos');

// Delite 





    

    // const deleteTodo = document.getElementById('delTodo')

    // deleteTodo.addEventListener('click', (event) => {
    //     toDoListDiv = toDoListDiv.filter( (item)  =>{
    //         return item.event != event;


    //     })
        
    // })


nameInput.addEventListener('change', (event) => {  
    currentSearchName = ''
    currentSearchName = event.target.value  
}) 

searchButton.addEventListener('click', search) 

toDoInput.addEventListener('change', (event) => {
    todo = {
        ...todo,
        todoValue: event.target.value
    }   
    toDoInput.value = '' 
})

dateInput.addEventListener('change', (event) => {
    
    todo = {
        ...todo,
        date: event.target.value
    }
    
})

addToDoButton.addEventListener('click', addCurrentToDo)


async function addCurrentToDo () {
    const toDoList = await localStorage.getItem('todos'); 
    let newValues = {};
    if(JSON.parse(toDoList) && Object.entries(JSON.parse(toDoList)).length > 0){ 
        const searchToDos = JSON.parse(toDoList)[currentSearchName]
        console.log(searchToDos)
        if(searchToDos){
            newValues = {
                
                ...newValues,
                ...JSON.parse(toDoList),
                [currentSearchName]: [...searchToDos, todo] 
            }
        }else{
            newValues = {
               
                ...newValues,
                ...JSON.parse(toDoList),
                [currentSearchName]: [todo]
            }
        }

    }else{
        newValues = {
            [currentSearchName]: [todo]
        }
    }

    localStorage.setItem('todos', JSON.stringify(newValues))


    let currentValues = ''
    if(JSON.parse(toDoList) && Object.entries(JSON.parse(toDoList)).length > 0){
        const localValues = [...JSON.parse(toDoList)[currentSearchName], todo]
        toDoListDivWrapper.style.display = 'flex'
        for(let i = 0; i < localValues.length; i++ ){
            console.log(localValues[i].date)
            const currentColoredDivs = checkFieldsAndStyling(localValues[i].date, localValues[i].todoValue) 
            currentValues += currentColoredDivs
        }

    }
    toDoListDiv.innerHTML = currentValues
    
}

async function search () {
    const storagNames = await localStorage.getItem('users')
    const includingName = Array.isArray(JSON.parse(storagNames)) && JSON.parse(storagNames).includes(currentSearchName)  
    toDoListShowing()

    let newStorageNames = []
    if(Array.isArray(JSON.parse(storagNames))){ 
        if(!includingName){
            newStorageNames = [...JSON.parse(storagNames),currentSearchName] 
        }else{
            newStorageNames = [...JSON.parse(storagNames)] 
        }
    }else{
        newStorageNames = [currentSearchName] 
    } 
    localStorage.setItem('users',JSON.stringify(newStorageNames)) 
    nameInput.value = ''
    addToDoWrapper.style.display = 'flex'
}


async function toDoListShowing () {
    const toDoList = await localStorage.getItem('todos');
    let currentValues = ''
    if(JSON.parse(toDoList) && Object.entries(JSON.parse(toDoList)).length > 0 && JSON.parse(toDoList)[currentSearchName]){ 
        toDoListDivWrapper.style.display = 'flex'
        for(let i = 0; i < JSON.parse(toDoList)[currentSearchName].length; i++ ){
             const currentColoredDivs = checkFieldsAndStyling(JSON.parse(toDoList)[currentSearchName][i].date, JSON.parse(toDoList)[currentSearchName][i].todoValue)
            currentValues += currentColoredDivs
        }

    }
    toDoListDiv.innerHTML = currentValues
}


    //   let x = cur
    // for (let i = 0; i<x.length; i++) {
    //     x[i].onclick = function () {
    //     this.parentNode.remove()
    // }
    // }



const handleRemove = (value) => {
    const values = JSON.parse(localStorage.getItem('todos'))
    const newDeletedValues = values[currentSearchName].filter((element) => element.todoValue !== value)
    const newData = {
        ...values,
        [currentSearchName]: newDeletedValues
    }
    localStorage.setItem('todos', JSON.stringify(newData))
}


function checkFieldsAndStyling(date, value, x,a) {
    const currDay = new Date().getDate()
    const dayInData = date.slice(date.length -2)

    const withoutZeroDate = dayInData[0] === '0' ? dayInData.slice(1) : dayInData
   if(currDay > Number(withoutZeroDate)){
        return ` <div class = 'a'  style="color: green"> <input type="checkbox"> ${value  } - ${date}<button type = "button"  onClick='handleRemove("${value}")'>x</button></div>`
    }
   if(currDay < Number(withoutZeroDate)){
        return `<div style="color: blue">  <input type="checkbox"> ${value  } - ${date}<button type = "button"  onClick='handleRemove("${value}")'>x</button></div>`
    }

   if(currDay === Number(withoutZeroDate)){
        return `<div style="color: yellow"> <input type="checkbox"> ${value  } - ${date}<button type = "button"  onClick='handleRemove("${value}")'>x</button></div>`
    }       

}



