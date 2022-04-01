let inputEmailReq = document.querySelector('#inputEmail')
let inputPasswordReq = document.querySelector('#inputPassword')
let botaoSubmitRef = document.querySelector('button')
const spams = document.querySelectorAll('[required] ~ span');
const inputs  = document.querySelectorAll('[required]');

console.log(inputs);
console.log(spams);


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

})
