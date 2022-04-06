let botaocloseAppRef = document.querySelector('#closeApp')

let resquestConfigurationReq = {

    headers: {

        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }
}

fetch('https://ctd-todo-api.herokuapp.com/v1/users/getMe',resquestConfigurationReq)