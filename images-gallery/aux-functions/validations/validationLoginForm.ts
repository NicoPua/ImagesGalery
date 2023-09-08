const validationLoginForm = ({username, password} : {username:string, password:string}) =>{
    const error = {
        username: "",
        password: "",
        flag: false
    }

    if(username.length === 0){
        error.username = "Username is required."
        error.flag = true;
    }

    if(password.length === 0){
        error.password = "Password is required."
        error.flag = true;
    }

    return error;
}

export default validationLoginForm;