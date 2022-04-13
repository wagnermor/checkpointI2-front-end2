let userNameRef = document.querySelector('#userName')
let userImageRef = document.querySelector('#userImage')
let closeAppRef = document.querySelector('#closeApp')
let novaTarefaRef = document.querySelector('#novaTarefa')
let addTaskRef = document.querySelector('#addTask')
let taskList = []
let tasksCompletedList = []

//Não volta o login e apaga os itens
if(localStorage.getItem('token') === null){
    window.location.href = './index.html'
}
console.log(localStorage.getItem('token'))

//requisitar configuração do token
let resquestConfigurationReq = {
    headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token')
    }
}

//Mostrar nome do Usuario
fetch('https://ctd-todo-api.herokuapp.com/v1/users/getMe', resquestConfigurationReq).then(
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

//Botao adicionar tarefas
addTaskRef.addEventListener('click',  event => {

    event.preventDefault()

    //Função de cricação de Tarefas
    function creatTask(){   
        let newTask = {
            description: novaTarefaRef,
            completed: false
        }
        let requestConfigurationPost = {
            method: "POST",
            body: JSON.stringify(newTask),
            headers: requestHeaders
        }
        fetch("https://ctd-todo-api.herokuapp.com/v1/tasks", requestConfigurationPost).then(response => {
            response.json()
        })
    }

    /********************************************************** */

    //Lista de tarefas
    function getTasks() {

        let task = {
            id: 1,
            description: false,
            completed: false,
            userId: 1,
            createdAt: "2021-06-30T22:53:09.549Z"
        }
        let requestHeaders = {
            'Content-Type': 'application/json'
        }
        let requestGetAuthorizateConfiguration = {
            method: 'POST',
            body: JSON.stringify(task),
            headers: requestHeaders
        }
        fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', requestGetAuthorizateConfiguration).then(
            response => {
                if(response.ok) {
                    response.json().then(
                        tasks => {
                            renderTasks(tasks)

                            listUnfinishedTasksRef.innerHTML = ''

                            for(let task of tasks) {

                                listUnfinishedTasksRef.innerHTML += `
                                    <li class="tarefa">
                                        <div class="not-done" onclick="updateTask(${task.id})"></div>
                                        <div class="descricao">
                                        <p class="nome">${task.description}</p>
                                        <p class="timestamp">Criada em:${task.createdAt}</p>
                                        </div>
                                    </li>`
                            }
                        }
                    )
                }
            }


        )
    }
//**************VALIDAR ESSE ROLE (ADICIONAR)********************************** */
        // if(response.ok) {

        //     let skeletonRef = document.querySelector('#skeleton')

        //     skeletonRef.style.display = 'none'

        //     response.json().then(
                
        //         tasks => {
        //             `<li class="tarefa">
        //                 <div class="not-done"></div>
        //                 <div class="descricao">
        //                     <p class="nome">Nova tarefa</p>
        //                     <p class="timestamp">Criada em: 15/07/21</p>
        //                 </div>
        //             </li>`
        //         }
        //     )

        // } else {
        //     if(response.status !== 401) {

        //         logOutUser()

        //     }
        //}
})










