import { userData } from "@/pages/api/users"
import { errorInfo } from "@/aux-interfaces/auxLittleInterfaces"

const validationUserData = (user: userData) => {
    const error: errorInfo = {
        message: ""
    }

    if(user.firstname.trim().length === 0){
        error.message = "El nombre es requerido."
    }else if(!/^[A-Za-z]+$/.test(user.firstname)){
        error.message = "El nombre sólo debe contener letras."
    }else if(user.firstname.trim().length > 20 || user.firstname.trim().length < 2){
        error.message = "El nombre debe tener entre 2 a 20 características."
    }

    if(user.lastname.trim().length === 0){
        error.message = "El apellido es requerido."
    }else if(!/^[A-Za-z]+$/.test(user.lastname)){
        error.message = "El apellido sólo debe contener letras."
    }else if(user.lastname.trim().length > 20 || user.lastname.trim().length < 2){
        error.message = "El apellido debe tener entre 2 a 20 características."
    }

    if(user.name.trim().length === 0){
        error.message = "El nombre de usuario es requerido."
    }else if(user.name.trim().length > 15 || user.name.trim().length < 6){
        error.message = "El nombre de usuario debe tener entre 6 a 15 caracteres."
    }

    if(user.birthdate.length === 0){
        error.message = "The birthdate is required."
    }

    return error.message;
}

export default validationUserData;