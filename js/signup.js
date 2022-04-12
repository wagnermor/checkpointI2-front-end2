let inputNomeRef = document.querySelector('#inputNome')
let inputApelidoRef = document.querySelector('#inputApelido')
let inputEmailRef = document.querySelector('#inputEmail')
let inputSenhaRef = document.querySelector('#inputPassword')
let inputSenhaRef2 = document.querySelector('#inputPassword2')
let botaoCriarRef = document.querySelector('button')
const inputs  = document.querySelectorAll('[required]');
const spans  = document.querySelectorAll('[required] ~ span');

botaoCriarRef.addEventListener('click', event => {

    event.preventDefault()

    for(let input of inputs) {
        input.trim
        if(input.value === "") {
            for(let span of spans){
                span.classList.add("span-error")
            }
            input.style.border = "1px solid red"

            console.log("deu erro")
        }
        //else if (input.type='password'.value !== inputSenhaRef2.value){
           // console.log('certo')
        //}
        console.log(input.value)
    }
    
    //fazer um if para validar o botão de criar - senhas iguais
    //botaoCriarRef.disabled = 'false'
    // input.classList.remove("span-error")
    console.log(botaoCriarRef)

    //**************************************OUTRO ROLÊ*******************************************//
    let users = {

        firstName: `${inputNomeRef.value}`,
        lastName: `${inputApelidoRef.value}`,
        email: `${inputEmailRef.value}`,
        password: `${inputSenhaRef.value}`
    }

    let requestHeaders = {
        'Content-Type': 'application/json'
    }
    
    let requestConfiguration = {
        method: 'POST',
        body: JSON.stringify(users),
        headers: requestHeaders
    }

    fetch('https://ctd-todo-api.herokuapp.com/v1/users', requestConfiguration)
        .then(response => response.json()
            .then(data => {

                localStorage.setItem('token', data.jwt)
                window.location.href = './index.html'

            }

        )

    )

})