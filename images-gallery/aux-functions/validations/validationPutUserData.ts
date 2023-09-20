import { encryptPass, verifyPassword } from "@/utils/lib/lib";

const validationPutUserData = async ({ name, firstname, lastname, password, re_password, email, birthdate} : any, loguedUserData : any) =>{
    
    const onlyLettersAndNumbers = /^[a-zA-Z0-9]+$/;
    const onlyLetters = /^[a-zA-Z]+$/;
    const onlyEmails = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const errors = {
        name: "",
        password: "",
        re_password: "",
        firstname: "",
        lastname: "",
        email: "",
        birthdate: "",
        flag: false
    }

    if(name !== loguedUserData.name){
        if(name.length === 0){
            errors.name = "- No debe estar vacío.";
            errors.flag = true;
        }else if(!onlyLettersAndNumbers.test(name)){
            errors.name = "- Sólo debe contener letras y números.";
            errors.flag = true;
        }else if(name.length < 6 || name.length > 20){
            errors.name = "- Debe contener entre 6 & 20 caracteres."
            errors.flag = true;
        }
    }

    if(firstname !== loguedUserData.firstname){        
        if(firstname.length === 0){
            errors.firstname = "- El first name es requerido.";
            errors.flag = true;
        }else if(!onlyLetters.test(firstname)){
            errors.firstname = "- Debe tener sólo letras.";
            errors.flag = true;
        }else if(firstname.length < 2 || firstname.length > 20){
            errors.firstname = "- Debe tener entre 2 & 20 caracteres.";
            errors.flag = true;
        }
    }

    if(lastname !== loguedUserData.lastname){
        if(lastname.length === 0){
            errors.lastname = "- El last name es requerido.";
            errors.flag = true;
        }else if(!onlyLetters.test(lastname)){
            errors.lastname = "- Debe tener sólo letras.";
            errors.flag = true;
        }else if(lastname.length < 2 || lastname.length > 20){
            errors.lastname = "- Debe tener entre 2 & 20 caracteres.";
            errors.flag = true;
        }
    }

    if(password){
        if(re_password !== password){
            errors.re_password = "- Las passwords deben coincidir.";
            errors.flag = true;
        }

        const isEqual = await verifyPassword(password, loguedUserData.password, loguedUserData.salt);
        console.log(isEqual);
        
        if(isEqual === false){
            if(password.length < 2 || password.length > 20){
                    errors.password = "- Debe tener entre 2 & 20 caracteres.",
                    errors.flag = true
            }
        }
    }

    if(email !== loguedUserData.email){
        if(email.length === 0){
            errors.email = "- El e-mail es requerido.";
            errors.flag = true;
        }else if(!onlyEmails.test(email)){
            errors.email = "- Debe tener un formato de E-mail.";
            errors.flag = true;
        }
    }

    if(birthdate !== loguedUserData){
        if(birthdate.length === 0){
            errors.birthdate = "- La birthdate es requerida.";
            errors.flag = true;
        }
    }

    return errors;
}

export default validationPutUserData;