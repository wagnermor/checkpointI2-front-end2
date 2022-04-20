const selectElement = selector => document.querySelector(selector)
const userImage = document.querySelector('#userImage')
const userNameRef = selectElement('#userName')
const userImageRef = selectElement('#userImage')
const closeAppRef = selectElement('#closeApp')
const novaTarefaRef = selectElement('#novaTarefa')
const addTaskRef = selectElement('#addTask')
const listUnfinishedTasksRef = selectElement('.tarefas-pendentes')
const listFinishedTasksRef = selectElement('.tarefas-terminadas')
// const githubAvatar = 'https://avatars.githubusercontent.com/'


const login = {
    headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
    }
}

//Volta p/o login se não houver token no localStorage
if(localStorage.getItem('token') === null){
    window.location.href = './index.html'
}

userImage.classList.add('user-image')

//Mostrar nome do Usuario
fetch('https://ctd-todo-api.herokuapp.com/v1/users/getMe', login).then(
    response => response.json().then(
        data => {
            nome = data.firstName
            lastName = data.lastName
            userNameRef.innerHTML = `${nome}`
            
            const githubAvatar = `${lastName})`
            
            if(githubAvatar) {
                userImageRef.innerHTML = ''
                userImageRef.style.opacity = 1
                userImageRef.style.backgroundImage = `url(https://avatars.githubusercontent.com/${githubAvatar}`
            } else {
                userImageRef.innerHTML = `<p>${nome[0]}</p>`
                userImageRef.style.opacity = .4
            }
        }
    )
)

//Botao finalizar sessão
closeAppRef.addEventListener('click',  () => {
    localStorage.clear()
    window.location.href = './index.html'
})

//funcao para imprimir Tarefas
const printTasks = () => {
    fetch("https://ctd-todo-api.herokuapp.com/v1/tasks",login)
        .then(response => response.json())
        .then(tasks => {
            console.log(tasks)
            if(tasks.length > 0) {
                listFinishedTasksRef.innerHTML = ''
                listUnfinishedTasksRef.innerHTML = ''
            }
            for(let task of tasks) {
                console.log(`Task: ${task.description}\nFinalizada: ${task.completed}`)
                const dataFormatada = new Date(task.createdAt).toLocaleDateString( 'pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' } )
                if(task.completed === false) {
                    listUnfinishedTasksRef.innerHTML += `
                        <li class="tarefa" data-aos="fade-up" data-aos-easing="linear" data-aos-duration="1000">
                            <div class="not-done" onclick="updateTask(${task.id})"></div>
                            <div class="descricao">
                                <p class="nome">${task.description}</p>
                                <p class="timestamp">Criada em: ${dataFormatada}</p>
                                <button id="btn-delete" onclick="deleteTask(${task.id})"><div></div></button>
                            </div>
                        </li>`
                }else{
                        listFinishedTasksRef.innerHTML += `
                        <li class="tarefa" data-aos="fade-up" data-aos-easing="linear" data-aos-duration="1000">
                            <div class="not-done" onclick="updateTaskToFalse(${task.id})"></div>
                            <div class="descricao">
                                <p class="nome">${task.description}</p>
                                <p class="timestamp">Criada em:${dataFormatada}</p>
                                <button id="btn-delete" onclick="deleteTask(${task.id})"><div></div></button>
                            </div>
                        </li>`
                }
            }
        })

}

//Função de cricação de Tarefas

const skeletonStructure = `<div id="skeleton">
<li class="tarefa">
    <div class="not-done"></div>
    <div class="descricao">
        <p class="nome">Nova tarefa</p>
        <p class="timestamp">Criada em: 15/07/21</p>
    </div>
</li>
<li class="tarefa">
    <div class="not-done"></div>
    <div class="descricao">
        <p class="nome">Nova tarefa</p>
        <p class="timestamp">Criada em: 15/07/21</p>
    </div>
</li>
<li class="tarefa">
    <div class="not-done"></div>
    <div class="descricao">
        <p class="nome">Nova tarefa</p>
        <p class="timestamp">Criada em: 15/07/21</p>
    </div>
</li>
</div>`

function creatTask(){   
    let newTask = {
        description: novaTarefaRef.value,
        completed: false
    }

    let requestConfigurationPost = {
        method: "POST",
        headers: login["headers"],
        body: JSON.stringify(newTask)
    }
    fetch("https://ctd-todo-api.herokuapp.com/v1/tasks", requestConfigurationPost)
        .then(response => {
            if(response.ok) {
                response.json()
                printTasks()
            }
        })
    novaTarefaRef.value = ''
}

//Requisição p/ atualizar tarefas para completadas
function updateTask(id) {
    const taskStateTrue = {
        method: 'PUT',
        headers:login.headers,
        body: JSON.stringify({completed:true})
        }
    fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, taskStateTrue).then(
        response => {
            if(response.ok){
                printTasks()
            }
        }
    )
}
//Atualiza tarefas para nao concluidas
function updateTaskToFalse(id) {
    const taskStateTrue = {
        method: 'PUT',
        headers:login["headers"],
        body: JSON.stringify({completed: false})
    }
    fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, taskStateTrue)
        .then(response => {
            if(response.ok){
                printTasks()
            }
        })
}
const time = () => setTimeout(printTasks, 1000);

function deleteTask(id) {
    const taskStatedeleted = {
        method: 'DELETE',
        headers:login.headers
        }
    fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, taskStatedeleted).then(
        response => {
            if(response.ok){
                printTasks()
            } else{
                listUnfinishedTasksRef.innerHTML = ""
                listFinishedTasksRef.innerHTML = ""
                listUnfinishedTasksRef.innerHTML += skeletonStructure
                listFinishedTasksRef.innerHTML += skeletonStructure
            }
        }
    )
}

//Botao adicionar tarefas
addTaskRef.addEventListener('click',  (event) => {
    event.preventDefault()
    creatTask();
    console.log("Botao Funcionando!")
    // const printTasksTimeout = setTimeout(printTasks, 1000);
})


//Carregar "pagina"
window.addEventListener('load', () =>{
    printTasks()
})
