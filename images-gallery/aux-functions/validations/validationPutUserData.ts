import { verifyPassword } from "@/utils/lib/lib";

const validationPutUserData = async ({ name, firstname, lastname, password, re_password, email, birthdate, instagram, twitter, portfolio} : any, loguedUserData : any) =>{
    
    const onlyLettersAndNumbers = /^[a-zA-Z0-9]+$/;
    const onlyLetters = /^[a-zA-Z]+$/;
    const onlyEmails = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const onlyHTTP = /^(ftp|http|https):\/\/[^ "]+$/
    const noSpaces = /^[^\s]+$/
    const errors = {
        name: "",
        password: "",
        re_password: "",
        firstname: "",
        lastname: "",
        email: "",
        birthdate: "",
        instagram: "",
        twitter: "",
        portfolio: "",
        flag: false,
        allEqual: false
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

    if(instagram){
        if(onlyHTTP.test(instagram)){
            errors.instagram = "- Sólo debe ingresar nombre de usuario.";
            errors.flag = true;
        }else if(!noSpaces.test(instagram)){
            errors.instagram = "- No debe haber espacios.";
            errors.flag = true;
        }
    }

    if(twitter){
        if(onlyHTTP.test(twitter)){
            errors.twitter = "- Sólo debe ingresar nombre de usuario.";
            errors.flag = true;
        }else if(!noSpaces.test(twitter)){
            errors.twitter = "- No debe haber espacios.";
            errors.flag = true;
        }
    }

    if(portfolio){
        if(!onlyHTTP.test(portfolio)){
            errors.portfolio = "- Debe ingresar la URL en formato HTTP.";
            errors.flag = true;
        }
    }

    if(password){
        if(re_password !== password){
            errors.re_password = "- Las passwords deben coincidir.";
            errors.flag = true;
        }

        const isEqual : any = await verifyPassword(password, loguedUserData.password, loguedUserData.salt);
        
        if(isEqual === false){
            if(password.length < 2 || password.length > 20){
                errors.password = "- Debe tener entre 2 & 20 caracteres.",
                errors.flag = true  
            }
            errors.allEqual = false;
        }else{
            errors.allEqual = true;
            errors.password = "- La contraseña debe ser distinta a la anterior.";
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

    if(birthdate !== loguedUserData.birthdate.slice(0,10)){
        if(birthdate.length === 0){
            errors.birthdate = "- La birthdate es requerida.";
            errors.flag = true;
        }
    }

    if( (!password)
        &&(name === loguedUserData.name) 
        && (firstname === loguedUserData.firstname) 
        && (lastname === loguedUserData.lastname) 
        && (email === loguedUserData.email) 
        && (birthdate.slice(0,10) === loguedUserData.birthdate.slice(0,10))
    ){
        errors.allEqual = true;
    }

    return errors;
}

export default validationPutUserData;