//Nome
let userNameRef = document.querySelector('#userName')
let userImageRef = document.querySelector('#userImage')
let closeAppRef = document.querySelector('#closeApp')
let novaTarefaRef = document.querySelector('#novaTarefa')
let addTaskRef = document.querySelector('#addTask')
let req = {
    "id": 0,
  "firstName": "string",
  "lastName": "string",
  "email": "string"
}

let resquestConfigurationReq = {

    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token',)
    }
}

fetch('https://ctd-todo-api.herokuapp.com/v1/users/getMe', resquestConfigurationReq).then(
    response => response.json().then(
        data => {
            nome = data.firstName
            lastName = data.lastName
            userNameRef.innerHTML = `${nome} ${lastName}`
        }
    )
)

addTaskRef.addEventListener('click',  event => {

    event.preventDefault()

    let users = {

            id: 1,
            description: false,
            completed: false,
            userId: 1,
            createdAt: "2021-06-30T22:53:09.549Z"
        
    }



        if(response.ok) {

            let skeletonRef = document.querySelector('#skeleton')

            skeletonRef.style.display = 'none'

            response.json().then(
                
                tasks => {
                    `<li class="tarefa">
                        <div class="not-done"></div>
                        <div class="descricao">
                            <p class="nome">Nova tarefa</p>
                            <p class="timestamp">Criada em: 15/07/21</p>
                        </div>
                    </li>`
                }
            )

        } else {
            if(response.status !== 401) {

                logOutUser()

            }
        }
    })








