let inputEmailReq = document.querySelector('#inputEmail')
let inputPasswordReq = document.querySelector('#inputPassword')
let btnSubmitRef = document.querySelector('button')
const inputs  = document.querySelectorAll('[required]')
// const spans = document.querySelectorAll('[required] ~ span')

const validate = () => {
    for(let input of inputs) {
        input.addEventListener('keyup', () => {// Evento de keyup para cada elemento input
            input.value.trim()
            console.log(input.checkValidity())
            if(input.checkValidity()) {
                btnSubmitRef.disabled = false
                input.classList.remove('error')
                input.classList.add('not-error')
                input.style.backgroundColor = "var(--input-ok)"
            } else {
                btnSubmitRef.disabled = true
                input.classList.add('error')
                input.style.backgroundColor = "var(--input-not-ok)"
            }
        })
    }
}
validate()
btnSubmitRef.addEventListener('click', event => {
    event.preventDefault()
    //**************************************OUTRO ROLÊ*******************************************//
    let credentials = {
        email: `${inputEmailReq.value}`,
        password: `${inputPasswordReq.value}`
    }
    let requestHeaders = {
        'Content-Type': 'application/json'
    }
    let requestConfiguration = {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(credentials)
    }

    fetch('https://ctd-todo-api.herokuapp.com/v1/users/login', requestConfiguration).then(
        response => {
            if(response.ok){
                response.json().then(
                    data => {
                        console.log(data)
    
                        localStorage.setItem('token', data.jwt)
                        window.location.href = './tarefas.html'
    
                    }
    
                )
            } else {
                alert('Usuario ou senha inexistente')// Substituir por div
            }

        }
    )

})
