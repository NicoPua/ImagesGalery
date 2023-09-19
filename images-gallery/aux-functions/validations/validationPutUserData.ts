const validationPutUserData = ({name, firstname, lastname, email, birthdate} : any) =>{
    
    const onlyLettersAndNumbers = /^[a-zA-Z0-9]+$/;
    const onlyLetters = /^[a-zA-Z]+$/;
    const onlyEmails = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const error = {
        name: "",
        firstname: "",
        lastname: "",
        email: "",
        birthdate: "",
        flag: false
    }

    if(name.length === 0){
        error.name = "- No debe estar vacío.";
        error.flag = true;
    }else if(!onlyLettersAndNumbers.test(name)){
        error.name = "- Sólo debe contener letras y números.";
        error.flag = true;
    }else if(name.length < 6 || name.length > 20){
        error.name = "- Debe contener entre 6 & 20 caracteres."
        error.flag = true;
    }

    if(firstname.length === 0){
        error.firstname = "- El first name es requerido.";
        error.flag = true;
    }else if(!onlyLetters.test(firstname)){
        error.firstname = "- Debe tener sólo letras.";
        error.flag = true;
    }else if(firstname.length < 2 || firstname.length > 20){
        error.firstname = "- Debe tener entre 2 & 20 caracteres.";
        error.flag = true;
    }

    if(lastname.length === 0){
        error.lastname = "- El last name es requerido.";
        error.flag = true;
    }else if(!onlyLetters.test(lastname)){
        error.lastname = "- Debe tener sólo letras.";
        error.flag = true;
    }else if(lastname.length < 2 || lastname.length > 20){
        error.lastname = "- Debe tener entre 2 & 20 caracteres.";
        error.flag = true;
    }

    if(email.length === 0){
        error.email = "- El e-mail es requerido.";
        error.flag = true;
    }else if(!onlyEmails.test(email)){
        error.email = "- Debe tener un formato de E-mail.";
        error.flag = true;
    }

    if(birthdate.length === 0){
        error.birthdate = "- La birthdate es requerida.";
        error.flag = true;
    }

}

export default validationPutUserData;