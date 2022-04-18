let inputNomeRef = document.querySelector('#inputNome')
let inputApelidoRef = document.querySelector('#inputApelido')
let inputEmailRef = document.querySelector('#inputEmail')
let inputSenhaRef = document.querySelector('#inputPassword')
let inputSenhaRef2 = document.querySelector('#inputPassword2')
let botaoCriarRef = document.querySelector('button')
const inputs  = document.querySelectorAll('[required]');
const spans  = document.querySelectorAll('[required] ~ span');


function validar(){
    // for(let input of inputs) {
    //     input.trim
    //     if(input.value === "") {
    //         for(let span of spans){
    //             span.classList.add("span-error")
    //         }
    //         input.style.border = "1px solid red"
    //         console.log("deu erro")
    //     }
    // }
    if(inputNomeRef.value == ""){
        alert( "Por favor, informe um nome!" );
        window.StopWhateverBelow()   
    }
    if(inputApelidoRef.value == ""){
        alert( "Por favor, informe um Apelido!" );
        window.StopWhateverBelow()   
    }
    //Validação Email
    if(inputEmailRef.value.indexOf('@') == -1 || inputEmailRef.value.indexOf('.') == -1 ){
            alert( "Por favor, informe um email válido!" );
            window.StopWhateverBelow()            
    }
    if(inputSenhaRef.value == "" ){
        alert( "Por favor, informe uma senha válida!" );
        window.StopWhateverBelow()   
    }
    if(inputSenhaRef2.value == "" ){
        alert( "Por favor, confirme a senha digitada!" );
        window.StopWhateverBelow()   
    }
    //Validação Senhas
    if (inputSenhaRef.value != inputSenhaRef2.value) {
        alert("Senhas diferentes!\nPor favor, informe as senhas iguais!"); 
        window.StopWhateverBelow()  
    }   
}

botaoCriarRef.addEventListener('click', event => {
    event.preventDefault()
    validar()

    //**************************************OUTRO ROLÊ*******************************************//
    let users = {
        firstName: `${inputNomeRef.value}`,
        lastName: `${inputApelidoRef.value}`,
        email: `${inputEmailRef.value}`,
        password: `${inputSenhaRef.value}`
    }

    let requestHeaders = {'Content-Type': 'application/json' }
    
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