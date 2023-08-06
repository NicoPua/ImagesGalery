import { BodyInformation } from "@/pages/api/photos";
import { errorInfo } from "@/aux-interfaces/auxLittleInterfaces";

const cleanPostData = ( { description, location, profilepic } : BodyInformation ) =>{
    const regexWithoutNumbers : RegExp = /^[^0-9]*$/;
    const regexOnlyLetters : RegExp = /^[a-zA-Z,.\s]+$/;
    const regexOnlyURL : RegExp = /^(https?:\/\/)?[a-zA-Z0-9\-._~:/?#\[\]@!$&'()*+,;=]+$/i;

    const error : errorInfo = { message: "" };

    if(description.length === 0){
        error.message = "La descripción es requerida.";
    }else if(regexWithoutNumbers.test(description)){
        error.message = "La descripción no debe contener números.";
    }else if(description.length <= 5 || description.length >= 100){
        error.message = "La descripción debe contener entre 5 a 100 caracteres.";
    }

    if(location.length === 0){
        error.message = "La location es requerida.";
    }else if(regexOnlyLetters.test(location)){
        error.message = "La location debe contener sólo texto.";
    }else if(description.length <= 2 || description.length >= 50){
        error.message = "La location debe contener entre 2 a 50 caracteres.";
    }

    if(regexOnlyURL.test(profilepic)){
        error.message = "La imagen debe estar en formato URL.";
    }

    return error.message;
}

export default cleanPostData;