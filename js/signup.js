let inputNomeRef = document.querySelector('#inputNome')
let inputApelidoRef = document.querySelector('#inputApelido')
let inputEmailRef = document.querySelector('#inputEmail')
let inputSenhaRef = document.querySelector('#inputSenha')
let botaoCriarRef = document.querySelector('criar')


botaoCriarRef.addEventListener('click', event => {

    event.preventDefault()

    for(let input of inputs) {
        input.trim
        if(input.value === "") {
            for(let spam of spams){
                spam.classList.add("span-error")
            }
            input.style.border = "1px solid red"
        }
        console.log(input.value)
    }
    // input.classList.remove("span-error")
    console.log(botaoCriarRef)

    //**************************************OUTRO ROLÊ*******************************************//
    let credentials = {

        email: 'string',
        password: 'string'
    }

    let requestHeaders = {
        'Content-Type': 'application/json'
    }
    
    let requestConfiguration = {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: requestHeaders
    }

    fetch('https://ctd-todo-api.herokuapp.com/v1/users/login', requestConfiguration).then(

    response => {

        response.json().then(

            data => {

                localStorage.setItem('token', data.jwt)

            }

        )

    }

)

})