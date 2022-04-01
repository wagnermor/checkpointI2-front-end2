let inputEmailReq = document.querySelector('#inputEmail')
let inputPasswordReq = document.querySelector('#inputPassword')
let botaoSubmitRef = document.querySelector('button')
const teste  = document.querySelectorAll('[required]');

console.log(teste);


botaoSubmitRef.addEventListener('click', event => {

    event.preventDefault()

    for(let input of teste) {
        if(input.value === "") {
            input.style.border = "1px solid red"
            input.classList.toggle("span-error")
        }
    }


})
