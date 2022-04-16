let userNameRef = document.querySelector('#userName')
let userImageRef = document.querySelector('#userImage')
let closeAppRef = document.querySelector('#closeApp')
let novaTarefaRef = document.querySelector('#novaTarefa')
let addTaskRef = document.querySelector('#addTask')
let listUnfinishedTasksRef = document.querySelector('.tarefas-pendentes')
let listFinishedTasksRef = document.querySelector('.tarefas-terminadas')
// let removeSkeletonRef = document.querySelector('#skeleton')



//Não volta o login e apaga os itens
if(localStorage.getItem('token') === null){
    window.location.href = './index.html'
}
console.log(localStorage.getItem('token'))



//requisitar configuração do token
let requestHeaders = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }
}



//Mostrar nome do Usuario
fetch('https://ctd-todo-api.herokuapp.com/v1/users/getMe', requestHeaders).then(
    response => response.json().then(
        data => {
            nome = data.firstName
            lastName = data.lastName
            userNameRef.innerHTML = `${nome} ${lastName}`
        }
    )
)



//Limpar pagina tarefas
closeAppRef.addEventListener('click',  event => {
    localStorage.clear()
    window.location.href = './index.html'
})




//Função de cricação de Tarefas
function creatTask(){   
    let newTask = {
        description: novaTarefaRef.value,
        completed: false
    }
    let requestConfigurationPost = {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
    }
    fetch("https://ctd-todo-api.herokuapp.com/v1/tasks", requestConfigurationPost).then(response => {
        if(response.ok){
            response.json().then(
                response => {

                    console.log(response)
                }
            )
        }

    })

}


//Lista de tarefas
function getTasks() {

    let requestHeaders = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
    }
    let task = {
        id: 1,
        description: novaTarefaRef.value,
        completed: false,
        userId: 1,
        createdAt: new Date()
    }
    fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', requestHeaders).then(
        response => {
            if(response.ok) {

                response.json().then(

                    tasks => {
                        console.log(tasks.length)
                        if(tasks.length >= 1){
                            listFinishedTasksRef.innerHTML = ''
                            listUnfinishedTasksRef.innerHTML = ''
                        } 
                        for(let currentTask of tasks) {

                            const dataAtualizada = new Date(task.createdAt).toLocaleDateString(
                                'pt-BR',
                                {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric'
                                }
                            )
                            
                            if(currentTask.completed === false){
                                listUnfinishedTasksRef.innerHTML += `
                                    <li class="tarefa">
                                        <div class="not-done" onclick="updateTask(${currentTask.id})"></div>
                                        <div class="descricao">
                                            <p class="nome">${currentTask.description}</p>
                                            <p class="timestamp">Criada em:${dataAtualizada}</p>
                                        </div>
                                    </li>`

                            }else{
                                    listFinishedTasksRef.innerHTML += `
                                    <li class="tarefa">
                                        <div class="not-done" onclick="updateTask(${currentTask.id})"></div>
                                        <div class="descricao">
                                            <p class="nome">${currentTask.description}</p>
                                            <p class="timestamp">Criada em:${dataAtualizada}</p>
                                        </div>
                                    </li>`
                            }
                        }
                    }

                )

            }
        }


    )

}

//Botao adicionar tarefas
addTaskRef.addEventListener('click',  event => {

    event.preventDefault()

    creatTask();
    
    console.log("Botao Funcionando!")

})

//Carregar "pagina"
window.addEventListener('load', () =>{

    getTasks()
    
})


// //Requisição p/ atualizar tarefas para pendentes
// const requestPutAuthorizateConfiguration = {
//     method: 'PUT',
//     headers:{
//         'Content-Type':'application/json',
//         'Authorization': localStorage.getItem('token')
//     }
// }

// function updateTask(id, completed) {
//     requestPutAuthorizateConfiguration.body = JSON.stringify({completed: completed})
//     fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, requestPutAuthorizateConfiguration).then(
//         response => {
//             if(response.ok){
//                 getTasks()
//             }
//         }
//     )
// }



// //Requisição p/ deletar tarefas
// const requestDeleteAuthorizateConfiguration = {
//     method: 'DELETE',
//     headers:{
//         'Content-Type':'application/json',
//         'Authorization': localStorage.getItem('token')
//     }
// }

// function deleteTask(id) {
//     fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, requestDeleteAuthorizateConfiguration).then(
//         response => {
//             if(response.ok){
//                 getTasks()
//             }
//         }
//     )
// }










