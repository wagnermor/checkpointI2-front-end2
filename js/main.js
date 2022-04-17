let inputEmailReq = document.querySelector('#inputEmail')
let inputPasswordReq = document.querySelector('#inputPassword')
let botaoSubmitRef = document.querySelector('button')
const spams = document.querySelectorAll('[required] ~ span');
const inputs  = document.querySelectorAll('[required]');

console.log(inputs);
console.log(spams);

//fazer variavel de controle**
//desabilitar o botao
//disabled

botaoSubmitRef.addEventListener('click', event => {

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
    console.log(botaoSubmitRef)

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
                alert('Usuario ou senha inexistente')
            }

        }
    )

})
