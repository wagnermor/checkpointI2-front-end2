let botaocloseAppRef = document.querySelector('#closeApp')
let addTaskRef = document.querySelector('#addTask')
let not-doneRef = document.querySelector('.not-done')
let addTaskRef = document.querySelector('.descricao')
let addTaskRef = document.querySelector('.nome')
let addTaskRef = document.querySelector('.timestampk')


<div class="not-done"></div>
<div class="descricao">
  <p class="nome">Nova tarefa</p>
  <p class="timestamp">Criada em: 15/07/21</p>
</div>

let resquestConfigurationReq = {

    headers: {

        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }
}

addTaskRef.addEventListener('click',  event => {

    event.preventDefault()

    let users = {

            id: 1,
            description: ,
            completed: false,
            userId: 1,
            createdAt: "2021-06-30T22:53:09.549Z"
        
    }

    fetch('https://ctd-todo-api.herokuapp.com/v1/users/tasks', resquestConfigurationReq).then(
    
    response => {
        console.log(response)

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


})








